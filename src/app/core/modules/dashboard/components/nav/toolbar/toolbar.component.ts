import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/modules/auth/services/auth.service';
import { Role, SafeUser } from 'src/app/shared/types/types';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  currentUser!: SafeUser | null;
  Role = Role;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

}
