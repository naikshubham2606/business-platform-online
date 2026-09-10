using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Repositories;

namespace business_platform_api.Services;

public interface IPublicProjectService
{
    Task<ApiResponse<IEnumerable<ProjectListDto>>> GetProjectsAsync();
    Task<ApiResponse<ProjectDetailsDto>> GetProjectDetailsAsync(Guid id);
}

public class PublicProjectService : IPublicProjectService
{
    private readonly IProjectRepository _projectRepository;
    private readonly IMapper _mapper;

    public PublicProjectService(IProjectRepository projectRepository, IMapper mapper)
    {
        _projectRepository = projectRepository;
        _mapper = mapper;
    }

    public async Task<ApiResponse<IEnumerable<ProjectListDto>>> GetProjectsAsync()
    {
        var projects = await _projectRepository.GetActiveProjectsAsync();
        var dtos = _mapper.Map<IEnumerable<ProjectListDto>>(projects);
        return ApiResponse<IEnumerable<ProjectListDto>>.Success(dtos);
    }

    public async Task<ApiResponse<ProjectDetailsDto>> GetProjectDetailsAsync(Guid id)
    {
        var project = await _projectRepository.GetProjectDetailsAsync(id);
        
        if (project == null)
            return ApiResponse<ProjectDetailsDto>.Failure("Project not found.");

        var dto = _mapper.Map<ProjectDetailsDto>(project);
        
        // Ensure images are sorted by DisplayOrder
        if (dto.Images != null && dto.Images.Any())
        {
            dto.Images = dto.Images.OrderBy(i => i.DisplayOrder).ToList();
        }

        return ApiResponse<ProjectDetailsDto>.Success(dto);
    }
}
