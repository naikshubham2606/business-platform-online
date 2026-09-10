using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace business_platform_api.Models.Configurations;

public class AboutUsConfiguration : IEntityTypeConfiguration<AboutUs>
{
    public void Configure(EntityTypeBuilder<AboutUs> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.HeroImageUrl).HasMaxLength(500);
        builder.Property(x => x.HeroImageAltText).HasMaxLength(255);
        builder.Property(x => x.IntroductionTitle).IsRequired().HasMaxLength(150);
        builder.Property(x => x.Introduction).IsRequired().HasColumnType("text");
        builder.Property(x => x.StoryTitle).IsRequired().HasMaxLength(150);
        builder.Property(x => x.Story).IsRequired().HasColumnType("text");
        builder.Property(x => x.MissionTitle).IsRequired().HasMaxLength(150);
        builder.Property(x => x.Mission).IsRequired().HasColumnType("text");
        builder.Property(x => x.VisionTitle).IsRequired().HasMaxLength(150);
        builder.Property(x => x.Vision).IsRequired().HasColumnType("text");
        builder.Property(x => x.ApproachTitle).IsRequired().HasMaxLength(150);
        builder.Property(x => x.Approach).IsRequired().HasColumnType("text");
        builder.Property(x => x.ExperienceTitle).IsRequired().HasMaxLength(150);
        builder.Property(x => x.ExperienceText).IsRequired().HasColumnType("text");
        builder.Property(x => x.ClosingTitle).IsRequired().HasMaxLength(150);
        builder.Property(x => x.ClosingText).IsRequired().HasColumnType("text");
    }
}

public class AboutUsHighlightConfiguration : IEntityTypeConfiguration<AboutUsHighlight>
{
    public void Configure(EntityTypeBuilder<AboutUsHighlight> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title).IsRequired().HasMaxLength(150);
        builder.Property(x => x.Description).IsRequired().HasMaxLength(500);
        builder.Property(x => x.Icon).HasMaxLength(100);

        builder.HasOne(x => x.AboutUs)
            .WithMany(x => x.Highlights)
            .HasForeignKey(x => x.AboutUsId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => x.AboutUsId);
        builder.HasIndex(x => new { x.AboutUsId, x.DisplayOrder });
    }
}

public class AboutUsValueConfiguration : IEntityTypeConfiguration<AboutUsValue>
{
    public void Configure(EntityTypeBuilder<AboutUsValue> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title).IsRequired().HasMaxLength(150);
        builder.Property(x => x.Description).IsRequired().HasMaxLength(500);
        builder.Property(x => x.Icon).HasMaxLength(100);

        builder.HasOne(x => x.AboutUs)
            .WithMany(x => x.Values)
            .HasForeignKey(x => x.AboutUsId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => x.AboutUsId);
        builder.HasIndex(x => new { x.AboutUsId, x.DisplayOrder });
    }
}

public class AboutUsStatisticConfiguration : IEntityTypeConfiguration<AboutUsStatistic>
{
    public void Configure(EntityTypeBuilder<AboutUsStatistic> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Label).IsRequired().HasMaxLength(150);
        builder.Property(x => x.Value).IsRequired().HasMaxLength(50);
        builder.Property(x => x.Suffix).HasMaxLength(50);
        builder.Property(x => x.Description).HasMaxLength(255);

        builder.HasOne(x => x.AboutUs)
            .WithMany(x => x.Statistics)
            .HasForeignKey(x => x.AboutUsId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => x.AboutUsId);
        builder.HasIndex(x => new { x.AboutUsId, x.DisplayOrder });
    }
}
