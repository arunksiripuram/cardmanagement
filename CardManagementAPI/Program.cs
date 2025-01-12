using MongoDB.Driver;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Register SignalR services
builder.Services.AddSignalR(options =>
{
  // Configure logging for SignalR
  options.EnableDetailedErrors = true; // Enable detailed error messages
  options.ClientTimeoutInterval = TimeSpan.FromDays(1); // Set a client timeout interval
  // Add other SignalR options as needed
});

// Add controllers
builder.Services.AddControllers();

// Configure CORS to allow any origin, method, and header
//builder.Services.AddCors(options =>
//{
//  options.AddPolicy("AllowAll", builder =>
//  {
//    builder.AllowAnyOrigin()
//            .AllowCredentials()
//           .AllowAnyMethod()
//           .AllowAnyHeader();
//  });
//});

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowSpecificOrigins", builder =>
  {
    builder.WithOrigins("http://localhost:4200", "https://cardmanagementapi-cferaphyh6hea4fg.centralindia-01.azurewebsites.net") // Allow specific origins
           .AllowCredentials()  // Allow credentials (cookies, authorization headers, etc.)
           .AllowAnyMethod()    // Allow any HTTP method (GET, POST, PUT, DELETE, etc.)
           .AllowAnyHeader();   // Allow any headers
  });
});


// MongoDB connection setup
builder.Services.AddSingleton<IMongoClient, MongoClient>(sp =>
{
  var mongoUrl = "mongodb+srv://arunksiripuram:r63M25Fui07I0RHs@cluster1.qzou5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
  return new MongoClient(mongoUrl);
});

// Register MongoDB database
builder.Services.AddScoped<IMongoDatabase>(sp =>
{
  var client = sp.GetRequiredService<IMongoClient>();
  return client.GetDatabase("ContentDb");
});

// Register OpenAPI (Swagger)
builder.Services.AddOpenApi();

// Add Swagger support for API documentation
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v1", new OpenApiInfo
  {
    Title = "Content API",
    Version = "v1"
  });
});

var app = builder.Build();

// Use CORS policy
app.UseCors("AllowSpecificOrigins");

// Enable WebSockets for SignalR
app.UseWebSockets();

// Map controllers and SignalR Hub
app.MapControllers();
app.MapHub<ContentHub>("/contentHub");

// Use OpenAPI and Swagger for API documentation
app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
  c.SwaggerEndpoint("/swagger/v1/swagger.json", "Content API V1");
  c.RoutePrefix = string.Empty; // Set Swagger UI to the root
});

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Run the application
app.Run();
