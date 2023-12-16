import { Component, OnInit } from '@angular/core';
import { GenresService } from '../../../../services/genres.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-gender',
  templateUrl: './add-gender.component.html',
  styleUrls: ['./add-gender.component.scss']
})
export class AddGenderComponent implements OnInit {
  addGenreForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private genresService: GenresService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addGenreForm = this.fb.group({
      name: ['', Validators.required],
      attributes: this.fb.array([]),
    });
  }

  get attributes(): FormArray {
    return <FormArray>this.addGenreForm.get('attributes');
  }

  addAttribute() {
    const attributeFormGroup = this.fb.group({
      attributeName: new FormControl('', Validators.required),
      attributeType: new FormControl('text', Validators.required),
    });

    this.attributes.push(attributeFormGroup);
  }

  removeAttribute(index: number) {
    this.attributes.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.addGenreForm.value);

    // if (this.addGenreForm.valid) {
    //   this.genresService.addGenre(this.addGenreForm.value).subscribe({
    //     complete: () => {
    //       this.router.navigate(['/dashboard/genres']);
    //     },
    //     error: (err) => {
    //       console.error('Genre creation failed', err);
    //     }
    //   });
    // } else {
    //   console.warn('Form is invalid');
    // }
  }
}
