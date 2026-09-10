using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Models.Entities;

namespace business_platform_api.Mappings;

public class AboutUsMappingProfile : Profile
{
    public AboutUsMappingProfile()
    {
        CreateMap<AboutUs, AboutUsDto>();
        CreateMap<AboutUsHighlight, AboutUsHighlightDto>();
        CreateMap<AboutUsValue, AboutUsValueDto>();
        CreateMap<AboutUsStatistic, AboutUsStatisticDto>();
    }
}
