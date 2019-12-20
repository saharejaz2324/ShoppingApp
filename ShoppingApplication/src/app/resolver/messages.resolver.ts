import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';
import { AlterifyService } from '../Services/Alterify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';
import { Photo } from '../Models/photo';
import { Message } from '../Models/Message';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(
        private userService: UserService,
        private router: Router,
        private alertify: AlterifyService,
        private authService: AuthService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid,
            this.pageNumber,
            this.pageSize, this.messageContainer)
        .pipe(catchError(error => {
            this.alertify.error('Problem retrieving messages');
            this.router.navigate(['/home']);
            return of(null);
        }));
    }
}
