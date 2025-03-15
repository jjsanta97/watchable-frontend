import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-search-results',
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatDividerModule,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  user: any;
  posts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const query = params['query'];
      if (query) {
        this.userService.searchUsers(query).subscribe((data) => {
          console.log('DATAAA', data);
          this.user = data.user[0];
          this.postService.getUserPosts(this.user.id).subscribe((postData) => {
            this.posts = postData.posts;
          });
        });
      }
    });
  }

  toggleLike(post: any) {
    this.postService.toggleLike(post);
  }

  openCommentDialog(post: any) {
    this.postService.openCommentDialog(post);
  }
}
