import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DLC, NewDLC } from 'src/app/shared/types/types';
import { environment } from 'src/environments/environment';

@Injectable()
export class DLCsService {
  url = `${environment.apiUrl}/dlcs`;

  constructor(private http: HttpClient) { }

  getDLC(queryParams: {
    id: number,
    _expand?: string | string[],
  }): Observable<DLC[]> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http.get<DLC[]>(this.url, { params });
  }

  getDLCs(queryParams: {
    _expand?: string | string[],
  }): Observable<DLC[]> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http.get<DLC[]>(this.url, { params });
  }

  addDLC(data: NewDLC): Observable<DLC> {
    return this.http.post<DLC>(this.url, data);
  }

  deleteDLC(dlcId: number): Observable<DLC> {
    return this.http.delete<DLC>(`${this.url}/${dlcId}`);
  }

  updateDLC(dlcId: number, data: DLC): Observable<DLC> {
    return this.http.put<DLC>(`${this.url}/${dlcId}`, data);
  }
}
