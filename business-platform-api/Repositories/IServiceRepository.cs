using business_platform_api.Models.Entities;

namespace business_platform_api.Repositories;

public interface IServiceRepository : IGenericRepository<Service, int>
{
    Task<IEnumerable<Service>> GetActiveServicesAsync();
    Task<Service?> GetActiveServiceByIdWithImagesAsync(int id);
    Task<Service?> GetActiveServiceBySlugWithImagesAsync(string slug);
}
