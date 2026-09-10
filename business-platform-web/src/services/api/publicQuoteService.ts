import type { ApiResponse } from '@/types/api';
import type { MasterDataDto, MeasurementUnitDto, QuoteRequestCreateDto, QuoteRequestResponseDto } from '@/types/quote';
import { API_ENDPOINTS } from '@/config/api';
import { publicFetch } from '@/services/api/publicBusinessService';

export const publicQuoteService = {
  getPropertyTypes(): Promise<ApiResponse<MasterDataDto[]>> {
    return publicFetch<MasterDataDto[]>(API_ENDPOINTS.PUBLIC.PROPERTY_TYPES);
  },

  getWorkAreaTypes(): Promise<ApiResponse<MasterDataDto[]>> {
    return publicFetch<MasterDataDto[]>(API_ENDPOINTS.PUBLIC.WORK_AREA_TYPES);
  },

  getMeasurementUnits(): Promise<ApiResponse<MeasurementUnitDto[]>> {
    return publicFetch<MeasurementUnitDto[]>(API_ENDPOINTS.PUBLIC.MEASUREMENT_UNITS);
  },

  getUrgencyTypes(): Promise<ApiResponse<MasterDataDto[]>> {
    return publicFetch<MasterDataDto[]>(API_ENDPOINTS.PUBLIC.URGENCY_TYPES);
  },

  getContactMethods(): Promise<ApiResponse<MasterDataDto[]>> {
    return publicFetch<MasterDataDto[]>(API_ENDPOINTS.PUBLIC.CONTACT_METHODS);
  },

  async createQuoteRequest(data: QuoteRequestCreateDto): Promise<ApiResponse<QuoteRequestResponseDto>> {
    try {
      const response = await fetch(API_ENDPOINTS.PUBLIC.QUOTE_REQUESTS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      let json: ApiResponse<QuoteRequestResponseDto>;
      try {
        json = await response.json();
      } catch {
        return {
          isSuccess: false,
          data: null,
          message: `Server returned an unexpected response (HTTP ${response.status}).`,
        };
      }

      if (!response.ok && json.isSuccess) {
        json = { ...json, isSuccess: false };
      }

      return json;
    } catch {
      return {
        isSuccess: false,
        data: null,
        message: 'Unable to connect to the server. Please check your connection and try again.',
      };
    }
  }
};
