using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Repositories;
using business_platform_api.Models.Entities;

namespace business_platform_api.Services;

public interface IPublicQuoteRequestService
{
    Task<ApiResponse<QuoteRequestResponseDto>> CreateQuoteRequestAsync(QuoteRequestCreateDto dto);
}

public class PublicQuoteRequestService : IPublicQuoteRequestService
{
    private readonly IQuoteRequestRepository _repository;
    private readonly IMasterDataRepository<PropertyType> _propertyTypeRepo;
    private readonly IMasterDataRepository<WorkAreaType> _workAreaTypeRepo;
    private readonly IMasterDataRepository<MeasurementUnit> _measurementUnitRepo;
    private readonly IMasterDataRepository<UrgencyType> _urgencyTypeRepo;
    private readonly IMasterDataRepository<ContactMethod> _contactMethodRepo;
    private readonly IServiceRepository _serviceRepo;
    private readonly IMapper _mapper;

    public PublicQuoteRequestService(
        IQuoteRequestRepository repository,
        IMasterDataRepository<PropertyType> propertyTypeRepo,
        IMasterDataRepository<WorkAreaType> workAreaTypeRepo,
        IMasterDataRepository<MeasurementUnit> measurementUnitRepo,
        IMasterDataRepository<UrgencyType> urgencyTypeRepo,
        IMasterDataRepository<ContactMethod> contactMethodRepo,
        IServiceRepository serviceRepo,
        IMapper mapper)
    {
        _repository = repository;
        _propertyTypeRepo = propertyTypeRepo;
        _workAreaTypeRepo = workAreaTypeRepo;
        _measurementUnitRepo = measurementUnitRepo;
        _urgencyTypeRepo = urgencyTypeRepo;
        _contactMethodRepo = contactMethodRepo;
        _serviceRepo = serviceRepo;
        _mapper = mapper;
    }

    public async Task<ApiResponse<QuoteRequestResponseDto>> CreateQuoteRequestAsync(QuoteRequestCreateDto dto)
    {
        // Validations
        if (string.IsNullOrWhiteSpace(dto.FirstName) || string.IsNullOrWhiteSpace(dto.LastName))
            return ApiResponse<QuoteRequestResponseDto>.Failure("First and Last name are required.");
        
        if (string.IsNullOrWhiteSpace(dto.Email) && string.IsNullOrWhiteSpace(dto.PhoneNumber))
            return ApiResponse<QuoteRequestResponseDto>.Failure("Email or Phone Number is required.");

        if (string.IsNullOrWhiteSpace(dto.ProjectDescription))
            return ApiResponse<QuoteRequestResponseDto>.Failure("Project Description is required.");

        if (!dto.ServiceIds.Any())
            return ApiResponse<QuoteRequestResponseDto>.Failure("At least one service must be selected.");

        var activeServices = await _serviceRepo.GetActiveServicesAsync();
        var validServiceIds = activeServices.Select(s => s.Id).ToList();
        var distinctRequestedServices = dto.ServiceIds.Distinct().ToList();

        foreach(var sId in distinctRequestedServices)
        {
            if(!validServiceIds.Contains(sId))
                return ApiResponse<QuoteRequestResponseDto>.Failure($"Invalid or inactive service selected (ID: {sId}).");
        }

        var propertyType = await _propertyTypeRepo.GetByIdAsync(dto.PropertyTypeId);
        if (propertyType == null || !propertyType.IsActive)
            return ApiResponse<QuoteRequestResponseDto>.Failure("Invalid property type selected.");

        if (dto.WorkAreaTypeId.HasValue)
        {
            var workAreaType = await _workAreaTypeRepo.GetByIdAsync(dto.WorkAreaTypeId.Value);
            if (workAreaType == null || !workAreaType.IsActive)
                return ApiResponse<QuoteRequestResponseDto>.Failure("Invalid work area type selected.");
        }

        if (dto.PropertySizeUnitId.HasValue)
        {
            var unit = await _measurementUnitRepo.GetByIdAsync(dto.PropertySizeUnitId.Value);
            if (unit == null || !unit.IsActive)
                return ApiResponse<QuoteRequestResponseDto>.Failure("Invalid property size unit selected.");
        }

        if (dto.WorkAreaDimensionUnitId.HasValue)
        {
            var unit = await _measurementUnitRepo.GetByIdAsync(dto.WorkAreaDimensionUnitId.Value);
            if (unit == null || !unit.IsActive)
                return ApiResponse<QuoteRequestResponseDto>.Failure("Invalid work area dimension unit selected.");
        }

        if (dto.UrgencyTypeId.HasValue)
        {
            var urgency = await _urgencyTypeRepo.GetByIdAsync(dto.UrgencyTypeId.Value);
            if (urgency == null || !urgency.IsActive)
                return ApiResponse<QuoteRequestResponseDto>.Failure("Invalid urgency type selected.");
        }

        if (dto.PreferredContactMethodId.HasValue)
        {
            var contactMethod = await _contactMethodRepo.GetByIdAsync(dto.PreferredContactMethodId.Value);
            if (contactMethod == null || !contactMethod.IsActive)
                return ApiResponse<QuoteRequestResponseDto>.Failure("Invalid contact method selected.");
        }
        
        if (dto.PropertySize <= 0) return ApiResponse<QuoteRequestResponseDto>.Failure("Property size must be greater than 0.");
        if (dto.WorkAreaLength <= 0) return ApiResponse<QuoteRequestResponseDto>.Failure("Work area length must be greater than 0.");
        if (dto.WorkAreaWidth <= 0) return ApiResponse<QuoteRequestResponseDto>.Failure("Work area width must be greater than 0.");

        var status = await _repository.GetStatusByNameAsync("New");
        if (status == null)
            return ApiResponse<QuoteRequestResponseDto>.Failure("System error: 'New' status not found.");

        var newRequest = new QuoteRequest
        {
            Id = Guid.NewGuid(),
            RequestNumber = $"RQ-{DateTime.UtcNow:yyyyMM}-{new Random().Next(1000, 9999)}", // Simplified for now. Could be a sequence.
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            PhoneNumber = dto.PhoneNumber,
            WhatsAppNumber = dto.WhatsAppNumber,
            PreferredContactMethodId = dto.PreferredContactMethodId,
            PropertyTypeId = dto.PropertyTypeId,
            PropertySize = dto.PropertySize,
            PropertySizeUnitId = dto.PropertySizeUnitId,
            WorkAreaTypeId = dto.WorkAreaTypeId,
            WorkAreaLength = dto.WorkAreaLength,
            WorkAreaWidth = dto.WorkAreaWidth,
            WorkAreaDimensionUnitId = dto.WorkAreaDimensionUnitId,
            AddressLine1 = dto.AddressLine1,
            AddressLine2 = dto.AddressLine2,
            City = dto.City,
            State = dto.State,
            Country = dto.Country,
            PostalCode = dto.PostalCode,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            ProjectDescription = dto.ProjectDescription,
            ExistingSiteDescription = dto.ExistingSiteDescription,
            SiteAccessDescription = dto.SiteAccessDescription,
            PreferredStartDate = dto.PreferredStartDate,
            UrgencyTypeId = dto.UrgencyTypeId,
            StatusId = status.Id
        };

        foreach (var sId in distinctRequestedServices)
        {
            newRequest.Services.Add(new QuoteRequestService
            {
                QuoteRequestId = newRequest.Id,
                ServiceId = sId
            });
        }

        await _repository.AddAsync(newRequest);

        var responseDto = _mapper.Map<QuoteRequestResponseDto>(newRequest);
        responseDto.Status = status.Name;

        return ApiResponse<QuoteRequestResponseDto>.Success(responseDto);
    }
}
