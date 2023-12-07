import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game, Lend, Role, SafeUser } from 'src/app/shared/types/types';
import { LendsService } from '../../../../services/lends.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../../services/users.service';
import { Subscription } from 'rxjs';

export interface AddLendDialogData {
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
  users!: SafeUser[];
  lends!: Lend[];
  usersAvailableToLend!: SafeUser[];

  usersSubscription!: Subscription;
  lendsSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private lendsService: LendsService,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<AddLendComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddLendDialogData,
  ) {
    this.game = data.game;
    this.currentUser = data.currentUser;

    this.usersSubscription = this.usersService.getUsers({
      role: Role.User,
      id_ne: this.currentUser?.id,
    }).subscribe(users => {
      this.users = users;
    });

    this.lendsSubscription = this.lendsService.getLends({
      gameId: this.game.id,
      _expand: 'user',
    }).subscribe(lends => {
      this.lends = lends;
      this.usersAvailableToLend = this.users.filter(user => !this.lends.some(lend => lend.userId === user.id));
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
      userId: ['', Validators.required],
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
    this.dialogRef.close('add lend dialog closed');
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
