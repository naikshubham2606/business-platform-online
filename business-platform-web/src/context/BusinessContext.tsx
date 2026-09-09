/**
 * BusinessContext — loads all three public API endpoints once in parallel.
 * Components read from this context to avoid duplicate API requests.
 *
 * API base URL comes from config/api.ts (read from VITE_API_BASE_URL env var).
 * During local development, the Vite proxy forwards /api/* to the backend —
 * so VITE_API_BASE_URL is empty and requests use relative /api paths.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { publicBusinessService } from '@/services/api/publicBusinessService';
import type {
  BusinessBrandingDto,
  BusinessContactDto,
  BusinessProfileDto,
} from '@/types/business';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EndpointState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface BusinessContextValue {
  profile: EndpointState<BusinessProfileDto>;
  branding: EndpointState<BusinessBrandingDto>;
  contact: EndpointState<BusinessContactDto>;
  /**
   * True while ANY of the three endpoints is still on its initial load.
   * Use this only when you truly need ALL data before rendering anything.
   * Prefer per-section loading states (profile.loading etc.) for resilience.
   */
  initialLoading: boolean;
  /** Retry all three requests from scratch. */
  retry: () => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const BusinessContext = createContext<BusinessContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

function mkInitial<T>(): EndpointState<T> {
  return { data: null, loading: true, error: null };
}

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] =
    useState<EndpointState<BusinessProfileDto>>(mkInitial);
  const [branding, setBranding] =
    useState<EndpointState<BusinessBrandingDto>>(mkInitial);
  const [contact, setContact] =
    useState<EndpointState<BusinessContactDto>>(mkInitial);

  const fetchAll = useCallback(() => {
    // Reset all to loading state before re-fetching
    setProfile(mkInitial());
    setBranding(mkInitial());
    setContact(mkInitial());

    // Fire all three requests concurrently — independent, no dependency chain
    void publicBusinessService.getBusinessProfile().then((res) => {
      setProfile({
        data: res.isSuccess ? res.data : null,
        loading: false,
        error: res.isSuccess
          ? null
          : res.message || 'Business profile is currently unavailable.',
      });
    });

    void publicBusinessService.getBranding().then((res) => {
      setBranding({
        data: res.isSuccess ? res.data : null,
        loading: false,
        error: res.isSuccess
          ? null
          : res.message || 'Branding information is currently unavailable.',
      });
    });

    void publicBusinessService.getContact().then((res) => {
      setContact({
        data: res.isSuccess ? res.data : null,
        loading: false,
        error: res.isSuccess
          ? null
          : res.message || 'Contact information is currently unavailable.',
      });
    });
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const initialLoading =
    profile.loading || branding.loading || contact.loading;

  return (
    <BusinessContext.Provider
      value={{ profile, branding, contact, initialLoading, retry: fetchAll }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/** Consume business data in any component inside BusinessProvider. */
export function useBusiness(): BusinessContextValue {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw new Error('useBusiness must be used within a <BusinessProvider>.');
  }
  return ctx;
}
