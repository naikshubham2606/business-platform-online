using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Repositories;

namespace business_platform_api.Services;

public interface IAboutUsService
{
    Task<ApiResponse<AboutUsDto>> GetAboutUsAsync();
}

public class AboutUsService : IAboutUsService
{
    private readonly IAboutUsRepository _repository;
    private readonly IMapper _mapper;

    public AboutUsService(IAboutUsRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<ApiResponse<AboutUsDto>> GetAboutUsAsync()
    {
        var aboutUs = await _repository.GetAboutUsWithDetailsAsync();
        if (aboutUs == null)
            return ApiResponse<AboutUsDto>.Failure("About Us information not found.");

        var dto = _mapper.Map<AboutUsDto>(aboutUs);
        return ApiResponse<AboutUsDto>.Success(dto);
    }
}
