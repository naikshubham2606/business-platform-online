using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace business_platform_api.Models.Configurations;

public class ServiceImageConfiguration : IEntityTypeConfiguration<ServiceImage>
{
    public void Configure(EntityTypeBuilder<ServiceImage> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.ImageUrl).IsRequired().HasMaxLength(500);
        builder.Property(x => x.AltText).HasMaxLength(255);

        builder.HasOne(x => x.Service)
            .WithMany(x => x.Images)
            .HasForeignKey(x => x.ServiceId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => x.ServiceId);
        // Useful for ordering images within a service
        builder.HasIndex(x => new { x.ServiceId, x.DisplayOrder });

        // Seed data
        var now = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        builder.HasData(
            // Service 1: Garden Maintenance
            new ServiceImage { Id = 1, ServiceId = 1, ImageUrl = "https://picsum.photos/id/104/800/600", AltText = "Worker maintaining a garden", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
            new ServiceImage { Id = 2, ServiceId = 1, ImageUrl = "https://picsum.photos/id/114/800/600", AltText = "Close up of pruned bushes", IsPrimary = false, DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
            new ServiceImage { Id = 3, ServiceId = 1, ImageUrl = "https://picsum.photos/id/120/800/600", AltText = "Freshly mowed lawn", IsPrimary = false, DisplayOrder = 3, CreatedDateTime = now, UpdatedDateTime = now },
            
            // Service 2: Landscape Design
            new ServiceImage { Id = 4, ServiceId = 2, ImageUrl = "https://picsum.photos/id/122/800/600", AltText = "Completed landscape design project", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now },
            new ServiceImage { Id = 5, ServiceId = 2, ImageUrl = "https://picsum.photos/id/135/800/600", AltText = "Design blueprints", IsPrimary = false, DisplayOrder = 2, CreatedDateTime = now, UpdatedDateTime = now },
            
            // Service 3: Lawn Care
            new ServiceImage { Id = 6, ServiceId = 3, ImageUrl = "https://picsum.photos/id/163/800/600", AltText = "Green lawn", IsPrimary = true, DisplayOrder = 1, CreatedDateTime = now, UpdatedDateTime = now }
        );
    }
}
