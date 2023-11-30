import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GendersListComponent } from './components/genders-list/genders-list.component';
import { AddGenderComponent } from './components/add-gender/add-gender.component';
import { EditGenderComponent } from './components/edit-gender/edit-gender.component';

const routes: Routes = [
  {
    path: '',
    component: GendersListComponent,
  },
  {
    path: 'add',
    component: AddGenderComponent,
  },
  {
    path: 'edit/:id',
    component: EditGenderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenderRoutingModule { }
