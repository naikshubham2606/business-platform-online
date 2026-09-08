using business_platform_api.Models;
using Microsoft.EntityFrameworkCore;

namespace business_platform_api.Repositories;

public class GenericRepository<TEntity, TId> : IGenericRepository<TEntity, TId> where TEntity : class
{
    protected readonly AppDbContext _context;
    protected readonly DbSet<TEntity> _dbSet;

    public GenericRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<TEntity>();
    }

    public virtual async Task<TEntity?> GetByIdAsync(TId id)
    {
        return await _dbSet.FindAsync(id);
    }

    public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public virtual async Task<TEntity> AddAsync(TEntity entity)
    {
        await _dbSet.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task UpdateAsync(TEntity entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public virtual async Task DeleteAsync(TEntity entity)
    {
        _dbSet.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public virtual async Task<bool> ExistsAsync(TId id)
    {
        var entity = await _dbSet.FindAsync(id);
        if (entity != null)
        {
            // Detach so it doesn't get tracked if just checking existence
            _context.Entry(entity).State = EntityState.Detached;
            return true;
        }
        return false;
    }
}
