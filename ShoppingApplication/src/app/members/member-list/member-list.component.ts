import { Component, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { User } from 'src/app/Models/User';
import {  ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Photo } from 'src/app/Models/photo';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  photos: Photo[];
  constructor(
    private userService: UserService,
    private alertify: AlterifyService,
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
     this.users = data['users'];
   });
  }
  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
