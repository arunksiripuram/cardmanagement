from signalr import HubConnectionBuilder
import json

# SignalR Hub URL (replace with your actual SignalR hub URL)
# hub_url = "https://cardmanagementapi-cferaphyh6hea4fg.centralindia-01.azurewebsites.net/contentHub"  # Your SignalR Hub endpoint
hub_url = "http://localhost:5209/contentHub"  # Your SignalR Hub endpoint


# Establish a connection to the SignalR Hub
connection = HubConnectionBuilder()\
    .with_url(hub_url)\
    .build()

# Define what to do when a message is received from the SignalR hub
def on_receive_content_update(content):
    # This will be triggered when content is updated and pushed from the server
    print("Received Content Update:")
    print(json.dumps(content, indent=4))  # Printing the updated content in a readable format

# Register the event listener for 'ReceiveContentUpdate' from the server
connection.on("ReceiveContentUpdate", on_receive_content_update)

# Start the connection to the hub
connection.start()

# Keep the connection open to listen for any updates
print("Listening for content updates... Press Enter to exit.")
input()  # Keeps the script running, waiting for updates
