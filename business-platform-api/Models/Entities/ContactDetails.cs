namespace business_platform_api.Models.Entities;

public class ContactDetails : BaseEntity
{
    public string? PhoneNumber { get; set; }
    public string? AlternatePhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? AlternateEmail { get; set; }
    public string? WhatsAppNumber { get; set; }
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Country { get; set; }
    public string? PostalCode { get; set; }
    public string? GoogleMapsUrl { get; set; }
    public string? Latitude { get; set; }
    public string? Longitude { get; set; }
    public string? WebsiteUrl { get; set; }
}
