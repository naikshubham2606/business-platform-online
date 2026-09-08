using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Repositories;

namespace business_platform_api.Services;

public interface IBusinessProfileService
{
    Task<ApiResponse<BusinessProfileDto>> GetProfileAsync();
    Task<ApiResponse<BusinessBrandingDto>> GetBrandingAsync();
    Task<ApiResponse<BusinessContactDto>> GetContactAsync();
}

public class BusinessProfileService : IBusinessProfileService
{
    private readonly IBusinessProfileRepository _repository;
    private readonly IMapper _mapper;

    public BusinessProfileService(IBusinessProfileRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<ApiResponse<BusinessProfileDto>> GetProfileAsync()
    {
        var profile = await _repository.GetActiveProfileAsync();
        if (profile == null)
            return ApiResponse<BusinessProfileDto>.Failure("Business profile not found.");

        var dto = _mapper.Map<BusinessProfileDto>(profile);
        return ApiResponse<BusinessProfileDto>.Success(dto);
    }

    public async Task<ApiResponse<BusinessBrandingDto>> GetBrandingAsync()
    {
        var profile = await _repository.GetActiveProfileAsync();
        if (profile == null)
            return ApiResponse<BusinessBrandingDto>.Failure("Business profile not found.");

        var dto = _mapper.Map<BusinessBrandingDto>(profile);
        return ApiResponse<BusinessBrandingDto>.Success(dto);
    }

    public async Task<ApiResponse<BusinessContactDto>> GetContactAsync()
    {
        var profile = await _repository.GetActiveProfileAsync();
        if (profile == null)
            return ApiResponse<BusinessContactDto>.Failure("Business profile not found.");

        var dto = _mapper.Map<BusinessContactDto>(profile);
        return ApiResponse<BusinessContactDto>.Success(dto);
    }
}
