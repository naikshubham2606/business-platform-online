using business_platform_api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace business_platform_api.Repositories;

public interface IProjectRepository : IGenericRepository<Project, Guid>
{
    Task<IEnumerable<Project>> GetActiveProjectsAsync();
    Task<Project?> GetProjectDetailsAsync(Guid id);
}

public class ProjectRepository : GenericRepository<Project, Guid>, IProjectRepository
{
    public ProjectRepository(Models.AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Project>> GetActiveProjectsAsync()
    {
        return await _dbSet
            .Include(p => p.Images)
            .Include(p => p.ProjectServices)
                .ThenInclude(ps => ps.Service)
            .Where(p => p.IsActive)
            .OrderBy(p => p.DisplayOrder)
            .ThenByDescending(p => p.CreatedDateTime)
            .ToListAsync();
    }

    public async Task<Project?> GetProjectDetailsAsync(Guid id)
    {
        return await _dbSet
            .Include(p => p.Images)
            .Include(p => p.ProjectServices)
                .ThenInclude(ps => ps.Service)
            .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
    }
}
