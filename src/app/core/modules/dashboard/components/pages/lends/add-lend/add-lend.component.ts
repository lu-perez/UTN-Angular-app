import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game, Lend, Role, SafeUser } from 'src/app/shared/types/types';
import { LendsService } from '../../../../services/lends.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../../services/users.service';
import { Subscription } from 'rxjs';

interface DialogData {
  title: string;
  game: Game;
  currentUser: SafeUser | null;
}

@Component({
  selector: 'app-add-lend',
  templateUrl: './add-lend.component.html',
  styleUrls: ['./add-lend.component.scss']
})
export class AddLendComponent implements OnInit, OnDestroy {
  game!: Game;
  currentUser!: SafeUser | null;
  addLendForm!: FormGroup;
  filteredUsers!: SafeUser[];
  lends!: Lend[];
  usersAvailableToLend!: SafeUser[];
  borrowerUsers!: SafeUser[];

  usersSubscription!: Subscription;
  lendsSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private lendsService: LendsService,
    private usersService: UsersService,
    private router: Router,
    private dialogRef: MatDialogRef<AddLendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.game = data.game;
    this.currentUser = data.currentUser;

    this.usersSubscription = this.usersService.getUsers().subscribe(users => {
      this.filteredUsers = users.filter(user => user.id !== this.currentUser?.id && user.role === Role.User);
    });

    this.lendsSubscription = this.lendsService.getLendsByLenderUser(Number(this.currentUser?.id)).subscribe(lends => {
      this.lends = lends;

      this.usersAvailableToLend = this.filteredUsers.filter(user => !this.lends.some(lend => lend.borrowerUserId === user.id));

      const borrowerUsers = this.filteredUsers.filter(user => this.lends.some(lend => lend.borrowerUserId === user.id));

      this.lends.forEach(lend => {
        const borrower = borrowerUsers.find(b => b.id === lend.borrowerUserId);
        if (borrower) {
          lend.borrowerEmail = borrower.email;
        }
      });
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
    this.lendsSubscription.unsubscribe();
  }

  initializeForm(): void {
    this.addLendForm = this.fb.group({
      gameId: [this.game.id, Validators.required],
      lenderUserId: [this.data.currentUser?.id, Validators.required],
      borrowerUserId: ['', Validators.required],
      // expirationDate: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addLendForm.valid) {
      this.lendsService.addLend(this.addLendForm.value).subscribe({
        complete: () => {
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Lend creation failed', err);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  onDeleteLend(lend: Lend): void {
    this.lendsService.deleteLend(lend.id).subscribe({
      complete: () => {
        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
