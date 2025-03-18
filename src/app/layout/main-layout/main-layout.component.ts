import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { SuggestedUsersComponent } from '../../components/suggested-users/suggested-users.component';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet, SuggestedUsersComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
