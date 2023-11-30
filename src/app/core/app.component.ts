import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../shared/services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  spinnerState$!: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerState$ = this.spinnerService.spinnerState$;
  }
}
