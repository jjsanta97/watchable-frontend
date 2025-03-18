import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

import { NewPostDialogComponent } from '../new-post-dialog/new-post-dialog.component';
import { DialogService } from '../../services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, MatIconModule, MatToolbarModule, MatButtonModule, MatInputModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  post: any;
  dialogOpen = false;
  searchQuery: string = '';

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dialogService.dialogOpen$.subscribe((isOpen) => {
      this.dialogOpen = isOpen;
    });
  }

  openNewPostDialog() {
    const dialogRef = this.dialog.open(NewPostDialogComponent, {
      width: '400px',
    });
    this.dialogService.setDialogOpen(true);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogService.setDialogOpen(false);
      }
    });
  }

  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search', this.searchQuery]);
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
