using business_platform_api.Models.DTOs;
using business_platform_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace business_platform_api.Controllers;

[ApiController]
[Route("api/public")]
public class PublicMasterDataController : ControllerBase
{
    private readonly IPublicMasterDataService _service;

    public PublicMasterDataController(IPublicMasterDataService service)
    {
        _service = service;
    }

    [HttpGet("property-types")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<MasterDataDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetPropertyTypes()
    {
        return Ok(await _service.GetPropertyTypesAsync());
    }

    [HttpGet("work-area-types")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<MasterDataDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetWorkAreaTypes()
    {
        return Ok(await _service.GetWorkAreaTypesAsync());
    }

    [HttpGet("measurement-units")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<MeasurementUnitDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMeasurementUnits()
    {
        return Ok(await _service.GetMeasurementUnitsAsync());
    }

    [HttpGet("urgency-types")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<MasterDataDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUrgencyTypes()
    {
        return Ok(await _service.GetUrgencyTypesAsync());
    }

    [HttpGet("contact-methods")]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<MasterDataDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetContactMethods()
    {
        return Ok(await _service.GetContactMethodsAsync());
    }
}
