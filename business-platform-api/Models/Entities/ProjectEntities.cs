namespace business_platform_api.Models.Entities;

public class Project : BaseGuidEntity
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    public string? Location { get; set; }
    public DateTime? CompletionDate { get; set; }
    
    public bool IsFeatured { get; set; } = false;
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; } = 0;

    // Navigation properties
    public ICollection<ProjectImage> Images { get; set; } = new List<ProjectImage>();
    public ICollection<ProjectService> ProjectServices { get; set; } = new List<ProjectService>();
}

public class ProjectImage : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;

    public string ImageUrl { get; set; } = string.Empty;
    public string? AltText { get; set; }
    public bool IsPrimary { get; set; } = false;
    public int DisplayOrder { get; set; } = 0;
}

public class ProjectService : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;

    public int ServiceId { get; set; }
    public Service Service { get; set; } = null!;
}
