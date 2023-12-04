import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModalComponent } from './components/modal/dialog-modal/dialog-modal.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    DialogModalComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    DialogModalComponent,
  ]
})
export class SharedModule { }
