/**
 * Public Business API service layer.
 *
 * All public endpoint calls are centralized here.
 * Components and context should NEVER call fetch() directly for business data.
 *
 * URL configuration:
 *   Development → Vite proxy forwards /api/* to https://localhost:44350
 *   Production  → API_BASE_URL prefix from VITE_API_BASE_URL env var
 *
 * No authentication headers are sent — these are intentionally public endpoints.
 */
import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse } from '@/types/api';
import type {
  BusinessBrandingDto,
  BusinessContactDto,
  BusinessProfileDto,
} from '@/types/business';

/**
 * Shared fetch helper for all public endpoints.
 *
 * Handles:
 *   - Successful 2xx responses with isSuccess: true
 *   - Backend error responses (e.g. 404) that still return ApiResponse JSON
 *   - Network failures, CORS errors, JSON parse errors
 *
 * Never throws — always returns a resolved ApiResponse<T>.
 */
export async function publicFetch<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      // No credentials, no auth headers — public endpoints only
    });

    // Parse the response body regardless of HTTP status code.
    // The backend returns ApiResponse<T> JSON even on 404/500.
    let json: ApiResponse<T>;
    try {
      json = (await response.json()) as ApiResponse<T>;
    } catch {
      // Response body was not valid JSON (e.g. an HTML error page from a proxy)
      return {
        isSuccess: false,
        data: null,
        message: `Server returned an unexpected response (HTTP ${response.status}).`,
      };
    }

    // If the HTTP status is not OK and the body doesn't set isSuccess = false,
    // normalise it so callers always trust `isSuccess` over HTTP status.
    if (!response.ok && json.isSuccess) {
      json = { ...json, isSuccess: false };
    }

    return json;
  } catch {
    // Network-level failure: no connection, CORS block, DNS failure, etc.
    return {
      isSuccess: false,
      data: null,
      message:
        'Unable to connect to the server. Please check your connection and try again.',
    };
  }
}

// ---------------------------------------------------------------------------
// Public business service methods
// ---------------------------------------------------------------------------

export const publicBusinessService = {
  /**
   * GET /api/public/business-profile
   * Returns: businessName, shortDescription, aboutDescription
   */
  getBusinessProfile(): Promise<ApiResponse<BusinessProfileDto>> {
    return publicFetch<BusinessProfileDto>(
      API_ENDPOINTS.PUBLIC.BUSINESS_PROFILE
    );
  },

  /**
   * GET /api/public/branding
   * Returns: businessName, logoPath, faviconPath, tagline
   */
  getBranding(): Promise<ApiResponse<BusinessBrandingDto>> {
    return publicFetch<BusinessBrandingDto>(API_ENDPOINTS.PUBLIC.BRANDING);
  },

  /**
   * GET /api/public/contact
   * Returns: phone, email, address parts, social links
   */
  getContact(): Promise<ApiResponse<BusinessContactDto>> {
    return publicFetch<BusinessContactDto>(API_ENDPOINTS.PUBLIC.CONTACT);
  },
};
