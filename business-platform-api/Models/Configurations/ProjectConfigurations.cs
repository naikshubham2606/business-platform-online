using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace business_platform_api.Models.Configurations;

public class ProjectConfiguration : IEntityTypeConfiguration<Project>
{
    public void Configure(EntityTypeBuilder<Project> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Title).IsRequired().HasMaxLength(200);
        builder.Property(x => x.Slug).IsRequired().HasMaxLength(200);
        builder.Property(x => x.ShortDescription).IsRequired().HasMaxLength(500);
        builder.Property(x => x.Description).IsRequired().HasColumnType("text");
        builder.Property(x => x.Location).HasMaxLength(200);

        builder.HasIndex(x => x.Slug).IsUnique();
        builder.HasIndex(x => x.DisplayOrder);
        builder.HasIndex(x => x.IsActive);
        builder.HasIndex(x => new { x.IsActive, x.DisplayOrder });
    }
}

public class ProjectImageConfiguration : IEntityTypeConfiguration<ProjectImage>
{
    public void Configure(EntityTypeBuilder<ProjectImage> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.ImageUrl).IsRequired().HasMaxLength(500);
        builder.Property(x => x.AltText).HasMaxLength(255);

        builder.HasOne(x => x.Project)
            .WithMany(x => x.Images)
            .HasForeignKey(x => x.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(x => new { x.ProjectId, x.DisplayOrder });
    }
}

public class ProjectServiceConfiguration : IEntityTypeConfiguration<ProjectService>
{
    public void Configure(EntityTypeBuilder<ProjectService> builder)
    {
        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Project)
            .WithMany(x => x.ProjectServices)
            .HasForeignKey(x => x.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Service)
            .WithMany()
            .HasForeignKey(x => x.ServiceId)
            .OnDelete(DeleteBehavior.Restrict); // Important: Deleting a project shouldn't delete a service.

        builder.HasIndex(x => new { x.ProjectId, x.ServiceId }).IsUnique();
    }
}
