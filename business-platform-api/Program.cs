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
});

// Dependency Injection
builder.Services.AddScoped(typeof(IGenericRepository<,>), typeof(GenericRepository<,>));
builder.Services.AddScoped(typeof(IGenericCrudService<,,,,>), typeof(GenericCrudService<,,,,>));
builder.Services.AddScoped<IBusinessProfileRepository, BusinessProfileRepository>();
builder.Services.AddScoped<IBusinessProfileService, BusinessProfileService>();

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
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating the database.");
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
