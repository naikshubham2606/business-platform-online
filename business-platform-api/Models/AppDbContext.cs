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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new BusinessProfileConfiguration());
        modelBuilder.ApplyConfiguration(new ContactDetailsConfiguration());
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
