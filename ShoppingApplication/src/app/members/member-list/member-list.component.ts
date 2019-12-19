import { Component, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { User } from 'src/app/Models/User';
import {  ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Photo } from 'src/app/Models/photo';
import { Pagination, PaginatedResult } from 'src/app/Models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  userParams: any = {};
  constructor(
    private userService: UserService,
    private alertify: AlterifyService,
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
     this.users = data['users'].result;
     this.pagination = data['users'].pagination;
   });
    this.userParams.orderBy = 'LastActive';
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage,
      this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
}
