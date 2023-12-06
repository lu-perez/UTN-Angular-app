import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role, SafeUser, User } from 'src/app/shared/types/types';
import { Observable, map } from 'rxjs';
import { exclude } from 'src/app/shared/helpers/exclude-object-fields';

@Injectable()
export class UsersService {
  url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<SafeUser> {
    return this.http.get<User>(`${this.url}/${userId}`).pipe(
      map(user => {
        const safeUser: SafeUser = exclude<User, 'password'>(user, ['password']);
        return safeUser;
      })
    );
  }

  getUsers(queryParams: {
    role?: Role,
    id_ne?: number,
  }): Observable<SafeUser[]> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http.get<User[]>(this.url, { params }).pipe(
      map(users => users.map(user => exclude<User, 'password'>(user, ['password'])))
    );
  }
}
