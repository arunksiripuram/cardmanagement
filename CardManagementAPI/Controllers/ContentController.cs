
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
  //[HttpPut("{id}")]
  //public async Task<IActionResult> UpdateContent(int id, [FromBody] ContentModel content)
  //{
  //  var result = await _contentCollection.ReplaceOneAsync(c => c.Id == id, content);
  //  if (result.MatchedCount == 0)
  //  {
  //    return NotFound();
  //  }

  //  // Notify all connected clients that content has been updated
  //  await _hubContext.Clients.All.SendAsync("ReceiveContentUpdate", content);
  //  // Return a custom status code and message
  //  var response = new
  //  {
  //    StatusCode = 1000,
  //    StatusMessage = "Record updated successfully"
  //  };

  //  return Ok(response); // Returns 200 OK with the custom response body
  //}
  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateContent(int id, [FromBody] ContentModel content)
  {
    // Fetch existing content from the database
    var existingContent = await _contentCollection.Find(c => c.Id == id).FirstOrDefaultAsync();
    if (existingContent == null)
    {
      return NotFound();
    }

    // Create a dictionary to track changes
    var updatedFields = new Dictionary<string, object>();

    // Compare each field and detect updates
    if (content.CardHolderLabel != existingContent.CardHolderLabel)
      updatedFields["CardHolderLabel"] = content.CardHolderLabel;

    //if (content.CardHolderPlaceholder != existingContent.CardHolderPlaceholder)
    //  updatedFields["CardHolderPlaceholder"] = content.CardHolderPlaceholder;

    if (content.CardTypeLabel != existingContent.CardTypeLabel)
      updatedFields["CardTypeLabel"] = content.CardTypeLabel;

    if (content.CardTypeSelectDefault != existingContent.CardTypeSelectDefault)
      updatedFields["CardTypeSelectDefault"] = content.CardTypeSelectDefault;

    if (content.CardNumberLabel != existingContent.CardNumberLabel)
      updatedFields["CardNumberLabel"] = content.CardNumberLabel;

    //if (content.CardNumberPlaceholder != existingContent.CardNumberPlaceholder)
    //  updatedFields["CardNumberPlaceholder"] = content.CardNumberPlaceholder;

    if (content.CVVLabel != existingContent.CVVLabel)
      updatedFields["CVVLabel"] = content.CVVLabel;

    //if (content.CVVPlaceholder != existingContent.CVVPlaceholder)
    //  updatedFields["CVVPlaceholder"] = content.CVVPlaceholder;

    if (content.ExpirationDateLabel != existingContent.ExpirationDateLabel)
      updatedFields["ExpirationDateLabel"] = content.ExpirationDateLabel;

    //if (content.ExpirationMonthPlaceholder != existingContent.ExpirationMonthPlaceholder)
    //  updatedFields["ExpirationMonthPlaceholder"] = content.ExpirationMonthPlaceholder;

    //if (content.ExpirationYearPlaceholder != existingContent.ExpirationYearPlaceholder)
    //  updatedFields["ExpirationYearPlaceholder"] = content.ExpirationYearPlaceholder;

    if (content.AddressLabel != existingContent.AddressLabel)
      updatedFields["AddressLabel"] = content.AddressLabel;

    //if (content.AddressLine1Placeholder != existingContent.AddressLine1Placeholder)
    //  updatedFields["AddressLine1Placeholder"] = content.AddressLine1Placeholder;

    //if (content.AddressLine2Placeholder != existingContent.AddressLine2Placeholder)
    //  updatedFields["AddressLine2Placeholder"] = content.AddressLine2Placeholder;

    if (content.CityLabel != existingContent.CityLabel)
      updatedFields["CityLabel"] = content.CityLabel;

    //if (content.CityPlaceholder != existingContent.CityPlaceholder)
    //  updatedFields["CityPlaceholder"] = content.CityPlaceholder;

    if (content.StateLabel != existingContent.StateLabel)
      updatedFields["StateLabel"] = content.StateLabel;

    if (content.StateSelectDefault != existingContent.StateSelectDefault)
      updatedFields["StateSelectDefault"] = content.StateSelectDefault;

    if (content.ZipLabel != existingContent.ZipLabel)
      updatedFields["ZipLabel"] = content.ZipLabel;

    //if (content.ZipPlaceholder != existingContent.ZipPlaceholder)
    //  updatedFields["ZipPlaceholder"] = content.ZipPlaceholder;

    if (content.CountryLabel != existingContent.CountryLabel)
      updatedFields["CountryLabel"] = content.CountryLabel;

    if (content.CountrySelectDefault != existingContent.CountrySelectDefault)
      updatedFields["CountrySelectDefault"] = content.CountrySelectDefault;

    if (content.UseAsPrimaryCardLabel != existingContent.UseAsPrimaryCardLabel)
      updatedFields["UseAsPrimaryCardLabel"] = content.UseAsPrimaryCardLabel;

    if (content.FooterText != existingContent.FooterText)
      updatedFields["FooterText"] = content.FooterText;

    if (content.AddCardButtonText != existingContent.AddCardButtonText)
      updatedFields["AddCardButtonText"] = content.AddCardButtonText;

    if (content.CancelButtonText != existingContent.CancelButtonText)
      updatedFields["CancelButtonText"] = content.CancelButtonText;

    if (content.NewsletterLabel != existingContent.NewsletterLabel)
      updatedFields["NewsletterLabel"] = content.NewsletterLabel;

    //if (content.NewsletterPlaceholder != existingContent.NewsletterPlaceholder)
    //  updatedFields["NewsletterPlaceholder"] = content.NewsletterPlaceholder;

    if (content.SignUpButtonText != existingContent.SignUpButtonText)
      updatedFields["SignUpButtonText"] = content.SignUpButtonText;

    if (content.SurveyText != existingContent.SurveyText)
      updatedFields["SurveyText"] = content.SurveyText;

    if (content.SurveyLinkText != existingContent.SurveyLinkText)
      updatedFields["SurveyLinkText"] = content.SurveyLinkText;

    if (content.TermsAndConditionsText != existingContent.TermsAndConditionsText)
      updatedFields["TermsAndConditionsText"] = content.TermsAndConditionsText;

    if (content.PrivacyPolicyText != existingContent.PrivacyPolicyText)
      updatedFields["PrivacyPolicyText"] = content.PrivacyPolicyText;

    // If there are any updates, we replace the existing content in the database
    if (updatedFields.Count > 0)
    {
      // Perform the update in the database
      await _contentCollection.ReplaceOneAsync(c => c.Id == id, content);

      // Notify all connected clients that content has been updated, sending only the updated fields
      await _hubContext.Clients.All.SendAsync("ReceiveContentUpdate", updatedFields);

      // Return a custom status code and message
      var response = new
      {
        StatusCode = 1000,
        StatusMessage = "Record updated successfully"
      };

      return Ok(response); // Returns 200 OK with the custom response body
    }
    else
    {
      return Ok(new { StatusCode = 1001, StatusMessage = "No changes detected" });
    }
  }

}
