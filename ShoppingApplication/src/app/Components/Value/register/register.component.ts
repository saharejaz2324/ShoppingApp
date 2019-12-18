import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
//  @Input() valuesFromHome: any;
 @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(private authService: AuthService,
              private alertify: AlterifyService,
              private fb: FormBuilder
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
    console.log(this.registerForm.value);


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
