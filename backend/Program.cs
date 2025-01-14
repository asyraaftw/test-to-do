using System.Text;
using Backend.Data;
using Backend.Service; // For IAuthService and AuthService
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Configure DbContext with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Register AuthService for Dependency Injection
builder.Services.AddScoped<IAuthService, AuthService>();

// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection("Jwt");
if (jwtSettings == null)
{
    throw new InvalidOperationException("Jwt settings not configured in appsettings.json.");
}

var secretKey = jwtSettings["SecretKey"];
if (string.IsNullOrEmpty(secretKey))
{
    throw new InvalidOperationException("JWT SecretKey must be configured in appsettings.json.");
}

builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
        };
    });

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:2323") // Add allowed origins here
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Verify database connection during startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        dbContext.Database.OpenConnection();
        dbContext.Database.CloseConnection();
        Console.WriteLine("Server started successfully! 🚀");
    }
    catch (Exception e)
    {
        Console.WriteLine($"Database connection failed: {e.Message}");
    }
}

// Configure middleware pipeline
app.UseHttpsRedirection(); // Redirect HTTP to HTTPS

app.UseCors("AllowSpecificOrigins"); // Apply CORS policy

app.UseAuthentication();   // Enable JWT Authentication
app.UseAuthorization();    // Enable Authorization middleware
app.MapControllers();

app.Run();
