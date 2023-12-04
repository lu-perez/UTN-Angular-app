import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, SafeUser } from 'src/app/shared/types/types';
import { GamesService } from '../../../../services/games.service';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  games$!: Observable<Game[] | null>;
  currentUser!: SafeUser | null;

  constructor(
    private gamesService: GamesService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.games$ = this.gamesService.getGames();
    this.currentUser = this.authService.getCurrentUser();
  }

}
