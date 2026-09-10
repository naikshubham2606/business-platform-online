namespace business_platform_api.Models.DTOs;

public class MasterDataDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
}

public class MeasurementUnitDto : MasterDataDto
{
    public string ShortName { get; set; } = string.Empty;
    public string? UnitType { get; set; }
}
