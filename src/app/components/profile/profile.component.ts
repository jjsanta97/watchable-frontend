import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: any;
  profilePicture: string =
    'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data;
      this.profilePicture = data.profile_picture
        ? `http://localhost:8088/${data.profile_picture}`
        : this.profilePicture;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  editProfile(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '400px',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshUserData();
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.userService.uploadProfilePicture(file).subscribe((response) => {
        this.profilePicture = `http://localhost:8088/${response.profile_picture}`;
        this.refreshUserData();
      });
    }
  }

  refreshUserData() {
    this.userService.getCurrentUser().subscribe((updatedUser) => {
      this.user = updatedUser;
      this.profilePicture = `http://localhost:8088/${updatedUser.profile_picture}`;
    });
  }
}
