import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService, private alertify: AlterifyService) { }

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }

}
