import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre, NewGenre } from 'src/app/shared/types/types';
import { environment } from 'src/environments/environment';

@Injectable()
export class GenresService {
  url = `${environment.apiUrl}/genres`;

  constructor(private http: HttpClient) { }

  getGenre(genreId: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.url}/${genreId}`);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.url);
  }

  addGenre(data: NewGenre): Observable<Genre> {
    return this.http.post<Genre>(this.url, data);
  }

  deleteGenre(genreId: number): Observable<Genre> {
    return this.http.delete<Genre>(`${this.url}/${genreId}`);
  }

  updateGenre(genreId: number, data: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${this.url}/${genreId}`, data);
  }
}
