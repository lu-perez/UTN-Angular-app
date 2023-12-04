import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DLC, NewDLC } from 'src/app/shared/types/types';
import { environment } from 'src/environments/environment';

@Injectable()
export class DLCsService {
  url = `${environment.apiUrl}/dlcs`;

  constructor(private http: HttpClient) { }

  getDLC(dlcId: number): Observable<DLC> {
    return this.http.get<DLC>(`${this.url}/${dlcId}`);
  }

  getDLCs(): Observable<DLC[]> {
    return this.http.get<DLC[]>(this.url);
  }

  addDLC(data: NewDLC): Observable<DLC> {
    return this.http.post<DLC>(this.url, data);
  }
}
