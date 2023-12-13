import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DLCsService } from '../../../../services/dlcs.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Game } from 'src/app/shared/types/types';
import { GamesService } from '../../../../services/games.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-dlc',
  templateUrl: './add-dlc.component.html',
  styleUrls: ['./add-dlc.component.scss']
})
export class AddDlcComponent implements OnInit {
  addDLCForm!: FormGroup;

  games$!: Observable<Game[] | null>;

  constructor(
    private fb: FormBuilder,
    private dlcsService: DLCsService,
    private gamesService: GamesService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.games$ = this.gamesService.getGames();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addDLCForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      gameId: ['', [Validators.required]],
      imageSrc: [''],
    });
  }

  onSubmit() {
    if (this.addDLCForm.valid) {
      this.dlcsService.addDLC(this.addDLCForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/dashboard/dlcs']);
          this.snackBar.open(`DLC ${this.addDLCForm.get('name')?.value} created`, '', { duration: 4000, panelClass: ['success-snackbar'] });
        },
        error: (err) => {
          console.error('DLC creation failed', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

}
