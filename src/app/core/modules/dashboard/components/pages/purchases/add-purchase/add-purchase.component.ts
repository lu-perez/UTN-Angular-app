import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Game, PaymentMethod, SafeUser } from 'src/app/shared/types/types';
import { PurchasesService } from '../../../../services/purchases.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';

interface DialogData {
  title: string;
  game: Game;
}

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {
  game!: Game;
  currentUser!: SafeUser | null;
  addPurchaseForm!: FormGroup;
  paymentMethods: string[] = Object.values(PaymentMethod);

  constructor(
    private fb: FormBuilder,
    private purchasesService: PurchasesService,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<AddPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.game = data.game;
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addPurchaseForm = this.fb.group({
      gameId: [this.game.id, Validators.required],
      userId: [this.currentUser?.id, Validators.required],
      paymentMethod: ['', Validators.required],
      pricePaid: [this.game.price, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addPurchaseForm.valid) {
      this.purchasesService.addPurchase(this.addPurchaseForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/dashboard/purchases']);
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Purchase creation failed', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
