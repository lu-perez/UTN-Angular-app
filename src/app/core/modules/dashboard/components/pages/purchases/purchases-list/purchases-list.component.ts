import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';
import { PaymentMethod, Purchase, SafeUser } from 'src/app/shared/types/types';
import { PurchasesService } from '../../../../services/purchases.service';

interface PurchasesTable {
  id: number;
  gameName: string;
  paymentMethod: PaymentMethod;
  pricePaid: number;
}

const ELEMENT_DATA: PurchasesTable[] = [];

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.scss']
})
export class PurchasesListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  currentUser!: SafeUser | null;
  purchases!: Purchase[] | null;
  searchTerm!: string;
  displayedColumns: string[] = ['gameName', 'paymentMethod', 'pricePaid'];
  dataSource = new MatTableDataSource<PurchasesTable>(ELEMENT_DATA);

  purchases$!: Observable<Purchase[] | null>;

  purchasesSubscription!: Subscription;

  constructor(
    private purchasesService: PurchasesService,
    private authService: AuthService,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.purchases$ = this.purchasesService.getPurchases({
      userId: this.currentUser?.id,
      _expand: 'game',
    });
    this.purchasesSubscription = this.purchases$.subscribe(purchases => {
      if (purchases) {
        this.purchases = purchases;
        const data = purchases.map((purchase) => ({
          id: purchase.id,
          gameName: purchase.game?.name || '',
          paymentMethod: purchase.paymentMethod,
          pricePaid: purchase.pricePaid,
        }));
        this.dataSource.data = data;
      } else {
        this.dataSource.data = [];
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.purchasesSubscription.unsubscribe();
  }

  applyFilterTable(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  purchaseDetails(purchase: Purchase): void {
    console.log(purchase);
  }
}
