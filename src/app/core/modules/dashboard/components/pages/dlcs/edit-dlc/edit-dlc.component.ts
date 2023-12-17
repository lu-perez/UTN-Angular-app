import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DLC, Game } from 'src/app/shared/types/types';
import { DLCsService } from '../../../../services/dlcs.service';
import { GamesService } from '../../../../services/games.service';

@Component({
  selector: 'app-edit-dlc',
  templateUrl: './edit-dlc.component.html',
  styleUrls: ['./edit-dlc.component.scss']
})
export class EditDlcComponent implements OnInit, OnDestroy {
  editDLCForm!: FormGroup;
  dlc: DLC | null = null;

  games$!: Observable<Game[] | null>;

  private dlcSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dlcsService: DLCsService,
    private gamesService: GamesService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.games$ = this.gamesService.getGames({});
  }

  ngOnInit(): void {
    const dlcId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (dlcId) {
      this.dlcSubscription = this.dlcsService.getDLC({ id: dlcId }).subscribe(dlc => {
        this.dlc = dlc[0];
        this.initializeForm();
      });
    }
  }

  ngOnDestroy(): void {
    this.dlcSubscription.unsubscribe();
  }

  initializeForm(): void {
    this.editDLCForm = this.fb.group({
      name: [this.dlc?.name, Validators.required],
      price: [this.dlc?.price, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      gameId: [this.dlc?.gameId, [Validators.required]],
      imageSrc: [this.dlc?.imageSrc],
    });
  }

  onSubmit() {
    if (this.editDLCForm.valid && this.dlc) {
      this.dlcsService.updateDLC(this.dlc?.id, this.editDLCForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/dashboard/dlcs']);
          this.snackBar.open(`DLC ${this.editDLCForm.get('name')?.value} updated`, '', { duration: 4000, panelClass: ['success-snackbar'] });
        },
        error: (err) => {
          console.error('Game updating failed', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

}
