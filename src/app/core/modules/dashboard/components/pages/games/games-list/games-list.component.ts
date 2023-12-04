import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { Game, SafeUser } from 'src/app/shared/types/types';
import { GamesService } from '../../../../services/games.service';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, OnDestroy {
  currentUser!: SafeUser | null;
  isHandset!: boolean;

  games$!: Observable<Game[] | null>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  private isHandsetSubscription!: Subscription;

  constructor(
    private gamesService: GamesService,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.getGames();
    this.currentUser = this.authService.getCurrentUser();
    this.isHandsetSubscription = this.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
    });
  }

  getGames(): void {
    this.games$ = this.gamesService.getGames();
  }

  ngOnDestroy(): void {
    this.isHandsetSubscription.unsubscribe();
  }

}
