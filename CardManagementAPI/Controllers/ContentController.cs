
using CardManagementAPI.Models;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;


namespace CardManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentController : ControllerBase
{
  private readonly IMongoCollection<ContentModel> _contentCollection;
  private readonly IHubContext<ContentHub> _hubContext;

  // Constructor to initialize MongoDB collection and SignalR HubContext
  public ContentController(IMongoDatabase database, IHubContext<ContentHub> hubContext)
  {
    _contentCollection = database.GetCollection<ContentModel>("Content");
    _hubContext = hubContext;
  }

  // Get all content
  [HttpGet]
  [Route("GetContent")]
  public async Task<IActionResult> GetContent()
  {
    var content = await _contentCollection.Find(c => true).ToListAsync();
    return Ok(content);
  }

  // Create new content
  [HttpPost]
  [Route("CreateContent")]
  public async Task<IActionResult> CreateContent([FromBody] ContentModel content)
  {
    await _contentCollection.InsertOneAsync(content);
    return CreatedAtAction(nameof(GetContent), new { id = content.Id }, content);
  }

  // Update existing content and notify clients via SignalR
  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateContent(int id, [FromBody] ContentModel content)
  {
    var result = await _contentCollection.ReplaceOneAsync(c => c.Id == id, content);
    if (result.MatchedCount == 0)
    {
      return NotFound();
    }

    // Notify all connected clients that content has been updated
    await _hubContext.Clients.All.SendAsync("ReceiveContentUpdate", content);
    // Return a custom status code and message
    var response = new
    {
      StatusCode = 1000,
      StatusMessage = "Record updated successfully"
    };

    return Ok(response); // Returns 200 OK with the custom response body
  }
}
