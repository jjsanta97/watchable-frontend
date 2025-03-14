import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CommentService } from '../../services/comment.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-comment-dialog',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './comment-dialog.component.html',
  styleUrl: './comment-dialog.component.scss',
})
export class CommentDialogComponent {
  commentText = '';
  comments: any[] = [];
  commentsCount: number;

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { postId: number; commentsCount: number },
    private commentService: CommentService,
    private dialogService: DialogService
  ) {
    this.commentsCount = data.commentsCount;
    this.dialogService.setDialogOpen(true);
  }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments(this.data.postId).subscribe((comments) => {
      console.log('COMMENTS', comments);
      this.comments = comments;
    });
  }

  addComment() {
    if (!this.commentText.trim()) return;

    const commentData = {
      body: this.commentText,
      post_id: this.data.postId,
    };

    this.commentService.createComment(commentData).subscribe((newComment) => {
      // this.comments.unshift(newComment.comment);
      // this.cdRef.detectChanges();
      this.comments = [newComment.comment, ...this.comments];
      this.commentText = '';
      this.commentsCount += 1;
    });
  }

  closeDialog() {
    this.dialogService.setDialogOpen(false);
    this.dialogRef.close(this.commentsCount);
  }
}
