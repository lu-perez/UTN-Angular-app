import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/nav/toolbar/toolbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { GendersListComponent } from './components/pages/genres/genders-list/genders-list.component';
import { AddGenderComponent } from './components/pages/genres/add-gender/add-gender.component';
import { EditGenderComponent } from './components/pages/genres/edit-gender/edit-gender.component';
import { DashboardComponent } from './dashboard.component';
import { GamesListComponent } from './components/pages/games/games-list/games-list.component';
import { GameDetailComponent } from './components/pages/games/game-detail/game-detail.component';
import { EditGameComponent } from './components/pages/games/edit-game/edit-game.component';
import { AddGameComponent } from './components/pages/games/add-game/add-game.component';
import { GamesService } from './services/games.service';

@NgModule({
  declarations: [
    ToolbarComponent,
    DashboardComponent,
    GamesListComponent,
    GameDetailComponent,
    AddGameComponent,
    EditGameComponent,
    GendersListComponent,
    AddGenderComponent,
    EditGenderComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  providers: [
    GamesService,
  ]
})
export class DashboardModule { }
