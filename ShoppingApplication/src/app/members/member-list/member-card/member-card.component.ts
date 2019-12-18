import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Photo } from 'src/app/Models/photo';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlterifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

   ngOnInit() {
  }
}
