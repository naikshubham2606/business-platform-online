import { useState, useEffect } from 'react';
import { publicServicesService } from '@/services/api/publicServicesService';
import type { ServiceListDto, ServiceDetailsDto } from '@/types/service';
import type { EndpointState } from '@/context/BusinessContext';

// Simple in-memory cache for the session to avoid refetching.
let cachedServicesList: ServiceListDto[] | null = null;
const detailsCache = new Map<number, ServiceDetailsDto>();

/**
 * Hook to fetch the global list of services.
 */
export function useServicesList() {
  const [state, setState] = useState<EndpointState<ServiceListDto[]>>({
    data: cachedServicesList,
    loading: !cachedServicesList,
    error: null,
  });

  const fetchServices = async () => {
    setState({ data: cachedServicesList, loading: !cachedServicesList, error: null });
    const res = await publicServicesService.getServices();
    if (res.isSuccess && res.data) {
      cachedServicesList = res.data;
      setState({ data: res.data, loading: false, error: null });
    } else {
      setState({ data: null, loading: false, error: res.message || 'Failed to load services.' });
    }
  };

  useEffect(() => {
    if (!cachedServicesList) {
      void fetchServices();
    }
  }, []);

  return { ...state, retry: fetchServices };
}

/**
 * Hook to fetch details for a single service.
 */
export function useServiceDetails(id: number | null) {
  const [state, setState] = useState<EndpointState<ServiceDetailsDto>>({
    data: id && detailsCache.has(id) ? detailsCache.get(id)! : null,
    loading: !!id && !detailsCache.has(id),
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    if (detailsCache.has(id)) {
      setState({ data: detailsCache.get(id)!, loading: false, error: null });
      return;
    }

    const fetchDetails = async () => {
      setState({ data: null, loading: true, error: null });
      const res = await publicServicesService.getServiceById(id);
      if (res.isSuccess && res.data) {
        detailsCache.set(id, res.data);
        setState({ data: res.data, loading: false, error: null });
      } else {
        setState({ data: null, loading: false, error: res.message || 'Failed to load service details.' });
      }
    };

    void fetchDetails();
  }, [id]);

  return state;
}
