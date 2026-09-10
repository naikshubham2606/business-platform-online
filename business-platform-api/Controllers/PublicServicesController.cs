using business_platform_api.Models.DTOs;
using business_platform_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace business_platform_api.Controllers;

[ApiController]
[Route("api/public/services")]
public class PublicServicesController : ControllerBase
{
    private readonly IPublicServiceService _service;

    public PublicServicesController(IPublicServiceService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<List<ServiceListDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetServices()
    {
        var response = await _service.GetActiveServicesAsync();
        return Ok(response);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<ServiceDetailsDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<ServiceDetailsDto>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetServiceById(int id)
    {
        var response = await _service.GetActiveServiceByIdAsync(id);
        if (!response.IsSuccess) return NotFound(response);
        return Ok(response);
    }

    [HttpGet("slug/{slug}")]
    [ProducesResponseType(typeof(ApiResponse<ServiceDetailsDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<ServiceDetailsDto>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetServiceBySlug(string slug)
    {
        var response = await _service.GetActiveServiceBySlugAsync(slug);
        if (!response.IsSuccess) return NotFound(response);
        return Ok(response);
    }
}
