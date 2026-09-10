using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace business_platform_api.Repositories;

public interface IMasterDataRepository<TEntity> : IGenericRepository<TEntity, int> where TEntity : BaseMasterData
{
    Task<IEnumerable<TEntity>> GetActiveAsync();
}

public class MasterDataRepository<TEntity> : GenericRepository<TEntity, int>, IMasterDataRepository<TEntity> where TEntity : BaseMasterData
{
    public MasterDataRepository(Models.AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<TEntity>> GetActiveAsync()
    {
        return await _dbSet.Where(e => e.IsActive).OrderBy(e => e.DisplayOrder).ToListAsync();
    }
}

public interface IQuoteRequestRepository : IGenericRepository<QuoteRequest, Guid>
{
    Task<QuoteRequestStatus?> GetStatusByNameAsync(string name);
}

public class QuoteRequestRepository : GenericRepository<QuoteRequest, Guid>, IQuoteRequestRepository
{
    public QuoteRequestRepository(Models.AppDbContext context) : base(context)
    {
    }

    public async Task<QuoteRequestStatus?> GetStatusByNameAsync(string name)
    {
        return await _context.Set<QuoteRequestStatus>().FirstOrDefaultAsync(s => s.Name == name);
    }
}
