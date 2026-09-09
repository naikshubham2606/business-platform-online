using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace business_platform_api.Models.Configurations;

public class BusinessProfileConfiguration : IEntityTypeConfiguration<BusinessProfile>
{
    public void Configure(EntityTypeBuilder<BusinessProfile> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.BusinessName).IsRequired().HasMaxLength(100);
        builder.Property(x => x.LogoPath).HasMaxLength(255);
        builder.Property(x => x.FaviconPath).HasMaxLength(255);
        builder.Property(x => x.Tagline).HasMaxLength(255);
        builder.Property(x => x.ShortDescription).HasMaxLength(500);
        builder.Property(x => x.FacebookUrl).HasMaxLength(255);
        builder.Property(x => x.InstagramUrl).HasMaxLength(255);

        // Seed data
        builder.HasData(new BusinessProfile
        {
            Id = 1,
            BusinessName = "Generic Landscaping Co.",
            Tagline = "Beautiful landscapes for everyone.",
            ShortDescription = "We provide top quality landscaping services.",
            AboutDescription = "A generic landscaping company providing a wide range of outdoor services.",
            CreatedDateTime = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            UpdatedDateTime = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            IsActive = true
        });
    }
}
