import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-edit-profile',
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  editProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  showPasswordForm = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private dialogService: DialogService
  ) {
    this.editProfileForm = this.fb.group({
      full_name: [user.full_name, Validators.required],
      username: [user.username, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      description: [user.description],
    });

    this.changePasswordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.dialogService.setDialogOpen(true);
  }

  updateProfile() {
    if (this.editProfileForm.valid) {
      this.userService.updateProfile(this.editProfileForm.value).subscribe({
        next: (response) => {
          this.openSnackBar('Perfil actualizado exitosamente');
          this.dialogRef.close(true);
        },
        error: (err) => this.openSnackBar(err.error.detail),
      });
    } else {
      this.openSnackBar('Todos los campos son obligatorios');
    }
  }

  updatePassword() {
    if (this.editProfileForm.valid) {
      this.userService.changePassword(this.changePasswordForm.value).subscribe({
        next: (response) => {
          this.openSnackBar('Contraseña actualizada exitosamente');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.openSnackBar(err.error.detail);
        },
      });
    }
  }

  closeDialog(): void {
    this.dialogService.setDialogOpen(false);
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
