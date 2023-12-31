import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GamesService } from 'src/app/core/modules/dashboard/services/games.service';
import { ConfirmModalComponent } from 'src/app/shared/components/modal/confirm-modal/confirm-modal.component';
import { Game, SafeUser, Role } from 'src/app/shared/types/types';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() game!: Game;
  @Input() currentUser!: SafeUser | null;
  @Output() refreshList = new EventEmitter<void>();

  Role = Role;

  constructor(
    private dialog: MatDialog,
    private gamesService: GamesService,
    private snackBar: MatSnackBar,
  ) { }

  deleteGame() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirm Delete Game',
      message: `Are you sure you want to delete ${this.game.name}?`,
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gamesService.deleteGame(this.game.id).subscribe({
          complete: () => {
            this.refreshList.emit();
            this.snackBar.open(`Game ${this.game.name} deleted`, '', { duration: 4000, panelClass: ['success-snackbar'] });
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });

  }
}
