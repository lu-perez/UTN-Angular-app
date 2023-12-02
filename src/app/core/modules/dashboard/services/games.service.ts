import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/shared/types/types';

@Injectable()
export class GamesService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getGame(gameId: string): Observable<Game> {
    const url = `${this.apiURL}/games/${gameId}`;
    return this.http.get<Game>(url);
  }

  getGames(): Observable<Game[]> {
    const url = `${this.apiURL}/games`;
    return this.http.get<Game[]>(url);
  }

  addGame(data: Game): Observable<Game> {
    const url = `${this.apiURL}/games`;
    return this.http.post<Game>(url, data);
  }
}
