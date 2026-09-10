namespace business_platform_api.Models.Entities;

public abstract class BaseMasterData : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int DisplayOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
}

public class PropertyType : BaseMasterData { }

public class WorkAreaType : BaseMasterData { }

public class MeasurementUnit : BaseMasterData 
{
    public string ShortName { get; set; } = string.Empty;
    public string? UnitType { get; set; } // e.g., Area, Length
}

public class UrgencyType : BaseMasterData { }

public class ContactMethod : BaseMasterData { }

public class QuoteRequestStatus : BaseMasterData { }
