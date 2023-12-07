import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewLend, Lend } from 'src/app/shared/types/types';
import { Observable } from 'rxjs';

@Injectable()
export class LendsService {
  url = `${environment.apiUrl}/lends`;

  constructor(private http: HttpClient) { }

  getLend(lendId: number): Observable<Lend> {
    return this.http.get<Lend>(`${this.url}/${lendId}`);
  }

  getLends(queryParams: {
    lenderUserId?: number,
    gameId?: number,
    _expand?: string | string[],
  }): Observable<Lend[]> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http.get<Lend[]>(this.url, { params });
  }

  addLend(data: NewLend): Observable<Lend> {
    return this.http.post<Lend>(this.url, data);
  }

  deleteLend(lendId: number): Observable<Lend> {
    return this.http.delete<Lend>(`${this.url}/${lendId}`);
  }
}