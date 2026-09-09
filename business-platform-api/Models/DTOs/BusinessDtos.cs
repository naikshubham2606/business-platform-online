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
