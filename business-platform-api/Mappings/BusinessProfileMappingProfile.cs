using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Models.Entities;

namespace business_platform_api.Mappings;

public class BusinessProfileMappingProfile : Profile
{
    public BusinessProfileMappingProfile()
    {
        CreateMap<BusinessProfile, BusinessProfileDto>();
        CreateMap<BusinessProfile, BusinessBrandingDto>();
        CreateMap<ContactDetails, ContactDetailsDto>();
    }
}
