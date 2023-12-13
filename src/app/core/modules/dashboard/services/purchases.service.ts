import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPurchase, Purchase } from 'src/app/shared/types/types';
import { environment } from 'src/environments/environment';

@Injectable()
export class PurchasesService {
  url = `${environment.apiUrl}/purchases`;

  constructor(private http: HttpClient) { }

  getPurchase(purchaseId: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.url}/${purchaseId}`);
  }

  getPurchases(queryParams: {
    userId?: number,
    gameId?: number,
    dlcId?: number,
    _expand?: string | string[],
  }): Observable<Purchase[]> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http.get<Purchase[]>(this.url, { params });
  }

  addPurchase(data: NewPurchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.url, data);
  }
}
