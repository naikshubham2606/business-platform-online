using business_platform_api.Models.DTOs;
using business_platform_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace business_platform_api.Controllers;

[ApiController]
[Route("api/public/projects")]
public class PublicProjectsController : ControllerBase
{
    private readonly IPublicProjectService _service;

    public PublicProjectsController(IPublicProjectService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<ProjectListDto>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProjects()
    {
        return Ok(await _service.GetProjectsAsync());
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<ProjectDetailsDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<ProjectDetailsDto>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetProjectDetails(Guid id)
    {
        var response = await _service.GetProjectDetailsAsync(id);
        if (!response.IsSuccess)
        {
            return NotFound(response);
        }
        return Ok(response);
    }
}
