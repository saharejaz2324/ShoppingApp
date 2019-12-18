import { Injectable } from "@angular/core";
import { Photo } from '../Models/photo';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';
import { AlterifyService } from '../Services/Alterify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';

@Injectable()

export class MemberPhotoResolver implements Resolve<Photo[]> {
    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlterifyService,
        private authService: AuthService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Photo[]> {
        return this.userService.getPhotos(this.authService.decodedToken.nameid)
        .pipe(catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/home']);
            return of(null);
        }));
    }
}