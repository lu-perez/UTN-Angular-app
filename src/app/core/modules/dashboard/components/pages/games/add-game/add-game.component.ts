import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GamesService } from '../../../../services/games.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  addGameForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gamesService: GamesService,
    private router: Router,
  ) { }

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
      this.gamesService.addGame(this.addGameForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/dashboard/games']);
        },
        error: (err) => {
          console.error('Game creation failed', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
