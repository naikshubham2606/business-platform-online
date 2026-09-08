namespace business_platform_api.Models.Entities;

public interface IAuditableEntity
{
    DateTime CreatedDateTime { get; set; }
    DateTime UpdatedDateTime { get; set; }
}
