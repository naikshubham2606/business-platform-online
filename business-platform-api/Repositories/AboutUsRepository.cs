using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace business_platform_api.Repositories;

public interface IAboutUsRepository : IGenericRepository<AboutUs, int>
{
    Task<AboutUs?> GetAboutUsWithDetailsAsync();
}

public class AboutUsRepository : GenericRepository<AboutUs, int>, IAboutUsRepository
{
    public AboutUsRepository(Models.AppDbContext context) : base(context)
    {
    }

    public async Task<AboutUs?> GetAboutUsWithDetailsAsync()
    {
        return await _dbSet
            .Include(a => a.Highlights.Where(h => h.IsActive).OrderBy(h => h.DisplayOrder))
            .Include(a => a.Values.Where(v => v.IsActive).OrderBy(v => v.DisplayOrder))
            .Include(a => a.Statistics.Where(s => s.IsActive).OrderBy(s => s.DisplayOrder))
            .FirstOrDefaultAsync();
    }
}
