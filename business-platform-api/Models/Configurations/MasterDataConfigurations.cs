using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace business_platform_api.Models.Configurations;

public abstract class BaseMasterDataConfiguration<T> : IEntityTypeConfiguration<T> where T : BaseMasterData
{
    public virtual void Configure(EntityTypeBuilder<T> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(150);
        builder.Property(x => x.Description).HasMaxLength(500);
    }
}

public class PropertyTypeConfiguration : BaseMasterDataConfiguration<PropertyType> { }

public class WorkAreaTypeConfiguration : BaseMasterDataConfiguration<WorkAreaType> { }

public class MeasurementUnitConfiguration : BaseMasterDataConfiguration<MeasurementUnit>
{
    public override void Configure(EntityTypeBuilder<MeasurementUnit> builder)
    {
        base.Configure(builder);
        builder.Property(x => x.ShortName).IsRequired().HasMaxLength(50);
        builder.Property(x => x.UnitType).HasMaxLength(100);
    }
}

public class UrgencyTypeConfiguration : BaseMasterDataConfiguration<UrgencyType> { }

public class ContactMethodConfiguration : BaseMasterDataConfiguration<ContactMethod> { }

public class QuoteRequestStatusConfiguration : BaseMasterDataConfiguration<QuoteRequestStatus> { }
