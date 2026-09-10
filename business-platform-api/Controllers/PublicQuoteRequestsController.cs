using business_platform_api.Models.DTOs;
using business_platform_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace business_platform_api.Controllers;

[ApiController]
[Route("api/public/quote-requests")]
public class PublicQuoteRequestsController : ControllerBase
{
    private readonly IPublicQuoteRequestService _service;

    public PublicQuoteRequestsController(IPublicQuoteRequestService service)
    {
        _service = service;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<QuoteRequestResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<QuoteRequestResponseDto>), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateQuoteRequest([FromBody] QuoteRequestCreateDto dto)
    {
        var response = await _service.CreateQuoteRequestAsync(dto);
        if (!response.IsSuccess)
            return BadRequest(response);

        return Ok(response);
    }
}
