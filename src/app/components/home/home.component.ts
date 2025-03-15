import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { LikeService } from '../../services/like.service';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: any;
  private postSubscription!: Subscription;
  userId!: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private postService: PostService,
    private dialog: MatDialog,
    private likeService: LikeService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.loadPosts();
    this.postSubscription = this.postService.postCreated$.subscribe(() => {
      this.loadPosts();
    });
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe((response) => {
      console.log('POSTS', response);
      this.posts = response.posts;
    });
  }

  /*toggleLike(post: any) {
    if (post.userLike) {
      this.likeService.unlikePost(post.userLike.id).subscribe(() => {
        post.likesCount--;
        post.userLike = null;
      });
    } else {
      this.likeService.likePost(post.id).subscribe((res) => {
        post.likesCount++;
        post.userLike = res.comment;
      });
    }
  }*/

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  /*openCommentDialog(post: any) {
    console.log('Post recibido en openCommentDialog:', post);
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: { postId: post.id, commentsCount: post.commentsCount },
    });
    dialogRef
      .afterClosed()
      .subscribe((updatedCommentsCount: number | undefined) => {
        if (updatedCommentsCount !== undefined) {
          post.commentsCount = updatedCommentsCount;
        }
      });
  }*/

  toggleLike(post: any) {
    this.postService.toggleLike(post);
  }

  openCommentDialog(post: any) {
    this.postService.openCommentDialog(post);
  }
}
