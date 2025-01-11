using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR(); // Register SignalR services
builder.Services.AddControllers();
// builder.Services.AddSingleton<IMongoClient, MongoClient>(); // MongoDB connection setup


// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSingleton<IMongoClient, MongoClient>(sp =>
{
    var mongoUrl = "mongodb://localhost:27017"; // Replace with your MongoDB URI
    return new MongoClient(mongoUrl);
});

builder.Services.AddScoped<IMongoDatabase>(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase("ContentDb");
});

builder.Services.AddSwaggerGen();            // Adds Swagger support
var app = builder.Build();
        app.MapControllers();
        app.MapHub<ContentHub>("/contentHub");  // Map the SignalR hub


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    // Enable Swagger middleware only in Development mode
    app.UseSwagger();                 // This will enable the Swagger JSON generation
    app.UseSwaggerUI();              // This will enable the Swagger UI in the browser
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
