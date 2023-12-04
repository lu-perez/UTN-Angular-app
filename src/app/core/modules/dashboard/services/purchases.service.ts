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

  getPurchasesByBuyer(userId: number): Observable<Purchase[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Purchase[]>(this.url, { params });
  }

  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.url);
  }

  addPurchase(data: NewPurchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.url, data);
  }
}
