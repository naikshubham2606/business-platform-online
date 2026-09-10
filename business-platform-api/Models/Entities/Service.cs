namespace business_platform_api.Models.Entities;

public class Service : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; } = 0;

    public ICollection<ServiceImage> Images { get; set; } = new List<ServiceImage>();
}
