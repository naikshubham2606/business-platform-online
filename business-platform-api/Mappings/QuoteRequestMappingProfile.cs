using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Models.Entities;

namespace business_platform_api.Mappings;

public class MasterDataMappingProfile : Profile
{
    public MasterDataMappingProfile()
    {
        CreateMap<PropertyType, MasterDataDto>();
        CreateMap<WorkAreaType, MasterDataDto>();
        CreateMap<MeasurementUnit, MeasurementUnitDto>();
        CreateMap<UrgencyType, MasterDataDto>();
        CreateMap<ContactMethod, MasterDataDto>();
        CreateMap<QuoteRequestStatus, MasterDataDto>();
    }
}

public class QuoteRequestMappingProfile : Profile
{
    public QuoteRequestMappingProfile()
    {
        CreateMap<QuoteRequest, QuoteRequestResponseDto>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.Name));
    }
}
