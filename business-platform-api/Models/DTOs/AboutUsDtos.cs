namespace business_platform_api.Models.DTOs;

public class AboutUsDto
{
    public string? HeroImageUrl { get; set; }
    public string? HeroImageAltText { get; set; }
    public string IntroductionTitle { get; set; } = string.Empty;
    public string Introduction { get; set; } = string.Empty;
    public string StoryTitle { get; set; } = string.Empty;
    public string Story { get; set; } = string.Empty;
    public string MissionTitle { get; set; } = string.Empty;
    public string Mission { get; set; } = string.Empty;
    public string VisionTitle { get; set; } = string.Empty;
    public string Vision { get; set; } = string.Empty;
    public string ApproachTitle { get; set; } = string.Empty;
    public string Approach { get; set; } = string.Empty;
    public string ExperienceTitle { get; set; } = string.Empty;
    public string ExperienceText { get; set; } = string.Empty;
    public string ClosingTitle { get; set; } = string.Empty;
    public string ClosingText { get; set; } = string.Empty;

    public List<AboutUsHighlightDto> Highlights { get; set; } = new();
    public List<AboutUsValueDto> Values { get; set; } = new();
    public List<AboutUsStatisticDto> Statistics { get; set; } = new();
}

public class AboutUsHighlightDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public int DisplayOrder { get; set; }
}

public class AboutUsValueDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public int DisplayOrder { get; set; }
}

public class AboutUsStatisticDto
{
    public int Id { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string? Suffix { get; set; }
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
}
