import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Lend, SafeUser } from 'src/app/shared/types/types';
import { LendsService } from '../../../../services/lends.service';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

interface LendsTable {
  gameName: string;
  borrowerUserEmail: string;
  expirationDate: string | null;
}

const ELEMENT_DATA: LendsTable[] = [];

@Component({
  selector: 'app-lends-list',
  templateUrl: './lends-list.component.html',
  styleUrls: ['./lends-list.component.scss']
})
export class LendsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  currentUser!: SafeUser | null;
  lends!: Lend[] | null;
  searchTerm!: string;
  displayedColumns: string[] = ['gameName', 'borrowerUserEmail', 'expirationDate'];
  dataSource = new MatTableDataSource<LendsTable>(ELEMENT_DATA);

  lends$!: Observable<Lend[] | null>;

  lendsSubscription!: Subscription;

  constructor(
    private lendsService: LendsService,
    private authService: AuthService,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.lends$ = this.lendsService.getLends({
      lenderUserId: this.currentUser?.id,
      _expand: ['user', 'game'],
    });
    this.lendsSubscription = this.lends$.subscribe(lends => {
      if (lends) {
        this.lends = lends;
        const data = lends.map((lend) => ({
          gameName: lend.game?.name || '',
          borrowerUserEmail: lend.user.email,
          expirationDate: new DatePipe('en-US').transform(lend.expirationDate, 'dd/MM/yyyy'),
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
    this.lendsSubscription.unsubscribe();
  }

  applyFilterTable(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  lendDetails(lend: Lend): void {
    console.log(lend);
  }

}
