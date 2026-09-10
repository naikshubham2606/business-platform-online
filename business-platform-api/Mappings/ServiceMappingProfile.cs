using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Models.Entities;

namespace business_platform_api.Mappings;

public class ServiceMappingProfile : Profile
{
    public ServiceMappingProfile()
    {
        CreateMap<Service, ServiceListDto>()
            .ForMember(dest => dest.PrimaryImageUrl, opt => opt.MapFrom(src => 
                src.Images.FirstOrDefault(i => i.IsPrimary) != null 
                    ? src.Images.FirstOrDefault(i => i.IsPrimary)!.ImageUrl 
                    : src.Images.OrderBy(i => i.DisplayOrder).FirstOrDefault() != null 
                        ? src.Images.OrderBy(i => i.DisplayOrder).FirstOrDefault()!.ImageUrl 
                        : null));

        CreateMap<Service, ServiceDetailsDto>();
        CreateMap<ServiceImage, ServiceImageDto>();
    }
}
