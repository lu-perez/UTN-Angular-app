import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesListComponent } from './components/games-list/games-list.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';
import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    GamesListComponent,
    AddGameComponent,
    EditGameComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
  ],
})
export class GameModule { }
