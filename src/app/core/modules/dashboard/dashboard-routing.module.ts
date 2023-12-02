import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GendersListComponent } from './components/pages/genres/genders-list/genders-list.component';
import { AddGenderComponent } from './components/pages/genres/add-gender/add-gender.component';
import { EditGenderComponent } from './components/pages/genres/edit-gender/edit-gender.component';
import { GamesListComponent } from './components/pages/games/games-list/games-list.component';
import { GameDetailComponent } from './components/pages/games/game-detail/game-detail.component';
import { EditGameComponent } from './components/pages/games/edit-game/edit-game.component';
import { AddGameComponent } from './components/pages/games/add-game/add-game.component';

const routes: Routes = [
  {
    path: 'genres',
    component: GendersListComponent,
  },
  {
    path: 'genres/add',
    component: AddGenderComponent,
  },
  {
    path: 'genres/edit/:id',
    component: EditGenderComponent,
  },
  {
    path: 'games',
    component: GamesListComponent,
  },
  {
    path: 'games/add',
    component: AddGameComponent,
  },
  {
    path: 'games/edit/:id',
    component: EditGameComponent,
  },
  {
    path: 'games/:id',
    component: GameDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
