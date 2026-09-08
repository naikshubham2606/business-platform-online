using AutoMapper;
using business_platform_api.Models.DTOs;
using business_platform_api.Repositories;

namespace business_platform_api.Services;

public class GenericCrudService<TEntity, TEntityDto, TCreateDto, TUpdateDto, TId> : IGenericCrudService<TEntity, TEntityDto, TCreateDto, TUpdateDto, TId> where TEntity : class
{
    protected readonly IGenericRepository<TEntity, TId> _repository;
    protected readonly IMapper _mapper;

    public GenericCrudService(IGenericRepository<TEntity, TId> repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public virtual async Task<ApiResponse<TEntityDto>> GetByIdAsync(TId id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null)
            return ApiResponse<TEntityDto>.Failure("Record not found.");

        var dto = _mapper.Map<TEntityDto>(entity);
        return ApiResponse<TEntityDto>.Success(dto);
    }

    public virtual async Task<ApiResponse<IEnumerable<TEntityDto>>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        var dtos = _mapper.Map<IEnumerable<TEntityDto>>(entities);
        return ApiResponse<IEnumerable<TEntityDto>>.Success(dtos);
    }

    public virtual async Task<ApiResponse<TEntityDto>> CreateAsync(TCreateDto createDto)
    {
        var entity = _mapper.Map<TEntity>(createDto);
        var createdEntity = await _repository.AddAsync(entity);
        var dto = _mapper.Map<TEntityDto>(createdEntity);
        return ApiResponse<TEntityDto>.Success(dto, "Record created successfully.");
    }

    public virtual async Task<ApiResponse<TEntityDto>> UpdateAsync(TId id, TUpdateDto updateDto)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null)
            return ApiResponse<TEntityDto>.Failure("Record not found.");

        _mapper.Map(updateDto, entity);
        await _repository.UpdateAsync(entity);

        var dto = _mapper.Map<TEntityDto>(entity);
        return ApiResponse<TEntityDto>.Success(dto, "Record updated successfully.");
    }

    public virtual async Task<ApiResponse<bool>> DeleteAsync(TId id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null)
            return ApiResponse<bool>.Failure("Record not found.");

        await _repository.DeleteAsync(entity);
        return ApiResponse<bool>.Success(true, "Record deleted successfully.");
    }
}
