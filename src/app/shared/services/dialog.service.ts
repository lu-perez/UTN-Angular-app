import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal'; // Import ComponentType
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  dialogConfig!: MatDialogConfig;
  dialogRef?: MatDialogRef<any>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        this.dialogConfig = {
          maxWidth: '100vW',
          width: '100%',
          maxHeight: '100vH',
          height: '100%',
          panelClass: 'slide-in-from-right',
          enterAnimationDuration: '0ms',
          exitAnimationDuration: '0ms',
          autoFocus: false,
          disableClose: true,
        };
      } else {
        this.dialogConfig = {};
      }
    });
  }

  open(
    dialogComponent: ComponentType<any>,
    dialogConfig?: MatDialogConfig,
  ): MatDialogRef<any> {
    this.dialogRef = this.dialog.open(dialogComponent, {
      ...this.dialogConfig,
      ...dialogConfig,
    });

    return this.dialogRef;
  }
}
