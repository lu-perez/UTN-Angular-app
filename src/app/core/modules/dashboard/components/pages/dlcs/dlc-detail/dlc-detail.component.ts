import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';
import { DLC, Role, SafeUser } from 'src/app/shared/types/types';
import { DLCsService } from '../../../../services/dlcs.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PurchasesService } from '../../../../services/purchases.service';
import { AddPurchaseComponent, AddPurchaseDialogData } from '../../purchases/add-purchase/add-purchase.component';

@Component({
  selector: 'app-dlc-detail',
  templateUrl: './dlc-detail.component.html',
  styleUrls: ['./dlc-detail.component.scss']
})
export class DlcDetailComponent implements OnInit, OnDestroy {
  dlc!: DLC;
  currentUser: SafeUser | null;
  Role = Role;
  hasPurchasedDLC = false;
  hasPurchasedRelatedGame = false;

  private dlcSubscription!: Subscription;
  private purchasesSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dlcsService: DLCsService,
    private authService: AuthService,
    private purchasesService: PurchasesService,
    private dialogService: DialogService,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    const dlcId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (dlcId) {
      this.dlcSubscription = this.dlcsService.getDLC({ id: dlcId, _expand: 'game' }).subscribe(dlc => {
        this.dlc = dlc[0];
      });
      if (this.currentUser?.role === Role.User) {
        this.purchasesSubscription = this.purchasesService.getPurchases({
          userId: this.currentUser?.id,
          dlcId,
        }).subscribe(purchases => {
          this.hasPurchasedDLC = purchases?.filter(purchase => purchase.dlcId === dlcId).length > 0;
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.dlcSubscription.unsubscribe();
    if (this.currentUser?.role === Role.User) {
      this.purchasesSubscription.unsubscribe();
    }
  }

  openBuyDLCModal(): void {
    const data: AddPurchaseDialogData = {
      title: `Buy ${this.dlc?.name}`,
      purchaseType: 'DLC',
      dlc: this.dlc,
      currentUser: this.currentUser,
    };
    this.dialogService.open(AddPurchaseComponent, { data });
  }

  playGame(): void {
    console.log('play dlc', this.dlc);
  }

}
