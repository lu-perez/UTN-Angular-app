import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, NewGame } from 'src/app/shared/types/types';
import { environment } from 'src/environments/environment';

@Injectable()
export class GamesService {
  url = `${environment.apiUrl}/games`;

  constructor(private http: HttpClient) { }

  getGame(gameId: string): Observable<Game> {
    return this.http.get<Game>(`${this.url}/${gameId}`);
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url);
  }

  addGame(data: NewGame): Observable<Game> {
    return this.http.post<Game>(this.url, data);
  }
}
