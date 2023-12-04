import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/shared/types/types';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { GamesService } from '../../../../services/games.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AddPurchaseComponent } from '../../purchases/add-purchase/add-purchase.component';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit, OnDestroy {
  game: Game | null = null;
  isHandset!: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  private gameSubscription!: Subscription;
  private isHandsetSubscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    const gameId = this.activatedRoute.snapshot.paramMap.get('id');
    if (gameId) {
      this.gameSubscription = this.gamesService.getGame(gameId).subscribe(game => {
        this.game = game;
      });
    }

    this.isHandsetSubscription = this.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
    this.isHandsetSubscription.unsubscribe();
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
    };

    this.dialog.open(AddPurchaseComponent, dialogConfig);
  }

}
