import { API_ENDPOINTS } from '@/config/api';
import type { ApiResponse } from '@/types/api';
import type { ServiceListDto, ServiceDetailsDto } from '@/types/service';
import { publicFetch } from './publicBusinessService';

export const publicServicesService = {
  /**
   * GET /api/public/services
   * Returns list of active services.
   */
  getServices(): Promise<ApiResponse<ServiceListDto[]>> {
    return publicFetch<ServiceListDto[]>(API_ENDPOINTS.PUBLIC.SERVICES);
  },

  /**
   * GET /api/public/services/{id}
   * Returns complete details for a specific service.
   */
  getServiceById(id: number | string): Promise<ApiResponse<ServiceDetailsDto>> {
    return publicFetch<ServiceDetailsDto>(API_ENDPOINTS.PUBLIC.SERVICE_DETAILS(id));
  },
};
