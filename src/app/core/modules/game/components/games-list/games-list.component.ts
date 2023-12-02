import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/shared/types/types';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  games$!: Observable<Game[] | null>;

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.getGames();
  }

}
