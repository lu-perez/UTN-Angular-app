import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, Role, SafeUser } from 'src/app/shared/types/types';
import { Subscription } from 'rxjs';
import { GamesService } from '../../../../services/games.service';
import { AddPurchaseComponent, AddPurchaseDialogData } from '../../purchases/add-purchase/add-purchase.component';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';
import { PurchasesService } from '../../../../services/purchases.service';
import { AddLendComponent, AddLendDialogData } from '../../lends/add-lend/add-lend.component';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit, OnDestroy {
  game!: Game;
  currentUser: SafeUser | null;
  Role = Role;
  hasPurchasedGame = false;

  private gameSubscription!: Subscription;
  private purchasesSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService,
    private authService: AuthService,
    private purchasesService: PurchasesService,
    private dialogService: DialogService,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    const gameId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (gameId) {
      this.gameSubscription = this.gamesService.getGame(gameId).subscribe(game => {
        this.game = game;
      });
      if (this.currentUser?.role === Role.User) {
        this.purchasesSubscription = this.purchasesService.getPurchases({
          userId: this.currentUser?.id,
          gameId,
        }).subscribe(purchases => {
          this.hasPurchasedGame = purchases?.length > 0;
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
    if (this.currentUser?.role === Role.User) {
      this.purchasesSubscription.unsubscribe();
    }
  }

  openBuyGameModal(): void {
    const data: AddPurchaseDialogData = {
      title: `Buy ${this.game?.name}`,
      purchaseType: 'Game',
      game: this.game,
      currentUser: this.currentUser,
    };
    this.dialogService.open(AddPurchaseComponent, { data });
  }

  openLendGameModal(): void {
    const data: AddLendDialogData = {
      title: `Lend ${this.game?.name}`,
      game: this.game,
      currentUser: this.currentUser,
    };
    const dialogdata = this.dialogService.open(AddLendComponent, { data });
    dialogdata.afterClosed().subscribe(data => console.log(data));
  }

  playGame(): void {
    console.log('play game', this.game);
  }

}
