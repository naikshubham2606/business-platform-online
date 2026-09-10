using business_platform_api.Models.Configurations;
using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace business_platform_api.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<BusinessProfile> BusinessProfiles { get; set; } = null!;
    public DbSet<ContactDetails> ContactDetails { get; set; } = null!;
    public DbSet<Service> Services { get; set; } = null!;
    public DbSet<ServiceImage> ServiceImages { get; set; } = null!;
    public DbSet<AboutUs> AboutUs { get; set; } = null!;
    public DbSet<AboutUsHighlight> AboutUsHighlights { get; set; } = null!;
    public DbSet<AboutUsValue> AboutUsValues { get; set; } = null!;
    public DbSet<AboutUsStatistic> AboutUsStatistics { get; set; } = null!;

    public DbSet<PropertyType> PropertyTypes { get; set; } = null!;
    public DbSet<WorkAreaType> WorkAreaTypes { get; set; } = null!;
    public DbSet<MeasurementUnit> MeasurementUnits { get; set; } = null!;
    public DbSet<UrgencyType> UrgencyTypes { get; set; } = null!;
    public DbSet<ContactMethod> ContactMethods { get; set; } = null!;
    public DbSet<QuoteRequestStatus> QuoteRequestStatuses { get; set; } = null!;
    
    public DbSet<QuoteRequest> QuoteRequests { get; set; } = null!;
    public DbSet<QuoteRequestService> QuoteRequestServices { get; set; } = null!;
    public DbSet<QuoteRequestImage> QuoteRequestImages { get; set; } = null!;

    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<ProjectImage> ProjectImages { get; set; } = null!;
    public DbSet<ProjectService> ProjectServices { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Business Profile & Contact
        modelBuilder.ApplyConfiguration(new BusinessProfileConfiguration());
        modelBuilder.ApplyConfiguration(new ContactDetailsConfiguration());

        // Services
        modelBuilder.ApplyConfiguration(new ServiceConfiguration());
        modelBuilder.ApplyConfiguration(new ServiceImageConfiguration());

        // About Us
        modelBuilder.ApplyConfiguration(new AboutUsConfiguration());
        modelBuilder.ApplyConfiguration(new AboutUsHighlightConfiguration());
        modelBuilder.ApplyConfiguration(new AboutUsValueConfiguration());
        modelBuilder.ApplyConfiguration(new AboutUsStatisticConfiguration());

        // Master Data
        modelBuilder.ApplyConfiguration(new PropertyTypeConfiguration());
        modelBuilder.ApplyConfiguration(new WorkAreaTypeConfiguration());
        modelBuilder.ApplyConfiguration(new MeasurementUnitConfiguration());
        modelBuilder.ApplyConfiguration(new UrgencyTypeConfiguration());
        modelBuilder.ApplyConfiguration(new ContactMethodConfiguration());
        modelBuilder.ApplyConfiguration(new QuoteRequestStatusConfiguration());

        // Quote Requests
        modelBuilder.ApplyConfiguration(new QuoteRequestConfiguration());
        modelBuilder.ApplyConfiguration(new QuoteRequestServiceConfiguration());
        modelBuilder.ApplyConfiguration(new QuoteRequestImageConfiguration());

        // Projects
        modelBuilder.ApplyConfiguration(new ProjectConfiguration());
        modelBuilder.ApplyConfiguration(new ProjectImageConfiguration());
        modelBuilder.ApplyConfiguration(new ProjectServiceConfiguration());
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var entries = ChangeTracker.Entries<IAuditableEntity>();

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedDateTime = DateTime.UtcNow;
                entry.Entity.UpdatedDateTime = DateTime.UtcNow;
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedDateTime = DateTime.UtcNow;
                entry.Property(e => e.CreatedDateTime).IsModified = false;
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
