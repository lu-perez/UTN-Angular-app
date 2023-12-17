import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, NewGame } from 'src/app/shared/types/types';
import { environment } from 'src/environments/environment';

@Injectable()
export class GamesService {
  url = `${environment.apiUrl}/games`;

  constructor(private http: HttpClient) { }

  getGame(gameId: number): Observable<Game> {
    return this.http.get<Game>(`${this.url}/${gameId}`);
  }

  getGames(queryParams: {
    _expand?: string | string[],
  }): Observable<Game[]> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http.get<Game[]>(this.url, { params });
  }

  addGame(data: NewGame): Observable<Game> {
    return this.http.post<Game>(this.url, data);
  }

  deleteGame(gameId: number): Observable<Game> {
    return this.http.delete<Game>(`${this.url}/${gameId}`);
  }

  updateGame(gameId: number, data: Game): Observable<Game> {
    return this.http.put<Game>(`${this.url}/${gameId}`, data);
  }
}
