import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent) },
  { path: 'onboarding', loadComponent: () => import('./pages/onboarding/onboarding.component').then(m => m.OnboardingComponent) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'quiz', canActivate: [authGuard], loadComponent: () => import('./pages/quiz/quiz.component').then(m => m.QuizComponent) },
  { path: 'leaderboard', loadComponent: () => import('./pages/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent) },
  { path: 'progress', canActivate: [authGuard], loadComponent: () => import('./pages/progress/progress.component').then(m => m.ProgressComponent) },
  { path: '**', redirectTo: '' }
];
