import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { catchError, of } from 'rxjs';

interface LeaderboardEntry {
  rank: number;
  nickname: string;
  avatar: string;
  level: number;
  targetScore: string;
  xp: number;
  accuracy: number;
  isMe?: boolean;
}

const MOCK_LEADERS: LeaderboardEntry[] = [
  { rank: 1, nickname: 'SomPong_Pro', avatar: '🦁', level: 10, targetScore: 'advanced', xp: 4820, accuracy: 92 },
  { rank: 2, nickname: 'NamfaRocks', avatar: '🐯', level: 9, targetScore: 'advanced', xp: 3950, accuracy: 88 },
  { rank: 3, nickname: 'KornKrit99', avatar: '🦊', level: 8, targetScore: 'advanced', xp: 3410, accuracy: 85 },
  { rank: 4, nickname: 'PloyTOEIC', avatar: '🐻', level: 8, targetScore: 'advanced', xp: 2980, accuracy: 88 },
  { rank: 5, nickname: 'BestEnglish', avatar: '🐼', level: 7, targetScore: 'advanced', xp: 2740, accuracy: 84 },
  { rank: 6, nickname: 'MinnieTOEIC', avatar: '🦋', level: 6, targetScore: 'intermediate', xp: 2310, accuracy: 79 },
  { rank: 7, nickname: 'ArtToeicUp', avatar: '🐸', level: 6, targetScore: 'intermediate', xp: 2090, accuracy: 76 },
  { rank: 8, nickname: 'JirapatScore', avatar: '🦅', level: 5, targetScore: 'intermediate', xp: 1870, accuracy: 74 },
  { rank: 9, nickname: 'PimEnglish', avatar: '🐬', level: 5, targetScore: 'intermediate', xp: 1640, accuracy: 71 },
  { rank: 10, nickname: 'TOEICmaster', avatar: '🌟', level: 4, targetScore: 'beginner', xp: 1420, accuracy: 68 },
];

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {
  private api = inject(ApiService);
  private auth = inject(AuthService);

  activeTab = signal<'week' | 'month' | 'all'>('week');
  leaders = signal<LeaderboardEntry[]>([]);
  myEntry = signal<LeaderboardEntry | null>(null);
  loading = signal(true);

  get top3() { return this.leaders().slice(0, 3); }
  get rest() { return this.leaders().slice(3); }

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.api.get<any[]>('/leaderboard').pipe(
      catchError(() => of(null))
    ).subscribe(data => {
      const user = this.auth.getUser();
      const list = data ?? MOCK_LEADERS;
      this.leaders.set(list.map((e: any, i: number) => ({
        ...e,
        rank: e.rank ?? i + 1,
        isMe: user ? e.nickname === user.nickname : false
      })));
      if (user) {
        const me = this.leaders().find(e => e.isMe);
        if (!me) {
          this.myEntry.set({ rank: 24, nickname: user.nickname, avatar: '😎', level: user.level, targetScore: user.targetScore, xp: user.xp, accuracy: user.totalQuestions ? Math.round((user.correctAnswers / user.totalQuestions) * 100) : 0, isMe: true });
        } else {
          this.myEntry.set(me);
        }
      }
      this.loading.set(false);
    });
  }

  setTab(tab: 'week' | 'month' | 'all') {
    this.activeTab.set(tab);
    this.load();
  }

  badgeClass(targetScore: string) {
    return { 'badge-adv': targetScore === 'advanced', 'badge-int': targetScore === 'intermediate', 'badge-beg': targetScore === 'beginner' };
  }

  badgeLabel(targetScore: string) {
    return { advanced: 'Advanced', intermediate: 'Intermediate', beginner: 'Beginner' }[targetScore] ?? targetScore;
  }
}
