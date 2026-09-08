namespace business_platform_api.Models.DTOs;

public class BusinessProfileDto
{
    public string BusinessName { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string? AboutDescription { get; set; }
}

public class BusinessBrandingDto
{
    public string BusinessName { get; set; } = string.Empty;
    public string? LogoPath { get; set; }
    public string? FaviconPath { get; set; }
    public string? Tagline { get; set; }
}

public class BusinessContactDto
{
    public string? PhoneNumber { get; set; }
    public string? AlternatePhone { get; set; }
    public string? Email { get; set; }
    public string? WebsiteUrl { get; set; }
    public string? AddressLine { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Country { get; set; }
    public string? PostalCode { get; set; }
    public string? FacebookUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? WhatsAppNumber { get; set; }
}
