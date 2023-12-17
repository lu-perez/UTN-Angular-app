import { Component } from '@angular/core';
import { GenresService } from '../../../../services/genres.service';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/shared/types/types';

@Component({
  selector: 'app-genders-list',
  templateUrl: './genders-list.component.html',
  styleUrls: ['./genders-list.component.scss']
})
export class GendersListComponent {
  genres$!: Observable<Genre[] | null>;

  constructor(
    private genresService: GenresService
  ) {
    this.genres$ = this.genresService.getGenres();
  }

  deleteGenre(): void {
    console.log('delete');
  }

}
