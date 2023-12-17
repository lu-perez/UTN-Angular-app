import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Genre, ValueType } from 'src/app/shared/types/types';
import { GenresService } from '../../../../services/genres.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-gender',
  templateUrl: './edit-gender.component.html',
  styleUrls: ['./edit-gender.component.scss']
})
export class EditGenderComponent implements OnInit, OnDestroy {
  editGenreForm!: FormGroup;
  genre!: Genre;
  ValueType = ValueType;
  attributeTypes: [string, string][] = Object.entries(ValueType);

  private genreSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private genresService: GenresService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const genreId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (genreId) {
      this.genreSubscription = this.genresService.getGenre(genreId).subscribe(genre => {
        this.genre = genre;
        this.initializeForm();
      });
    }
  }

  ngOnDestroy(): void {
    this.genreSubscription.unsubscribe();
  }

  initializeForm(): void {
    this.editGenreForm = this.fb.group({
      name: [this.genre?.name, Validators.required],
      attributes: this.fb.array([]),
    });

    this.genre.attributes.forEach(attribute => {
      this.addAttribute(attribute.attrName, attribute.attrType, attribute.attrRequired);
    });
  }

  get attributes(): FormArray {
    return <FormArray>this.editGenreForm.get('attributes');
  }

  addAttribute(attrName: string, attrType: ValueType, attrRequired: boolean): void {
    const attributeFormGroup = this.fb.group({
      attrName: new FormControl(attrName, Validators.required),
      attrType: new FormControl(attrType, Validators.required),
      attrRequired: new FormControl(attrRequired),
    });

    this.attributes.push(attributeFormGroup);
  }

  removeAttribute(index: number): void {
    this.attributes.removeAt(index);
  }

  onSubmit() {
    if (this.editGenreForm.valid) {
      this.genresService.updateGenre(this.genre.id, this.editGenreForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/dashboard/genres']);
          this.snackBar.open(`Genre ${this.editGenreForm.get('name')?.value} updated`, '', { duration: 4000, panelClass: ['success-snackbar'] });
        },
        error: (err) => {
          console.error('Genre update failed', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }
}
