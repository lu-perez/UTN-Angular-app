import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DLC, SafeUser } from 'src/app/shared/types/types';
import { DLCsService } from '../../../../services/dlcs.service';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';

@Component({
  selector: 'app-dlcs-list',
  templateUrl: './dlcs-list.component.html',
  styleUrls: ['./dlcs-list.component.scss']
})
export class DlcsListComponent implements OnInit {
  currentUser!: SafeUser | null;

  DLCs$!: Observable<DLC[] | null>;

  constructor(
    private dlcsService: DLCsService,
    private authService: AuthService,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.getDLCs();
  }

  getDLCs(): void {
    this.DLCs$ = this.dlcsService.getDLCs({ _expand: 'game' });
  }
}
