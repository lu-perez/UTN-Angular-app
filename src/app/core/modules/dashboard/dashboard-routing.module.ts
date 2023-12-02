import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GendersListComponent } from './components/pages/genres/genders-list/genders-list.component';
import { AddGenderComponent } from './components/pages/genres/add-gender/add-gender.component';
import { EditGenderComponent } from './components/pages/genres/edit-gender/edit-gender.component';
import { GamesListComponent } from './components/pages/games/games-list/games-list.component';
import { GameDetailComponent } from './components/pages/games/game-detail/game-detail.component';
import { EditGameComponent } from './components/pages/games/edit-game/edit-game.component';
import { AddGameComponent } from './components/pages/games/add-game/add-game.component';
import { RoleGuard } from '../../guards/role.guard';
import { Role } from 'src/app/shared/types/types';

const routes: Routes = [
  {
    path: 'genres',
    component: GendersListComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin]
    }
  },
  {
    path: 'genres/add',
    component: AddGenderComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin]
    }
  },
  {
    path: 'genres/edit/:id',
    component: EditGenderComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin]
    }
  },
  {
    path: 'games',
    component: GamesListComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [Role.User, Role.Agent, Role.Admin]
    }
  },
  {
    path: 'games/add',
    component: AddGameComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Agent, Role.Admin]
    }
  },
  {
    path: 'games/edit/:id',
    component: EditGameComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Agent, Role.Admin]
    }
  },
  {
    path: 'games/:id',
    component: GameDetailComponent,
    canActivate: [RoleGuard],
    data: {
      roles: [Role.User, Role.Agent, Role.Agent]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
