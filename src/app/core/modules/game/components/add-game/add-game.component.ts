import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  addGameForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addGameForm = this.fb.group({
      name: ['', Validators.required],
      cpuRequirements: ['', Validators.required],
      memoryRequirements: ['', Validators.required],
      storageRequirements: ['', Validators.required],
      genre: ['', Validators.required],
      price: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.addGameForm.valid) {
      console.log('Form submitted:', this.addGameForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

}
