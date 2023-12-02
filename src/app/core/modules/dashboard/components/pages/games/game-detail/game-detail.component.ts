import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/shared/types/types';
import { Observable } from 'rxjs';
import { GamesService } from '../../../../services/games.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {
  game$!: Observable<Game>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService,
  ) {}

  ngOnInit(): void {
    const gameId = this.activatedRoute.snapshot.paramMap.get('id');
    if (gameId) {
      this.game$ = this.gamesService.getGame(gameId);
    }
  }
}
