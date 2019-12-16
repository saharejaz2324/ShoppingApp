import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AlterifyService } from 'src/app/Services/Alterify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
//  @Input() valuesFromHome: any;
 @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService,
              private alertify: AlterifyService) { }

  ngOnInit() {
  }
  register() {
    this.authService.register(this.model).subscribe(data => {
     this.alertify.success('Registration successful');
    }, error => {
      this.alertify.error(error);
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
