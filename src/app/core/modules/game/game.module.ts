import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesListComponent } from './components/games-list/games-list.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GamesService } from './services/games.service';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

@NgModule({
  declarations: [
    GamesListComponent,
    AddGameComponent,
    EditGameComponent,
    GameDetailComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
  ],
  providers: [
    GamesService,
  ]
})
export class GameModule { }
