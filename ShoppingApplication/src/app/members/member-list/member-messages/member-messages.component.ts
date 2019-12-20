import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/Models/Message';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage : any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlterifyService

  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
    .pipe(
      tap(m => {
        for (let i = 0; i < m.length; i++) {
         if (m[i].isRead === false && m[i].recipientId === currentUserId) {
           this.userService.MarkAsRead(currentUserId, m[i].id);
         }
        }
      })
    )
    .subscribe(m => {
      this.messages = m;
    }, error => {
      this.alertify.error(error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
    .subscribe((m: Message) => {
      this.messages.unshift(m);
      this.newMessage.content = '';
    }, error => {
      this.alertify.error(error);
    });
  }

}
