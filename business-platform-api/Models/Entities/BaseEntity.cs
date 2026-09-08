namespace business_platform_api.Models.Entities;

public abstract class BaseEntity<TId> : IAuditableEntity
{
    public TId Id { get; set; } = default!;
    public DateTime CreatedDateTime { get; set; }
    public DateTime UpdatedDateTime { get; set; }
}

public abstract class BaseEntity : BaseEntity<int>
{
}

public abstract class BaseGuidEntity : BaseEntity<Guid>
{
}
