import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Lend, SafeUser } from 'src/app/shared/types/types';
import { LendsService } from '../../../../services/lends.service';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/modal/confirm-modal/confirm-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface LendsTable {
  id: number;
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
  displayedColumns: string[] = ['gameName', 'borrowerUserEmail', 'expirationDate', 'delete'];
  dataSource = new MatTableDataSource<LendsTable>(ELEMENT_DATA);

  lends$!: Observable<Lend[] | null>;

  lendsSubscription!: Subscription;

  constructor(
    private lendsService: LendsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
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
          id: lend.id,
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

  deleteLend(lend: Lend) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirm Delete Lend?',
      message: 'Are you sure you want to delete this lend?',
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lendsService.deleteLend(lend.id).subscribe({
          complete: () => {
            this.dataSource.data = this.dataSource.data.filter(item => item.id !== lend.id);
            this.snackBar.open('Lend deleted', '', { duration: 4000, panelClass: ['success-snackbar'] });
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }

}
