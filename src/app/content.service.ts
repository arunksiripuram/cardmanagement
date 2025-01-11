import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private hubConnection: signalR.HubConnection;
  private apiUrl = 'https://localhost:5001/api/content';  // Backend API

  constructor(private http: HttpClient) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/contentHub")  // SignalR Hub URL
      .build();
      
    this.hubConnection.start().catch(err => console.error("Error establishing SignalR connection: ", err));

    // Listen for real-time content updates
    this.hubConnection.on("ReceiveContentUpdate", (updatedContent) => {
      this.updateContent(updatedContent);
    });
  }

  getContent(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateContent(content: any) {
    // Handle the content update
    // this.content = content;
  }
}
