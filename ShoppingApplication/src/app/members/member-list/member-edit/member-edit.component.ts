import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/Models/User';
import { ActivatedRoute } from '@angular/router';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
@ViewChild('editForm', {static: true}) editForm: NgForm;
// @ViewChild() provides the instance of another
// component or directive in a parent component
// and then parent component can access the methods
// and properties of that component or directive
@HostListener('window:beforeunload', ['$event'])
unloadNotification($event: any) {
  if (this.editForm.dirty) {
    $event.returnValue = true;
  }
}

  constructor(
    private route: ActivatedRoute,
    private alertify: AlterifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
  updatedUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
    .subscribe(data => {
      this.alertify.success('Profile Updated Successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    }
      );

  }
}
