import { User } from "../Models/user.model";
import { Injectable } from "@angular/core";
import { Message } from "../Models/message.model";
import { Subject, Observable } from "rxjs";
import * as io from "socket.io-client";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ChatService {
  messages: Message[] = [];
  private updateMessages = new Subject<Message[]>();
  dateTime: string;
  user: User;

  private url = "http://localhost:3000";
  private socket;

  constructor(private http: HttpClient) {
    this.user = JSON.parse(sessionStorage.getItem("user"));

    this.socket = io(this.url);
  }

  //get all messages from server
  getMessages() {
    this.http
      .get<Message[]>("http://localhost:3000/api/messages")
      .subscribe(data => {
        this.messages = data;
        this.updateMessages.next([...this.messages]);
        console.log(this.messages);
      });
  }

  //update list of messages
  updateMessagesLiscener() {
    return this.updateMessages.asObservable();
  }

  //add new message to server
  addNewMessage(newMessage: string) {
    this.dateTime = new Date().toLocaleTimeString();
    let message: Message = {
      message: newMessage,
      userId: this.user.id,
      userName: this.user.userName,
      imagePath: this.user.imagePath,
      sendTime: this.dateTime
    };

    this.socket.emit("message", message);
    this.http
      .post("http://localhost:3000/api/messages", message)
      .subscribe(result => {
        if(this.messages.length > 0 ){
          if (this.messages[this.messages.length - 1].userId === this.user.id) {
            message = this.margeMessagesByLastUser(message);
          }
        }
        this.messages.push(message);
        this.updateMessages.next([...this.messages]);
      });
  }

  //marge messages of the last user in chat
  margeMessagesByLastUser(userMessage: Message) {
    let lastMessage = this.messages.pop();
    let newMessage = userMessage.message + "\n" + lastMessage.message;
    userMessage.message = newMessage;
    return userMessage;
  }

  updateClientsOnNewMessage() {
    return Observable.create(observer => {
      this.socket.on("message", message => {
        console.log(message);
        observer.next(message);
      });
    });
  }
}
