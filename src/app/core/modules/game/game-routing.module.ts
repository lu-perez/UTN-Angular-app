import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './components/games-list/games-list.component';
import { AddGameComponent } from './components/add-game/add-game.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';

const routes: Routes = [
  {
    path: '',
    component: GamesListComponent,
  },
  {
    path: 'add',
    component: AddGameComponent,
  },
  {
    path: 'edit/:id',
    component: EditGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
