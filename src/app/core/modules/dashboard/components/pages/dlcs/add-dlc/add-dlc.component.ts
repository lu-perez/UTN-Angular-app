import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DLCsService } from '../../../../services/dlcs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dlc',
  templateUrl: './add-dlc.component.html',
  styleUrls: ['./add-dlc.component.scss']
})
export class AddDlcComponent implements OnInit {
  addDLCForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dlcsService: DLCsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addDLCForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required]],
      relatedGameId: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.addDLCForm.valid) {
      this.dlcsService.addDLC(this.addDLCForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/dashboard/dlcs']);
        },
        error: (err) => {
          console.error('DLC creation failed', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

}
