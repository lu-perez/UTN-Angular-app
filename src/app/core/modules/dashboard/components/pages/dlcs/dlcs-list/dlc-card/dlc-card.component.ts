import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DLCsService } from 'src/app/core/modules/dashboard/services/dlcs.service';
import { ConfirmModalComponent } from 'src/app/shared/components/modal/confirm-modal/confirm-modal.component';
import { DLC, Role, SafeUser } from 'src/app/shared/types/types';

@Component({
  selector: 'app-dlc-card',
  templateUrl: './dlc-card.component.html',
  styleUrls: ['./dlc-card.component.scss']
})
export class DlcCardComponent {
  @Input() dlc!: DLC;
  @Input() currentUser!: SafeUser | null;
  @Output() refreshList = new EventEmitter<void>();

  Role = Role;

  constructor(
    private dialog: MatDialog,
    private dlcsService: DLCsService,
    private snackBar: MatSnackBar,
  ) { }

  deleteDLC() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirm Delete DLC?',
      message: `Are you sure you want to delete ${this.dlc.name}?`,
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dlcsService.deleteDLC(this.dlc.id).subscribe({
          complete: () => {
            this.refreshList.emit();
            this.snackBar.open(`DLC ${this.dlc.name} deleted`, '', { duration: 4000, panelClass: ['success-snackbar'] });
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });

  }

}
