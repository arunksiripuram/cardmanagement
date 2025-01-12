from signalrcore.hub_connection_builder import HubConnectionBuilder
import json

# SignalR Hub URL (replace with your actual SignalR hub URL)
hub_url = "https://cardmanagementapi-cferaphyh6hea4fg.centralindia-01.azurewebsites.net/contentHub"  # Your SignalR Hub endpoint

# Establish a connection to the SignalR Hub without SSL verification
connection = HubConnectionBuilder()\
    .with_url(hub_url, options={"verify_ssl": False})\
    .build()

# Define what to do when a message is received from the SignalR hub
def on_receive_content_update(content):
    # This will be triggered when content is updated and pushed from the server
    print("Received Content Update:")
    print(json.dumps(content, indent=4))  # Printing the updated content in a readable format

# Define the event to be triggered when the connection is established
def on_connection_established():
    print("Connection established successfully!")
    # SignalR connection does not expose connectionId directly, so we handle it via the 'connected' event

# Register the event listener for 'ReceiveContentUpdate' from the server
connection.on("ReceiveContentUpdate", on_receive_content_update)

# Register the event for connection established
connection.on_open(on_connection_established)

# Start the connection to the hub
connection.start()

# Keep the connection open to listen for any updates
print("Listening for content updates... Press Enter to exit.")
input()  # Keeps the script running, waiting for updates
