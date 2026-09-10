using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Repositories;

namespace business_platform_api.Services;

public class PublicServiceService : IPublicServiceService
{
    private readonly IServiceRepository _repository;
    private readonly IMapper _mapper;

    public PublicServiceService(IServiceRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<ApiResponse<List<ServiceListDto>>> GetActiveServicesAsync()
    {
        var services = await _repository.GetActiveServicesAsync();
        var dtos = _mapper.Map<List<ServiceListDto>>(services);
        return ApiResponse<List<ServiceListDto>>.Success(dtos);
    }

    public async Task<ApiResponse<ServiceDetailsDto>> GetActiveServiceByIdAsync(int id)
    {
        var service = await _repository.GetActiveServiceByIdWithImagesAsync(id);
        if (service == null)
        {
            return ApiResponse<ServiceDetailsDto>.Failure("Service not found.");
        }

        var dto = _mapper.Map<ServiceDetailsDto>(service);
        return ApiResponse<ServiceDetailsDto>.Success(dto);
    }

    public async Task<ApiResponse<ServiceDetailsDto>> GetActiveServiceBySlugAsync(string slug)
    {
        var service = await _repository.GetActiveServiceBySlugWithImagesAsync(slug);
        if (service == null)
        {
            return ApiResponse<ServiceDetailsDto>.Failure("Service not found.");
        }

        var dto = _mapper.Map<ServiceDetailsDto>(service);
        return ApiResponse<ServiceDetailsDto>.Success(dto);
    }
}
