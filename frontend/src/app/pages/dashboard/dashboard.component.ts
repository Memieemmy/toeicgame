import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

interface PartCard {
  part: number;
  icon: string;
  name: string;
  desc: string;
  progress: number;
}

interface ActivityItem {
  icon: string;
  title: string;
  sub: string;
  xp: string;
  time: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  auth = inject(AuthService);

  user = computed<User | null>(() => this.auth.currentUser());

  xpForLevel = computed(() => {
    const u = this.user();
    if (!u) return { current: 0, required: 1000, pct: 0 };
    const required = u.level * 1000;
    const pct = Math.min(100, Math.round((u.xp / required) * 100));
    return { current: u.xp, required, pct };
  });

  accuracy = computed(() => {
    const u = this.user();
    if (!u || u.totalQuestions === 0) return 0;
    return Math.round((u.correctAnswers / u.totalQuestions) * 100);
  });

  partCards: PartCard[] = [
    { part: 5, icon: '📝', name: 'Part 5', desc: 'Incomplete Sentences — คำศัพท์ Grammar Word Form', progress: 68 },
    { part: 6, icon: '📄', name: 'Part 6', desc: 'Text Completion — เติมคำในบทความ Context + Grammar', progress: 45 },
    { part: 7, icon: '📖', name: 'Part 7', desc: 'Reading Comprehension — อีเมล โฆษณา บทความ', progress: 30 },
    { part: 1, icon: '🎧', name: 'Listening', desc: 'Parts 1–4 — ฟังภาพ บทสนทนา Short Talk', progress: 55 },
  ];

  recentActivity: ActivityItem[] = [
    { icon: '🎯', title: 'Part 5 · Vocabulary', sub: '10 ข้อ · ถูก 8 ข้อ · 80%', xp: '+80 XP', time: '2 ชม. ที่แล้ว' },
    { icon: '📝', title: 'Part 5 · Grammar', sub: '10 ข้อ · ถูก 7 ข้อ · 70%', xp: '+70 XP', time: 'เมื่อวาน' },
    { icon: '🔥', title: 'Streak Bonus!', sub: '7 วันติดต่อกัน', xp: '+50 XP', time: 'เมื่อวาน' },
  ];
}
