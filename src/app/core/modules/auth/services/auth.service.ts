import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { LogInRequest, SafeUser, User } from 'src/app/shared/types/types';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  url = `${environment.apiUrl}/users`;
  userKey = 'currentUser';

  constructor(private http: HttpClient) { }

  logIn(data: LogInRequest): Observable<SafeUser> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.get<User[]>(this.url, { params }).pipe(
      map(userArray => {
        if (userArray && userArray.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...rest } = userArray[0];
          return rest;
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      tap(user => {
        sessionStorage.setItem(this.userKey, JSON.stringify(user));
      }),
    );
  }

  getCurrentUser(): SafeUser | null {
    const userData = sessionStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  logOut(): void {
    sessionStorage.removeItem(this.userKey);
  }

}
