using business_platform_api.Models;
using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace business_platform_api.Repositories;

public class ServiceRepository : GenericRepository<Service, int>, IServiceRepository
{
    public ServiceRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Service>> GetActiveServicesAsync()
    {
        return await _dbSet
            .Include(s => s.Images)
            .Where(s => s.IsActive)
            .OrderBy(s => s.DisplayOrder)
            .ThenBy(s => s.Name)
            .ToListAsync();
    }

    public async Task<Service?> GetActiveServiceByIdWithImagesAsync(int id)
    {
        return await _dbSet
            .Include(s => s.Images.OrderBy(i => i.DisplayOrder))
            .Where(s => s.IsActive && s.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<Service?> GetActiveServiceBySlugWithImagesAsync(string slug)
    {
        return await _dbSet
            .Include(s => s.Images.OrderBy(i => i.DisplayOrder))
            .Where(s => s.IsActive && s.Slug == slug)
            .FirstOrDefaultAsync();
    }
}
