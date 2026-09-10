namespace business_platform_api.Models.Entities;

public class QuoteRequest : BaseGuidEntity
{
    public string RequestNumber { get; set; } = string.Empty;

    // Customer Info
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? WhatsAppNumber { get; set; }
    
    public int? PreferredContactMethodId { get; set; }
    public ContactMethod? PreferredContactMethod { get; set; }

    // Property & Size
    public int PropertyTypeId { get; set; }
    public PropertyType PropertyType { get; set; } = null!;

    public decimal? PropertySize { get; set; }
    public int? PropertySizeUnitId { get; set; }
    public MeasurementUnit? PropertySizeUnit { get; set; }

    // Work Area Dimensions
    public int? WorkAreaTypeId { get; set; }
    public WorkAreaType? WorkAreaType { get; set; }

    public decimal? WorkAreaLength { get; set; }
    public decimal? WorkAreaWidth { get; set; }
    public int? WorkAreaDimensionUnitId { get; set; }
    public MeasurementUnit? WorkAreaDimensionUnit { get; set; }

    // Address
    public string AddressLine1 { get; set; } = string.Empty;
    public string? AddressLine2 { get; set; }
    public string City { get; set; } = string.Empty;
    public string? State { get; set; }
    public string Country { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;

    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    // Project Details
    public string ProjectDescription { get; set; } = string.Empty;
    public string? ExistingSiteDescription { get; set; }
    public string? SiteAccessDescription { get; set; }

    public DateTime? PreferredStartDate { get; set; }
    
    public int? UrgencyTypeId { get; set; }
    public UrgencyType? UrgencyType { get; set; }

    // Status
    public int StatusId { get; set; }
    public QuoteRequestStatus Status { get; set; } = null!;

    // Collections
    public ICollection<QuoteRequestService> Services { get; set; } = new List<QuoteRequestService>();
    public ICollection<QuoteRequestImage> Images { get; set; } = new List<QuoteRequestImage>();
}

public class QuoteRequestService : BaseEntity
{
    public Guid QuoteRequestId { get; set; }
    public QuoteRequest QuoteRequest { get; set; } = null!;

    public int ServiceId { get; set; }
    public Service Service { get; set; } = null!;

    public string? Description { get; set; }
}

public class QuoteRequestImage : BaseEntity
{
    public Guid QuoteRequestId { get; set; }
    public QuoteRequest QuoteRequest { get; set; } = null!;

    public string ImageUrl { get; set; } = string.Empty;
    public string OriginalFileName { get; set; } = string.Empty;
    public string? AltText { get; set; }
    public int DisplayOrder { get; set; } = 0;
}
