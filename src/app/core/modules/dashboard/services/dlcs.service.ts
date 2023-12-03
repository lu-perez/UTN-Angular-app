import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DLC, NewDLC } from 'src/app/shared/types/types';

@Injectable()
export class DLCsService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDLC(dlcId: string): Observable<DLC> {
    const url = `${this.apiURL}/dlcs/${dlcId}`;
    return this.http.get<DLC>(url);
  }

  getDLCs(): Observable<DLC[]> {
    const url = `${this.apiURL}/dlcs`;
    return this.http.get<DLC[]>(url);
  }

  addDLC(data: NewDLC): Observable<DLC> {
    const url = `${this.apiURL}/dlcs`;
    return this.http.post<DLC>(url, data);
  }
}
