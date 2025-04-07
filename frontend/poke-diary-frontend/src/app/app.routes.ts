import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./pages/register/register.component').then(
                (m) => m.RegisterComponent
            ),
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
            ),
    },
    {
        path: 'diary/new',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/diary/diary-form/diary-form.component').then(
                (m) => m.DiaryFormComponent
            ),
    },
    {
        path: 'diary/list',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/diary/diary-list/diary-list.component').then(
                (m) => m.DiaryListComponent
            ),
    },
    {
        path: 'diary/:id',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/diary/diary-view/diary-view.component').then(
                (m) => m.DiaryViewComponent
            ),
    },
    {
        path: 'diary/:id/edit',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/diary/diary-edit/diary-edit.component').then(m => m.DiaryEditComponent)
    },
    {
        path: 'challenge/new',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/challenges/challenge-form/challenge-form.component').then(m => m.ChallengeFormComponent)
    },
    {
        path: 'challenge/list',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/challenges/challenge-list/challenge-list.component').then(m => m.ChallengeListComponent)
    },
    {
        path: 'challenge/:id',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/challenges/challenge-view/challenge-view.component').then(m => m.ChallengeViewComponent)
    },
    {
        path: 'challenge/:id/edit',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/challenges/challenge-edit/challenge-edit.component').then(m => m.ChallengeEditComponent)
    },
    {
        path: 'feed',
        loadComponent: () =>
            import('./pages/feed/feed/feed.component').then(m => m.FeedComponent)
    },
];
