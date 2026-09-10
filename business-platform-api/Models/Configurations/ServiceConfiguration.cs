using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace business_platform_api.Models.Configurations;

public class ServiceConfiguration : IEntityTypeConfiguration<Service>
{
    public void Configure(EntityTypeBuilder<Service> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Name).IsRequired().HasMaxLength(150);
        builder.Property(x => x.Slug).IsRequired().HasMaxLength(150);
        builder.Property(x => x.ShortDescription).HasMaxLength(500);
        builder.Property(x => x.Description).HasColumnType("text");

        builder.HasIndex(x => x.Slug).IsUnique();
        builder.HasIndex(x => x.IsActive);
        builder.HasIndex(x => x.DisplayOrder);

        // Seed data
        var now = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        builder.HasData(
            new Service { Id = 1, Name = "Garden Maintenance", Slug = "garden-maintenance", ShortDescription = "Regular upkeep of your garden spaces.", Description = "Comprehensive garden maintenance including mowing, weeding, pruning, and fertilization to keep your outdoor space pristine.", DisplayOrder = 1, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
            new Service { Id = 2, Name = "Landscape Design", Slug = "landscape-design", ShortDescription = "Custom design for your dream outdoor living area.", Description = "Expert landscape design services tailored to your property, incorporating hardscaping, plant selection, and sustainable practices.", DisplayOrder = 2, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
            new Service { Id = 3, Name = "Lawn Care", Slug = "lawn-care", ShortDescription = "Professional lawn treatment and care.", Description = "Specialized lawn care services including aeration, overseeding, pest control, and seasonal treatments for a lush, green lawn.", DisplayOrder = 3, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
            new Service { Id = 4, Name = "Tree and Plant Care", Slug = "tree-and-plant-care", ShortDescription = "Specialized arbor care and plant health services.", Description = "Professional tree trimming, removal, disease diagnosis, and overall plant health care by certified arborists.", DisplayOrder = 4, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now },
            new Service { Id = 5, Name = "Irrigation Installation", Slug = "irrigation-installation", ShortDescription = "Efficient water management systems.", Description = "Design, installation, and maintenance of smart irrigation systems to ensure optimal water usage and plant health.", DisplayOrder = 5, IsActive = true, CreatedDateTime = now, UpdatedDateTime = now }
        );
    }
}
