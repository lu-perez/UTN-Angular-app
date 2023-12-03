import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DLC } from 'src/app/shared/types/types';
import { DLCsService } from '../../../../services/dlcs.service';

@Component({
  selector: 'app-dlcs-list',
  templateUrl: './dlcs-list.component.html',
  styleUrls: ['./dlcs-list.component.scss']
})
export class DlcsListComponent implements OnInit {
  DLCs$!: Observable<DLC[] | null>;

  constructor(private dlcsService: DLCsService) { }

  ngOnInit(): void {
    this.DLCs$ = this.dlcsService.getDLCs();
  }

}
