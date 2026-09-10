namespace business_platform_api.Models.DTOs;

public class ServiceSummaryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
}

public class ProjectListDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    
    public string? PrimaryImageUrl { get; set; }
    public string? PrimaryImageAltText { get; set; }

    public List<ServiceSummaryDto> Services { get; set; } = new();
}

public class ProjectImageDto
{
    public int Id { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? AltText { get; set; }
    public bool IsPrimary { get; set; }
    public int DisplayOrder { get; set; }
}

public class ProjectDetailsDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    public string? Location { get; set; }
    public DateTime? CompletionDate { get; set; }
    public bool IsFeatured { get; set; }

    public List<ProjectImageDto> Images { get; set; } = new();
    public List<ServiceSummaryDto> Services { get; set; } = new();
}
