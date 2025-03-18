import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggested-users',
  imports: [CommonModule, MatCardModule, MatToolbarModule],
  templateUrl: './suggested-users.component.html',
  styleUrl: './suggested-users.component.scss',
})
export class SuggestedUsersComponent implements OnInit {
  suggestedUsers: any[] = [];

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getSuggestedUsers().subscribe((users) => {
      this.suggestedUsers = users;
    });
  }

  getSuggestedUser(searchUsername: any) {
    if (searchUsername.trim()) {
      this.router.navigate(['/user', searchUsername]);
    }
  }
}
