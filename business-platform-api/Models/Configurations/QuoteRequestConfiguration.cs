using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace business_platform_api.Models.Configurations;

public class QuoteRequestConfiguration : IEntityTypeConfiguration<QuoteRequest>
{
    public void Configure(EntityTypeBuilder<QuoteRequest> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.RequestNumber).IsRequired().HasMaxLength(50);
        builder.HasIndex(x => x.RequestNumber).IsUnique();

        builder.Property(x => x.FirstName).IsRequired().HasMaxLength(100);
        builder.Property(x => x.LastName).IsRequired().HasMaxLength(100);
        builder.Property(x => x.Email).IsRequired().HasMaxLength(255);
        builder.Property(x => x.PhoneNumber).IsRequired().HasMaxLength(50);
        builder.Property(x => x.WhatsAppNumber).HasMaxLength(50);

        builder.Property(x => x.PropertySize).HasColumnType("decimal(18,2)");
        builder.Property(x => x.WorkAreaLength).HasColumnType("decimal(18,2)");
        builder.Property(x => x.WorkAreaWidth).HasColumnType("decimal(18,2)");

        builder.Property(x => x.AddressLine1).IsRequired().HasMaxLength(255);
        builder.Property(x => x.AddressLine2).HasMaxLength(255);
        builder.Property(x => x.City).IsRequired().HasMaxLength(100);
        builder.Property(x => x.State).HasMaxLength(100);
        builder.Property(x => x.Country).IsRequired().HasMaxLength(100);
        builder.Property(x => x.PostalCode).IsRequired().HasMaxLength(50);

        builder.Property(x => x.ProjectDescription).IsRequired().HasColumnType("text");
        builder.Property(x => x.ExistingSiteDescription).HasColumnType("text");
        builder.Property(x => x.SiteAccessDescription).HasColumnType("text");

        // Relationships
        builder.HasOne(x => x.PropertyType).WithMany().HasForeignKey(x => x.PropertyTypeId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.PropertySizeUnit).WithMany().HasForeignKey(x => x.PropertySizeUnitId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.WorkAreaType).WithMany().HasForeignKey(x => x.WorkAreaTypeId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.WorkAreaDimensionUnit).WithMany().HasForeignKey(x => x.WorkAreaDimensionUnitId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.UrgencyType).WithMany().HasForeignKey(x => x.UrgencyTypeId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.PreferredContactMethod).WithMany().HasForeignKey(x => x.PreferredContactMethodId).OnDelete(DeleteBehavior.Restrict);
        builder.HasOne(x => x.Status).WithMany().HasForeignKey(x => x.StatusId).OnDelete(DeleteBehavior.Restrict);
    }
}

public class QuoteRequestServiceConfiguration : IEntityTypeConfiguration<QuoteRequestService>
{
    public void Configure(EntityTypeBuilder<QuoteRequestService> builder)
    {
        builder.HasKey(x => x.Id);
        
        builder.Property(x => x.Description).HasMaxLength(500);

        builder.HasOne(x => x.QuoteRequest)
            .WithMany(x => x.Services)
            .HasForeignKey(x => x.QuoteRequestId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Service)
            .WithMany()
            .HasForeignKey(x => x.ServiceId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}

public class QuoteRequestImageConfiguration : IEntityTypeConfiguration<QuoteRequestImage>
{
    public void Configure(EntityTypeBuilder<QuoteRequestImage> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.ImageUrl).IsRequired().HasMaxLength(500);
        builder.Property(x => x.OriginalFileName).IsRequired().HasMaxLength(255);
        builder.Property(x => x.AltText).HasMaxLength(255);

        builder.HasOne(x => x.QuoteRequest)
            .WithMany(x => x.Images)
            .HasForeignKey(x => x.QuoteRequestId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
