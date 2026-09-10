namespace business_platform_api.Models.DTOs;

public class QuoteRequestCreateDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? WhatsAppNumber { get; set; }
    public int? PreferredContactMethodId { get; set; }

    public int PropertyTypeId { get; set; }
    public decimal? PropertySize { get; set; }
    public int? PropertySizeUnitId { get; set; }

    public int? WorkAreaTypeId { get; set; }
    public decimal? WorkAreaLength { get; set; }
    public decimal? WorkAreaWidth { get; set; }
    public int? WorkAreaDimensionUnitId { get; set; }

    public string AddressLine1 { get; set; } = string.Empty;
    public string? AddressLine2 { get; set; }
    public string City { get; set; } = string.Empty;
    public string? State { get; set; }
    public string Country { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;

    public double? Latitude { get; set; }
    public double? Longitude { get; set; }

    public string ProjectDescription { get; set; } = string.Empty;
    public string? ExistingSiteDescription { get; set; }
    public string? SiteAccessDescription { get; set; }

    public DateTime? PreferredStartDate { get; set; }
    public int? UrgencyTypeId { get; set; }

    public List<int> ServiceIds { get; set; } = new();
}

public class QuoteRequestResponseDto
{
    public Guid Id { get; set; }
    public string RequestNumber { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedDateTime { get; set; }
}
