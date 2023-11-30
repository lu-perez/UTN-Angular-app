import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGenderComponent } from './components/add-gender/add-gender.component';
import { EditGenderComponent } from './components/edit-gender/edit-gender.component';
import { GendersListComponent } from './components/genders-list/genders-list.component';
import { GenderRoutingModule } from './gender-routing.module';

@NgModule({
  declarations: [
    AddGenderComponent,
    EditGenderComponent,
    GendersListComponent
  ],
  imports: [
    CommonModule,
    GenderRoutingModule,
  ]
})
export class GenderModule { }
