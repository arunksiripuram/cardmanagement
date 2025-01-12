using CardManagementAPI.Models;
using Microsoft.AspNetCore.SignalR;

public class ContentHub : Hub
{
    // This method will send updates to all connected clients
    public async Task SendContentUpdate(ContentModel content)
    {
        await Clients.All.SendAsync("ReceiveContentUpdate", content);
    }
}
