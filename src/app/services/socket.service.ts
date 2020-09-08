import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {DataService} from "./data.service";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    // Socket API URL
    socketUrl = environment.SOCKET_URL;
    private socket;

    // Constructor injecting the dataService and initializing the socket connection
    constructor(private dataService: DataService) {
        this.socket = io(this.socketUrl);
    }

    // Sending a message when socket register a change on server
    sendMessage(msg: string) {
        this.socket.on('newData', () => {
            console.log("Send message");
            this.dataService.getReviews();
        });
    }

    // Sends message when frontend has connected to server
    onNewMessage() {
        return this.socket.on('connect', () => {
            console.log("Connected to socket.io");
            this.socket.emit("message", "a client", "hello");
        });
    }
}
