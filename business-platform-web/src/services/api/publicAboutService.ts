import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse } from '@/types/api';
import type { AboutUsDto } from '@/types/about';
import { publicFetch } from './publicBusinessService';

export const publicAboutService = {
  /**
   * GET /api/public/about-us
   * Returns complete About Us information including highlights, values, and statistics.
   */
  getAboutUs(): Promise<ApiResponse<AboutUsDto>> {
    return publicFetch<AboutUsDto>(API_ENDPOINTS.PUBLIC.ABOUT_US);
  },
};
