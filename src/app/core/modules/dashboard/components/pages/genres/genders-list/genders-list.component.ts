import { Component, OnInit } from '@angular/core';
import { GenresService } from '../../../../services/genres.service';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/shared/types/types';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modal/confirm-modal/confirm-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-genders-list',
  templateUrl: './genders-list.component.html',
  styleUrls: ['./genders-list.component.scss']
})
export class GendersListComponent implements OnInit {
  genres$!: Observable<Genre[] | null>;

  constructor(
    private genresService: GenresService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.genres$ = this.genresService.getGenres();
  }

  deleteGenre(genre: Genre): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirm Delete Genre?',
      message: `Are you sure you want to delete ${genre.name}?`,
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.genresService.deleteGenre(genre.id).subscribe({
          complete: () => {
            this.getGenres();
            this.snackBar.open(`Genre ${genre.name} deleted`, '', { duration: 4000, panelClass: ['success-snackbar'] });
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }

}
