import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private connection!: HubConnection;
  private messagesSource = new BehaviorSubject<any[]>([]);
  currentMessages = this.messagesSource.asObservable();



    private _baseUrl: string ="https://cardmanagementapi-cferaphyh6hea4fg.centralindia-01.azurewebsites.net/api/";
    private _headers: HttpHeaders;

    constructor(public http: HttpClient) {
      this.startConnection();
        this._headers = new HttpHeaders()
          .set('Content-type', 'application/json',)
          .set('Accept', 'application/json');
      }

      private startConnection() {

        this.connection = new signalR.HubConnectionBuilder()
          .withUrl('https://cardmanagementapi-cferaphyh6hea4fg.centralindia-01.azurewebsites.net/contentHub')  // Your SignalR Hub URL
          // .configureLogging(LogLevel.Information)
          .withAutomaticReconnect()
          .build();

          console.log("Test1")
    
        this.connection.start()
          .then(() => {
            console.log('SignalR connected');
            localStorage.setItem('hubConnectionId', '1120');
            this.registerOnServerEvents();
          })
          .catch((err) => {
            console.error('Error while starting connection: ' + err);
            setTimeout(() => this.startConnection(), 5000); // Retry connection after 5 seconds
          });
          console.log(localStorage.getItem('hubConnectionId'))
      }

      private registerOnServerEvents() {
        // For example, listening for messages from SignalR Hub
        this.connection.on('ReceiveContentUpdate', (message: any) => {
          console.log('ReceiveContentUpdate', message);
          this.messagesSource.next(message);
        });
      }
      

      // sendMessage(message: string) {
      //   this.connection.invoke('SendMessage', message)
      //     .catch((err: string) => console.error('Error sending message: ' + err));
      // }

      getLabelValue() {
        return this.http.get(`${this._baseUrl}Content/GetContent`);
      }

      UpdateLabelName(req:any) {
        return this.http.put(`${this._baseUrl}Content/1`, req, { headers: this._headers });
      }
  }