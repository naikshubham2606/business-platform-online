import { useState, useEffect } from 'react';
import { publicAboutService } from '@/services/api/publicAboutService';
import type { AboutUsDto } from '@/types/about';
import type { EndpointState } from '@/context/BusinessContext';

export function useAboutUs() {
  const [state, setState] = useState<EndpointState<AboutUsDto>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchAboutUs = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const res = await publicAboutService.getAboutUs();
    
    if (res.isSuccess && res.data) {
      setState({ data: res.data, loading: false, error: null });
    } else {
      setState({
        data: null,
        loading: false,
        error: res.message || 'About Us information not found.',
      });
    }
  };

  useEffect(() => {
    void fetchAboutUs();
  }, []);

  return { ...state, retry: fetchAboutUs };
}
