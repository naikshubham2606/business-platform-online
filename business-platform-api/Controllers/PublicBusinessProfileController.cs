using business_platform_api.Models.DTOs;
using business_platform_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace business_platform_api.Controllers;

[ApiController]
[Route("api/public")]
public class PublicBusinessProfileController : ControllerBase
{
    private readonly IBusinessProfileService _service;
    private readonly IContactDetailsService _contactService;

    public PublicBusinessProfileController(IBusinessProfileService service, IContactDetailsService contactService)
    {
        _service = service;
        _contactService = contactService;
    }

    [HttpGet("business-profile")]
    [ProducesResponseType(typeof(ApiResponse<BusinessProfileDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<BusinessProfileDto>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetProfile()
    {
        var response = await _service.GetProfileAsync();
        if (!response.IsSuccess) return NotFound(response);
        return Ok(response);
    }

    [HttpGet("branding")]
    [ProducesResponseType(typeof(ApiResponse<BusinessBrandingDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<BusinessBrandingDto>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetBranding()
    {
        var response = await _service.GetBrandingAsync();
        if (!response.IsSuccess) return NotFound(response);
        return Ok(response);
    }

    [HttpGet("contact")]
    [ProducesResponseType(typeof(ApiResponse<ContactDetailsDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<ContactDetailsDto>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetContact()
    {
        var response = await _contactService.GetCurrentContactDetailsAsync();
        if (!response.IsSuccess) return NotFound(response);
        return Ok(response);
    }
}
