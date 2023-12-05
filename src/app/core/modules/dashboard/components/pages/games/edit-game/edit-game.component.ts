import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GamesService } from '../../../../services/games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/shared/types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit, OnDestroy {
  editGameForm!: FormGroup;
  game: Game | null = null;

  private gameSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private gamesService: GamesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const gameId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (gameId) {
      this.gameSubscription = this.gamesService.getGame(gameId).subscribe(game => {
        this.game = game;
        this.initializeForm();
      });
    }
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }

  initializeForm(): void {
    this.editGameForm = this.fb.group({
      name: [this.game?.name, Validators.required],
      cpuRequirements: [this.game?.cpuRequirements, Validators.required],
      memoryRequirements: [this.game?.memoryRequirements, Validators.required],
      storageRequirements: [this.game?.storageRequirements, Validators.required],
      genre: [this.game?.genre, Validators.required],
      price: [this.game?.price, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.editGameForm.valid && this.game) {
      this.gamesService.updateGame(this.game?.id, this.editGameForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/dashboard/games']);
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
