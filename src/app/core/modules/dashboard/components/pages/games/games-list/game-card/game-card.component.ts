import { Component, Input } from '@angular/core';
import { Game, SafeUser, Role } from 'src/app/shared/types/types';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() game!: Game;
  @Input() currentUser!: SafeUser | null;
  Role = Role;

  editGame(game: Game) {
    console.log(game);
  }

  deleteGame(game: Game) {
    console.log(game);
  }
}
