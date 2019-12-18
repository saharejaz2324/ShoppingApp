import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { Photo } from '../Models/photo';


@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
return this.http.get<User []>(this.baseUrl + 'users');
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}
updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id , user);
}
getPhotos(id: number): Observable<Photo[]> {
  return this.http.get<Photo[]>(this.baseUrl + 'users/' + id + '/photos/GetAllPhotos');
}
}
