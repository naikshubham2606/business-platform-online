namespace business_platform_api.Models.Entities;

public class BusinessProfile : BaseEntity
{
    public string BusinessName { get; set; } = string.Empty;
    public string? LogoPath { get; set; }
    public string? FaviconPath { get; set; }
    public string? Tagline { get; set; }
    public string? ShortDescription { get; set; }
    public string? AboutDescription { get; set; }
    public string? FacebookUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public bool IsActive { get; set; }
}
