using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Models.Entities;
using business_platform_api.Repositories;

namespace business_platform_api.Services;

public class ContactDetailsService : GenericCrudService<ContactDetails, ContactDetailsDto, ContactDetailsDto, ContactDetailsDto, int>, IContactDetailsService
{
    public ContactDetailsService(IGenericRepository<ContactDetails, int> repository, IMapper mapper) 
        : base(repository, mapper)
    {
    }

    public async Task<ApiResponse<ContactDetailsDto>> GetCurrentContactDetailsAsync()
    {
        // For a single-tenant deployment, we assume the active contact config is Id = 1.
        // We could also do GetAllAsync and take the first one.
        var result = await GetByIdAsync(1);
        if (!result.IsSuccess)
        {
            return ApiResponse<ContactDetailsDto>.Failure("Contact information is currently unavailable.");
        }
        return result;
    }
}
