namespace business_platform_api.Models.Entities;

public class AboutUsStatistic : BaseEntity
{
    public int AboutUsId { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string? Suffix { get; set; }
    public string? Description { get; set; }
    public int DisplayOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;

    public AboutUs AboutUs { get; set; } = null!;
}
