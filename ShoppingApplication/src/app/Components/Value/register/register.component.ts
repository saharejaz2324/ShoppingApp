import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
//  @Input() valuesFromHome: any;
 @Output() cancelRegister = new EventEmitter();
 user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(private authService: AuthService,
              private alertify: AlterifyService,
              private fb: FormBuilder,
              private router: Router
              ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null , Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['',  [Validators.required, Validators.minLength(4), Validators.maxLength(8)] ],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    // we are using reactive forms so we can also check in .ts file
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      // clone the value of register form into the empty object and assign that object to the user object
      this.authService.register(this.user)
      .subscribe(() => {
        this.alertify.success('Registration Successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user)
        .subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
    // this.authService.register(this.model).subscribe(data => {
    //  this.alertify.success('Registration successful');
    // }, error => {
    //   this.alertify.error(error);
    // });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
