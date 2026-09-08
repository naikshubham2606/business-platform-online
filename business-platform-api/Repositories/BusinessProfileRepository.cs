using business_platform_api.Models;
using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace business_platform_api.Repositories;

public interface IBusinessProfileRepository : IGenericRepository<BusinessProfile, int>
{
    Task<BusinessProfile?> GetActiveProfileAsync();
}

public class BusinessProfileRepository : GenericRepository<BusinessProfile, int>, IBusinessProfileRepository
{
    public BusinessProfileRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<BusinessProfile?> GetActiveProfileAsync()
    {
        return await _context.BusinessProfiles
            .Where(b => b.IsActive)
            .FirstOrDefaultAsync();
    }
}
