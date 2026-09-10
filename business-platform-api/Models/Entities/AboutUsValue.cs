namespace business_platform_api.Models.Entities;

public class AboutUsValue : BaseEntity
{
    public int AboutUsId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public int DisplayOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;

    public AboutUs AboutUs { get; set; } = null!;
}
