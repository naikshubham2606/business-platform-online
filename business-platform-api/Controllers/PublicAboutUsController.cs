using business_platform_api.Models.DTOs;
using business_platform_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace business_platform_api.Controllers;

[ApiController]
[Route("api/public/about-us")]
public class PublicAboutUsController : ControllerBase
{
    private readonly IAboutUsService _service;

    public PublicAboutUsController(IAboutUsService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<AboutUsDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<AboutUsDto>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAboutUs()
    {
        var response = await _service.GetAboutUsAsync();
        if (!response.IsSuccess) return NotFound(response);
        return Ok(response);
    }
}
