using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Repositories;
using business_platform_api.Models.Entities;

namespace business_platform_api.Services;

public interface IPublicMasterDataService
{
    Task<ApiResponse<IEnumerable<MasterDataDto>>> GetPropertyTypesAsync();
    Task<ApiResponse<IEnumerable<MasterDataDto>>> GetWorkAreaTypesAsync();
    Task<ApiResponse<IEnumerable<MeasurementUnitDto>>> GetMeasurementUnitsAsync();
    Task<ApiResponse<IEnumerable<MasterDataDto>>> GetUrgencyTypesAsync();
    Task<ApiResponse<IEnumerable<MasterDataDto>>> GetContactMethodsAsync();
}

public class PublicMasterDataService : IPublicMasterDataService
{
    private readonly IMasterDataRepository<PropertyType> _propertyTypeRepo;
    private readonly IMasterDataRepository<WorkAreaType> _workAreaTypeRepo;
    private readonly IMasterDataRepository<MeasurementUnit> _measurementUnitRepo;
    private readonly IMasterDataRepository<UrgencyType> _urgencyTypeRepo;
    private readonly IMasterDataRepository<ContactMethod> _contactMethodRepo;
    private readonly IMapper _mapper;

    public PublicMasterDataService(
        IMasterDataRepository<PropertyType> propertyTypeRepo,
        IMasterDataRepository<WorkAreaType> workAreaTypeRepo,
        IMasterDataRepository<MeasurementUnit> measurementUnitRepo,
        IMasterDataRepository<UrgencyType> urgencyTypeRepo,
        IMasterDataRepository<ContactMethod> contactMethodRepo,
        IMapper mapper)
    {
        _propertyTypeRepo = propertyTypeRepo;
        _workAreaTypeRepo = workAreaTypeRepo;
        _measurementUnitRepo = measurementUnitRepo;
        _urgencyTypeRepo = urgencyTypeRepo;
        _contactMethodRepo = contactMethodRepo;
        _mapper = mapper;
    }

    public async Task<ApiResponse<IEnumerable<MasterDataDto>>> GetPropertyTypesAsync()
    {
        var entities = await _propertyTypeRepo.GetActiveAsync();
        return ApiResponse<IEnumerable<MasterDataDto>>.Success(_mapper.Map<IEnumerable<MasterDataDto>>(entities));
    }

    public async Task<ApiResponse<IEnumerable<MasterDataDto>>> GetWorkAreaTypesAsync()
    {
        var entities = await _workAreaTypeRepo.GetActiveAsync();
        return ApiResponse<IEnumerable<MasterDataDto>>.Success(_mapper.Map<IEnumerable<MasterDataDto>>(entities));
    }

    public async Task<ApiResponse<IEnumerable<MeasurementUnitDto>>> GetMeasurementUnitsAsync()
    {
        var entities = await _measurementUnitRepo.GetActiveAsync();
        return ApiResponse<IEnumerable<MeasurementUnitDto>>.Success(_mapper.Map<IEnumerable<MeasurementUnitDto>>(entities));
    }

    public async Task<ApiResponse<IEnumerable<MasterDataDto>>> GetUrgencyTypesAsync()
    {
        var entities = await _urgencyTypeRepo.GetActiveAsync();
        return ApiResponse<IEnumerable<MasterDataDto>>.Success(_mapper.Map<IEnumerable<MasterDataDto>>(entities));
    }

    public async Task<ApiResponse<IEnumerable<MasterDataDto>>> GetContactMethodsAsync()
    {
        var entities = await _contactMethodRepo.GetActiveAsync();
        return ApiResponse<IEnumerable<MasterDataDto>>.Success(_mapper.Map<IEnumerable<MasterDataDto>>(entities));
    }
}
