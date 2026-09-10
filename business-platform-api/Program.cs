using business_platform_api.Models;
using business_platform_api.Repositories;
using business_platform_api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// AutoMapper
builder.Services.AddAutoMapper(cfg => 
{
    cfg.AddProfile<business_platform_api.Mappings.BusinessProfileMappingProfile>();
    cfg.AddProfile<business_platform_api.Mappings.ServiceMappingProfile>();
    cfg.AddProfile<business_platform_api.Mappings.AboutUsMappingProfile>();
    cfg.AddProfile<business_platform_api.Mappings.MasterDataMappingProfile>();
    cfg.AddProfile<business_platform_api.Mappings.QuoteRequestMappingProfile>();
    cfg.AddProfile<business_platform_api.Mappings.ProjectMappingProfile>();
});

// Dependency Injection
builder.Services.AddScoped(typeof(IGenericRepository<,>), typeof(GenericRepository<,>));
builder.Services.AddScoped(typeof(IGenericCrudService<,,,,>), typeof(GenericCrudService<,,,,>));
builder.Services.AddScoped(typeof(IMasterDataRepository<>), typeof(MasterDataRepository<>));

builder.Services.AddScoped<IBusinessProfileRepository, BusinessProfileRepository>();
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<IAboutUsRepository, AboutUsRepository>();
builder.Services.AddScoped<IQuoteRequestRepository, QuoteRequestRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();

builder.Services.AddScoped<IBusinessProfileService, BusinessProfileService>();
builder.Services.AddScoped<IContactDetailsService, ContactDetailsService>();
builder.Services.AddScoped<IPublicServiceService, PublicServiceService>();
builder.Services.AddScoped<IAboutUsService, AboutUsService>();
builder.Services.AddScoped<IPublicMasterDataService, PublicMasterDataService>();
builder.Services.AddScoped<IPublicQuoteRequestService, PublicQuoteRequestService>();
builder.Services.AddScoped<IPublicProjectService, PublicProjectService>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Automatic Migrations
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        if (context.Database.GetPendingMigrations().Any())
        {
            context.Database.Migrate();
        }
        await DbInitializer.SeedDataAsync(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating or seeding the database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
