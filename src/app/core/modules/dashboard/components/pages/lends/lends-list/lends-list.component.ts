import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lend, SafeUser } from 'src/app/shared/types/types';
import { LendsService } from '../../../../services/lends.service';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';

@Component({
  selector: 'app-lends-list',
  templateUrl: './lends-list.component.html',
  styleUrls: ['./lends-list.component.scss']
})
export class LendsListComponent implements OnInit {
  currentUser!: SafeUser | null;

  lends$!: Observable<Lend[] | null>;

  constructor(
    private lendsService: LendsService,
    private authService: AuthService,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getLends();
  }

  getLends(): void {
    this.lends$ = this.lendsService.getLends({ lenderUserId: this.currentUser?.id });
  }
}
