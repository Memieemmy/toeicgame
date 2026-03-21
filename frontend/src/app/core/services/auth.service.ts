import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { User } from '../models/user.model';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);
  private router = inject(Router);

  currentUser = signal<User | null>(this.loadUser());

  private loadUser(): User | null {
    const raw = localStorage.getItem('toeicup_user');
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('toeicup_user');
  }

  /** Save user directly (demo mode — no API required) */
  saveUser(user: User) {
    localStorage.setItem('toeicup_user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  /** Create a demo user from onboarding data and persist it */
  createDemoUser(nickname: string, targetScore: 'beginner' | 'intermediate' | 'advanced', weakAreas: string[]) {
    const user: User = {
      _id: 'demo_' + Date.now(),
      nickname,
      level: 1,
      xp: 0,
      streak: 0,
      targetScore,
      weakAreas,
      totalQuestions: 0,
      correctAnswers: 0,
    };
    this.saveUser(user);
    return user;
  }

  getUser(): User | null {
    return this.currentUser();
  }

  clearUser() {
    localStorage.removeItem('toeicup_user');
    localStorage.removeItem('toeicup_token');
    this.currentUser.set(null);
  }

  register(payload: {
    nickname: string;
    email?: string;
    password?: string;
    targetScore?: string;
    weakAreas?: string[];
  }) {
    return this.api.post<AuthResponse>('/auth/register', payload).pipe(
      tap((res) => this.handleAuth(res))
    );
  }

  login(nickname: string, password?: string) {
    return this.api.post<AuthResponse>('/auth/login', { nickname, password }).pipe(
      tap((res) => this.handleAuth(res))
    );
  }

  private handleAuth(res: AuthResponse) {
    if (res.token) localStorage.setItem('toeicup_token', res.token);
    localStorage.setItem('toeicup_user', JSON.stringify(res.user));
    this.currentUser.set(res.user);
  }

  logout() {
    this.clearUser();
    this.router.navigate(['/']);
  }

  refreshUser() {
    return this.api.get<User>('/auth/me').pipe(
      tap((user) => {
        localStorage.setItem('toeicup_user', JSON.stringify(user));
        this.currentUser.set(user);
      })
    );
  }
}
