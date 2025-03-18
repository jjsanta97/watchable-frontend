import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LikeService } from './like.service';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from '../components/comment-dialog/comment-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://watchable-backend.onrender.com/posts';
  private postCreatedSubject = new BehaviorSubject<boolean>(false);
  postCreated$ = this.postCreatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private likeService: LikeService,
    private dialog: MatDialog
  ) {}

  getHttpHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  createPost(formData: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/create_post`, formData, this.getHttpHeaders())
      .pipe(
        tap(() => {
          this.postCreatedSubject.next(true);
        })
      );
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, this.getHttpHeaders());
  }

  getUserPosts(userId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/user/${userId}`,
      this.getHttpHeaders()
    );
  }

  // Funcionalidades de likes y comentarios
  toggleLike(post: any) {
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
  }

  openCommentDialog(post: any) {
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
  }
}
