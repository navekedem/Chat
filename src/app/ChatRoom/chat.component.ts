import { Component, OnInit} from '@angular/core';
import { Message } from '../Models/message.model';
import { ChatService } from '../Services/chat.service';
import { NgForm } from '@angular/forms';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']

})

export class ChatComponent implements OnInit {

  newMessage: string;
  private messagesSub: Subscription;
  messages: Message[] = [];

  constructor(private chatService: ChatService){
    this.chatService.updateClientsOnNewMessage().subscribe(newMessage => {
      this.messages.push(newMessage);
    });

  }

  ngOnInit() {
    this.chatService.getMessages();
    this.messagesSub = this.chatService.updateMessagesLiscener().subscribe(allMessages => {
      this.messages = allMessages;

    })
  }



  //send new message to chat
  sendMessage(messageForm: NgForm) {
    this.newMessage = messageForm.controls['message'].value;
    if(this.newMessage.trim().length > 0){
      this.chatService.addNewMessage(this.newMessage);
    }
    messageForm.resetForm();
  }
}
