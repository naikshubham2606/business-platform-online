namespace business_platform_api.Models.Entities;

public class AboutUs : BaseEntity
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

    public ICollection<AboutUsHighlight> Highlights { get; set; } = new List<AboutUsHighlight>();
    public ICollection<AboutUsValue> Values { get; set; } = new List<AboutUsValue>();
    public ICollection<AboutUsStatistic> Statistics { get; set; } = new List<AboutUsStatistic>();
}
