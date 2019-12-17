import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';
import { AlterifyService } from '../Services/Alterify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailresolver implements Resolve<User> {
    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlterifyService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id'])
        .pipe(catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return of(null);
        }));
    }
}
