import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { exclude } from 'src/app/shared/helpers/exclude-object-fields';
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
          const safeUser: SafeUser = exclude<User, 'password'>(userArray[0], ['password']);
          return safeUser;
        } else {
          throw new Error('Invalid email or password');
        }
      }),
      tap(safeUser => {
        sessionStorage.setItem(this.userKey, JSON.stringify(safeUser));
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
