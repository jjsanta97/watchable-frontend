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
import { PostService } from '../../services/post.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: any;
  profilePicture: string = '/default-profile-picture.jpg'
  posts: any[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data;
      this.profilePicture = data.profile_picture
        ? `http://localhost:8088/${data.profile_picture}`
        : this.profilePicture;
      this.postService.getUserPosts(this.user.id).subscribe((postData) => {
        this.posts = postData.posts;
      });
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

  toggleLike(post: any) {
    this.postService.toggleLike(post);
  }

  openCommentDialog(post: any) {
    this.postService.openCommentDialog(post);
  }
}
