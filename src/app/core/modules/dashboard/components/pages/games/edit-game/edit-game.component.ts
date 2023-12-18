import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { GamesService } from '../../../../services/games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game, Genre, GenreAttributeWithValue, ValueType } from 'src/app/shared/types/types';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenresService } from '../../../../services/genres.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit, OnDestroy {
  editGameForm!: FormGroup;
  game!: Game;
  genres!: Genre[];
  ValueType = ValueType;

  private gameSubscription!: Subscription;
  private genresSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private gamesService: GamesService,
    private genresService: GenresService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const gameId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (gameId) {
      this.gameSubscription = this.gamesService.getGame(gameId).subscribe(game => {
        this.game = game;
        this.initializeForm();
      });
      this.genresSubscription = this.genresService.getGenres().subscribe(genres => {
        this.genres = genres;
      });
    }
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
    this.genresSubscription.unsubscribe();
  }

  initializeForm(): void {
    this.editGameForm = this.fb.group({
      name: [this.game.name, Validators.required],
      cpuRequirements: [this.game?.cpuRequirements, Validators.required],
      memoryRequirements: [this.game?.memoryRequirements, Validators.required],
      storageRequirements: [this.game?.storageRequirements, Validators.required],
      genreId: [this.game.genreId, Validators.required],
      price: [this.game.price, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      imageSrc: [this.game.imageSrc],
      genreAttributes: this.fb.array([]),
    });

    const gameGenreAttributes = this.game.genreAttributes || [];
    this.addGenreAttributesToForm(gameGenreAttributes as GenreAttributeWithValue[]);
  }

  onGenreChange(): void {
    const selectedGenreId = this.editGameForm.get('genreId')?.value;
    const selectedGenre = this.genres.find((genre) => genre.id === selectedGenreId);

    this.editGameForm.setControl('genreAttributes', this.fb.array([])); // reset genreAttributes

    if (selectedGenre) {
      this.addGenreAttributesToForm(selectedGenre.attributes as GenreAttributeWithValue[]);
    }
  }

  private addGenreAttributesToForm(attributes: GenreAttributeWithValue[]): void {
    console.log(attributes);
    attributes.forEach((attribute) => {
      const attrValueValidators: ValidatorFn[] = [];

      if (attribute.attrRequired) {
        attrValueValidators.push(Validators.required);
      }

      if (attribute.attrType === ValueType.Numeric) {
        attrValueValidators.push(Validators.pattern(/^\d+(\.\d{1,2})?$/));
      }

      const control = this.fb.group({
        attrName: attribute.attrName,
        attrType: attribute.attrType,
        attrRequired: attribute.attrRequired,
        attrValue: new FormControl(attribute.attrValue, attrValueValidators),
      });

      this.genreAttributesArray.push(control);
    });
  }

  get genreAttributesArray(): FormArray {
    return <FormArray>this.editGameForm.get('genreAttributes');
  }

  onSubmit() {
    if (this.editGameForm.valid) {
      this.gamesService.updateGame(this.game.id, this.editGameForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/dashboard/games']);
          this.snackBar.open(`Game ${this.editGameForm.get('name')?.value} updated`, '', { duration: 4000, panelClass: ['success-snackbar'] });
        },
        error: (err) => {
          console.error('Game update failed', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}
