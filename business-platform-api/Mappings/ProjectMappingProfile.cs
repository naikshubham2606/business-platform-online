using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Models.Entities;

namespace business_platform_api.Mappings;

public class ProjectMappingProfile : Profile
{
    public ProjectMappingProfile()
    {
        // Service Summary mapping for Projects
        CreateMap<Service, ServiceSummaryDto>();

        // Project Image Mapping
        CreateMap<ProjectImage, ProjectImageDto>();

        // Project Details Mapping
        CreateMap<Project, ProjectDetailsDto>()
            .ForMember(dest => dest.Services, opt => opt.MapFrom(src => src.ProjectServices.Select(ps => ps.Service)));

        // Project List Mapping - resolve primary image dynamically
        CreateMap<Project, ProjectListDto>()
            .ForMember(dest => dest.PrimaryImageUrl, opt => opt.MapFrom(src => GetPrimaryImageUrl(src)))
            .ForMember(dest => dest.PrimaryImageAltText, opt => opt.MapFrom(src => GetPrimaryImageAltText(src)))
            .ForMember(dest => dest.Services, opt => opt.MapFrom(src => src.ProjectServices.Select(ps => ps.Service)));
    }

    private string? GetPrimaryImageUrl(Project project)
    {
        var primaryImage = project.Images.FirstOrDefault(i => i.IsPrimary) 
                           ?? project.Images.OrderBy(i => i.DisplayOrder).FirstOrDefault();
        return primaryImage?.ImageUrl;
    }

    private string? GetPrimaryImageAltText(Project project)
    {
        var primaryImage = project.Images.FirstOrDefault(i => i.IsPrimary) 
                           ?? project.Images.OrderBy(i => i.DisplayOrder).FirstOrDefault();
        return primaryImage?.AltText;
    }
}
