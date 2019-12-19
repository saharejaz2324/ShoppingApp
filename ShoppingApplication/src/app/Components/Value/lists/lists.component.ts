import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { Pagination, PaginatedResult } from 'src/app/Models/pagination';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlterifyService } from 'src/app/Services/Alterify.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
 users: User[];
 pagination: Pagination;
 likesParam: string;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlterifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data ['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }


  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage,
      this.pagination.itemsPerPage, null, this.likesParam)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  
}
