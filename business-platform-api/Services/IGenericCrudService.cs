using business_platform_api.Models.DTOs;

namespace business_platform_api.Services;

public interface IGenericCrudService<TEntity, TEntityDto, TCreateDto, TUpdateDto, TId> where TEntity : class
{
    Task<ApiResponse<TEntityDto>> GetByIdAsync(TId id);
    Task<ApiResponse<IEnumerable<TEntityDto>>> GetAllAsync();
    Task<ApiResponse<TEntityDto>> CreateAsync(TCreateDto createDto);
    Task<ApiResponse<TEntityDto>> UpdateAsync(TId id, TUpdateDto updateDto);
    Task<ApiResponse<bool>> DeleteAsync(TId id);
}
