using business_platform_api.Models.DTOs;

namespace business_platform_api.Services;

public interface IPublicServiceService
{
    Task<ApiResponse<List<ServiceListDto>>> GetActiveServicesAsync();
    Task<ApiResponse<ServiceDetailsDto>> GetActiveServiceByIdAsync(int id);
    Task<ApiResponse<ServiceDetailsDto>> GetActiveServiceBySlugAsync(string slug);
}
