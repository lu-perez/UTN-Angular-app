import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule)
  },
  {
    path: 'genders',
    loadChildren: () => import('./modules/gender/gender.module').then(m => m.GenderModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
