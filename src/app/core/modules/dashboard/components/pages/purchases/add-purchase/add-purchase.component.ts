import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DLC, Game, PaymentMethod, SafeUser } from 'src/app/shared/types/types';
import { PurchasesService } from '../../../../services/purchases.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AddPurchaseDialogData {
  title: string;
  purchaseType: 'Game' | 'DLC';
  game?: Game;
  dlc?: DLC;
  currentUser: SafeUser | null;
}

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {
  purchaseType!: 'Game' | 'DLC';
  addPurchaseForm!: FormGroup;
  paymentMethods: string[] = Object.values(PaymentMethod);

  constructor(
    private fb: FormBuilder,
    private purchasesService: PurchasesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddPurchaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddPurchaseDialogData,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (this.data.purchaseType === 'Game') {
      this.addPurchaseForm = this.fb.group({
        gameId: [this.data.game?.id, Validators.required],
        userId: [this.data.currentUser?.id, Validators.required],
        paymentMethod: ['', Validators.required],
        pricePaid: [this.data.game?.price, Validators.required],
      });
    } else if (this.data.purchaseType === 'DLC') {
      this.addPurchaseForm = this.fb.group({
        dlcId: [this.data.dlc?.id, Validators.required],
        userId: [this.data.currentUser?.id, Validators.required],
        paymentMethod: ['', Validators.required],
        pricePaid: [this.data.dlc?.price, Validators.required],
      });
    }
  }

  onSubmit(): void {
    if (this.addPurchaseForm.valid) {
      this.purchasesService.addPurchase(this.addPurchaseForm.value).subscribe({
        complete: () => {
          this.router.navigate(['/dashboard/games']);
          this.dialogRef.close();
          const message = this.data.purchaseType === 'Game' ? `Game ${this.data.game?.name}` : `DLC ${this.data.dlc?.name}`;
          this.snackBar.open(`${message} purchased`, '', { duration: 4000, panelClass: ['success-snackbar'] });
        },
        error: (err) => {
          console.error('Purchase creation failed', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
