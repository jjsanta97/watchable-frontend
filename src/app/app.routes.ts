import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./components/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'search/:query',
        loadComponent: () =>
          import('./components/search-results/search-results.component').then(
            (m) => m.SearchResultsComponent
          ),
      },
      {
        path: 'user/:query',
        loadComponent: () =>
          import(
            './components/suggested-users-result/suggested-users-result.component'
          ).then((m) => m.SuggestedUsersResultComponent),
      },
    ],
  },
];
