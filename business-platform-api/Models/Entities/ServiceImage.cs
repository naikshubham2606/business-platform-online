namespace business_platform_api.Models.Entities;

public class ServiceImage : BaseEntity
{
    public int ServiceId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? AltText { get; set; }
    public bool IsPrimary { get; set; } = false;
    public int DisplayOrder { get; set; } = 0;

    public Service Service { get; set; } = null!;
}
