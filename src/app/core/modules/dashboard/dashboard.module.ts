import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ToolbarComponent } from './components/nav/toolbar/toolbar.component';
import { DashboardComponent } from './components/dashboard.component';
import { GendersListComponent } from './components/pages/genres/genders-list/genders-list.component';
import { AddGenderComponent } from './components/pages/genres/add-gender/add-gender.component';
import { EditGenderComponent } from './components/pages/genres/edit-gender/edit-gender.component';
import { GamesListComponent } from './components/pages/games/games-list/games-list.component';
import { GameDetailComponent } from './components/pages/games/game-detail/game-detail.component';
import { EditGameComponent } from './components/pages/games/edit-game/edit-game.component';
import { AddGameComponent } from './components/pages/games/add-game/add-game.component';
import { AddDlcComponent } from './components/pages/dlcs/add-dlc/add-dlc.component';
import { EditDlcComponent } from './components/pages/dlcs/edit-dlc/edit-dlc.component';
import { DlcsListComponent } from './components/pages/dlcs/dlcs-list/dlcs-list.component';
import { GameCardComponent } from './components/pages/games/games-list/game-card/game-card.component';
import { AddPurchaseComponent } from './components/pages/purchases/add-purchase/add-purchase.component';
import { AddLendComponent } from './components/pages/lends/add-lend/add-lend.component';
import { LendsListComponent } from './components/pages/lends/lends-list/lends-list.component';
import { DlcCardComponent } from './components/pages/dlcs/dlcs-list/dlc-card/dlc-card.component';
import { DlcDetailComponent } from './components/pages/dlcs/dlc-detail/dlc-detail.component';
import { PurchasesListComponent } from './components/pages/purchases/purchases-list/purchases-list.component';

import { GamesService } from './services/games.service';
import { DLCsService } from './services/dlcs.service';
import { PurchasesService } from './services/purchases.service';
import { LendsService } from './services/lends.service';
import { UsersService } from './services/users.service';
import { GenresService } from './services/genres.service';

@NgModule({
  declarations: [
    ToolbarComponent,
    DashboardComponent,
    GamesListComponent,
    GameDetailComponent,
    AddGameComponent,
    EditGameComponent,
    GendersListComponent,
    AddGenderComponent,
    EditGenderComponent,
    AddDlcComponent,
    EditDlcComponent,
    DlcsListComponent,
    GameCardComponent,
    AddPurchaseComponent,
    AddLendComponent,
    LendsListComponent,
    DlcCardComponent,
    DlcDetailComponent,
    PurchasesListComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  providers: [
    GamesService,
    DLCsService,
    PurchasesService,
    LendsService,
    UsersService,
    GenresService,
  ]
})
export class DashboardModule { }
