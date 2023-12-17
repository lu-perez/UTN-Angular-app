import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { GamesService } from '../../../../services/games.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { GenresService } from '../../../../services/genres.service';
import { Genre, GenreAttribute, ValueType } from 'src/app/shared/types/types';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit, OnDestroy {
  addGameForm!: FormGroup;
  genres!: Genre[];

  genresSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private gamesService: GamesService,
    private genresService: GenresService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.genresSubscription = this.genresService.getGenres().subscribe(genres => {
      this.genres = genres;
    });
  }

  ngOnDestroy(): void {
    this.genresSubscription.unsubscribe();
  }

  initializeForm(): void {
    this.addGameForm = this.fb.group({
      name: ['', Validators.required],
      cpuRequirements: ['', Validators.required],
      memoryRequirements: ['', Validators.required],
      storageRequirements: ['', Validators.required],
      genreId: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      imageSrc: [''],
      genreAttributes: this.fb.array([]),
    });
  }

  onGenreChange(): void {
    const selectedGenreId = this.addGameForm.get('genreId')?.value;
    const selectedGenre = this.genres.find((genre) => genre.id === selectedGenreId);

    this.addGameForm.setControl('genreAttributes', this.fb.array([]));

    if (selectedGenre) {
      this.addGenreAttributesToForm(selectedGenre.attributes);
    }
  }

  private addGenreAttributesToForm(attributes: GenreAttribute[]): void {
    attributes.forEach((attribute) => {

      let attrValueValidator: ValidatorFn | null = Validators.required;

      if (attribute.attrType === ValueType.Numeric) {
        attrValueValidator = Validators.compose([
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
        ]);
      }

      const control = this.fb.group({
        attrName: attribute.attrName,
        attrType: attribute.attrType,
        attrValue: new FormControl('', attrValueValidator),
      });

      this.genreAttributesArray.push(control);
    });
  }

  get genreAttributesArray(): FormArray {
    return <FormArray>this.addGameForm.get('genreAttributes');
  }

  onSubmit() {
    console.log(this.addGameForm.value);
    if (this.addGameForm.valid) {
      this.gamesService.addGame(this.addGameForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/dashboard/games']);
          this.snackBar.open(`Game ${this.addGameForm.get('name')?.value} created`, '', { duration: 4000, panelClass: ['success-snackbar'] });
        },
        error: (err) => {
          console.error('Game creation failed', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

}
