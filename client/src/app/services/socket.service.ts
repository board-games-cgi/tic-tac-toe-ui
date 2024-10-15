import { Injectable } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket: Socket;
    public clients: Subject<{username: string, socketId: string}[]> = new Subject()

    constructor() {
      this.socket = io('http://localhost:3000');

      this.socket.on('clients', (data: {username: string, socketId: string}[])=> {
        this.clients.next(data); 
      });
    }

    emit(event: string, data: any) {
      this.socket.emit(event, data);
    }
    
    on(eventName: string): Observable<any> {
      return new Observable((subscriber) => {
        this.socket.on(eventName, (data) => {            
          subscriber.next(data);
        });
      });
    }

    setUsername(username: string) {
      this.emit('setUsername', username);
    }

    challengePlayer(challengedSocketId: string){
      this.socket.emit('challengePlayer', challengedSocketId);
    }

    listenForChallenge(): Observable<string> {
      return new Observable((observer) => {
        this.socket.on('receiveChallenge', (challenger: string) => {
          observer.next(challenger);
        });
      });
    }

    setColor(username: string, color: string) {
      this.emit('setColor', { username, color });
    }
    
    onColorChange(): Observable<any> {
      return this.on('colorChange');
    }
}
