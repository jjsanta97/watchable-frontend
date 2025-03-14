import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PostService } from '../../services/post.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-new-post-dialog',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './new-post-dialog.component.html',
  styleUrl: './new-post-dialog.component.scss',
})
export class NewPostDialogComponent {
  postForm: FormGroup;
  selectedFile: File | null = null;
  posts: any;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    public dialogRef: MatDialogRef<NewPostDialogComponent>,
    private dialogService: DialogService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });

    this.dialogService.setDialogOpen(true);
  }

  onFileSelected(event: any) {
    /*const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
    }*/
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('title', this.postForm.value.title);
      formData.append('body', this.postForm.value.body);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.postService.createPost(formData).subscribe(() => {    
        this.dialogRef.close(true);
      });
    }
  }

  closeDialog(): void {
    this.dialogService.setDialogOpen(false);
    this.dialogRef.close();
  }
}
