
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

namespace CardManagementAPI.Controllers
{

[ApiController]
[Route("api/[controller]")]
public class ContentController : ControllerBase
{
    private readonly IMongoCollection<ContentModel> _contentCollection;

    public ContentController(IMongoDatabase database)
    {
        _contentCollection = database.GetCollection<ContentModel>("Content");
    }

    [HttpGet]
    public async Task<IActionResult> GetContent()
    {
        var content = await _contentCollection.Find(c => true).ToListAsync();
        return Ok(content);
    }

    [HttpPost]
    public async Task<IActionResult> CreateContent([FromBody] ContentModel content)
    {
        await _contentCollection.InsertOneAsync(content);
        return CreatedAtAction(nameof(GetContent), new { id = content.Id }, content);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateContent(string id, [FromBody] ContentModel content)
    {
        var result = await _contentCollection.ReplaceOneAsync(c => c.Id == id, content);
        if (result.MatchedCount == 0) return NotFound();
        return NoContent();
    }
}
}