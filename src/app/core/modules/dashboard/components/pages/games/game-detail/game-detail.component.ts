import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, Purchase, Role, SafeUser } from 'src/app/shared/types/types';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { GamesService } from '../../../../services/games.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AddPurchaseComponent } from '../../purchases/add-purchase/add-purchase.component';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';
import { PurchasesService } from '../../../../services/purchases.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit, OnDestroy {
  game: Game | null = null;
  isHandset!: boolean;
  currentUser: SafeUser | null;
  Role = Role;
  hasPurchasedGame = false;

  purchases$!: Observable<Purchase[]>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  private gameSubscription!: Subscription;
  private isHandsetSubscription!: Subscription;
  private purchasesSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService,
    private authService: AuthService,
    private purchasesService: PurchasesService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    const gameId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') || '');
    if (gameId) {
      this.gameSubscription = this.gamesService.getGame(gameId).subscribe(game => {
        this.game = game;
      });

      if (this.currentUser?.role === Role.User) {
        this.purchases$ = this.purchasesService.getPurchasesByBuyer(this.currentUser?.id);
        this.purchasesSubscription = this.purchases$.subscribe(purchases => {
          this.hasPurchasedGame = purchases.some(purchase => purchase.gameId === gameId);
        });
      }
    }

    this.isHandsetSubscription = this.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
    this.isHandsetSubscription.unsubscribe();
    if (this.currentUser?.role === Role.User) {
      this.purchasesSubscription.unsubscribe();
    }
  }

  openBuyGameModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;

    if (this.isHandset) {
      dialogConfig.maxWidth = '100vW',
      dialogConfig.width = '100%',
      dialogConfig.maxHeight = '100vH',
      dialogConfig.height = '100%',
      dialogConfig.panelClass = 'slide-in-from-right';
      dialogConfig.enterAnimationDuration = '0ms';
      dialogConfig.exitAnimationDuration = '0ms';
    }

    dialogConfig.data = {
      title: 'Buy game',
      game: this.game,
      currentUser: this.currentUser,
    };

    this.dialog.open(AddPurchaseComponent, dialogConfig);
  }

  playGame(): void {
    console.log('play game');
  }

}
