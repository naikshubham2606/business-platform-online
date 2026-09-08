namespace business_platform_api.Repositories;

public interface IGenericRepository<TEntity, TId> where TEntity : class
{
    Task<TEntity?> GetByIdAsync(TId id);
    Task<IEnumerable<TEntity>> GetAllAsync();
    Task<TEntity> AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(TEntity entity);
    Task<bool> ExistsAsync(TId id);
}
