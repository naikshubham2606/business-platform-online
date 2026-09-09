using business_platform_api.Models.DTOs;
using business_platform_api.Models.Entities;

namespace business_platform_api.Services;

public interface IContactDetailsService : IGenericCrudService<ContactDetails, ContactDetailsDto, ContactDetailsDto, ContactDetailsDto, int>
{
    Task<ApiResponse<ContactDetailsDto>> GetCurrentContactDetailsAsync();
}
