import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/Models/User';
import { ActivatedRoute } from '@angular/router';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { NgForm } from '@angular/forms';

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
    private alertify: AlterifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
  updatedUser() {
    console.log(this.user);
    this.alertify.success('Profile Updated Successfully');
    this.editForm.reset(this.user);
  }
}
