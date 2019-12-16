import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AlterifyService } from 'src/app/Services/Alterify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService,
              private alertify: AlterifyService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
    // const token = localStorage.getItem('token');
    // return !!token;
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

}
