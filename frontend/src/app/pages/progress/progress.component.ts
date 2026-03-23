import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

interface Achievement { icon: string; name: string; desc: string; earned: boolean; }

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  auth = inject(AuthService);
  user = computed<User | null>(() => this.auth.currentUser());

  xpInfo = computed(() => {
    const u = this.user();
    if (!u) return { current: 0, required: 1000, pct: 0 };
    const required = u.level * 1000;
    const pct = Math.min(100, Math.round((u.xp / required) * 100));
    return { current: u.xp, required, pct };
  });

  accuracy = computed(() => {
    const u = this.user();
    if (!u || !u.totalQuestions) return 0;
    return Math.round((u.correctAnswers / u.totalQuestions) * 100);
  });

  partBars = [
    { icon: '📝', name: 'Part 5 — Grammar & Vocabulary', pct: 68, color: '#9DCAEB', done: 136, total: 200, accuracy: 74 },
    { icon: '📄', name: 'Part 6 — Text Completion', pct: 35, color: '#AFD5F0', done: 42, total: 120, accuracy: 66 },
    { icon: '📖', name: 'Part 7 — Reading', pct: 20, color: '#C3EEFA', done: 30, total: 150, accuracy: 60 },
    { icon: '🎧', name: 'Parts 1–4 — Listening', pct: 50, color: '#CFE0EB', done: 60, total: 120, accuracy: 78 },
  ];

  weekDays = [
    { label: 'จ', count: 8, pct: 40 },
    { label: 'อ', count: 13, pct: 65 },
    { label: 'พ', count: 6, pct: 30 },
    { label: 'พฤ', count: 16, pct: 80 },
    { label: 'ศ', count: 11, pct: 55 },
    { label: 'ส', count: 2, pct: 10 },
    { label: 'อา', count: 10, pct: 50, today: true },
  ];

  weakAreas = [
    { icon: '📖', title: 'Part 7 — Reading Comprehension', desc: 'Accuracy เพียง 60% · ฝึก inference questions เพิ่ม', tag: 'ต้องฝึกด่วน', ok: false },
    { icon: '📄', title: 'Part 6 — Context Clues', desc: 'Accuracy 66% · มักพลาดคำที่ต้องอาศัย context ทั้งย่อหน้า', tag: 'ควรปรับปรุง', ok: false },
    { icon: '🎧', title: 'Parts 1–4 — Listening', desc: 'Accuracy 78% · ทำได้ดี ฝึกต่อเนื่องเพื่อรักษาระดับ', tag: 'ทำได้ดี ✅', ok: true },
    { icon: '📝', title: 'Part 5 — Grammar & Vocabulary', desc: 'Accuracy 74% · จุดแข็ง พยายามรักษาให้อยู่เหนือ 80%', tag: 'ค่อนข้างดี ✅', ok: true },
  ];

  achievements: Achievement[] = [
    { icon: '🔥', name: '7-Day Streak', desc: 'ฝึกติดต่อกัน 7 วัน', earned: true },
    { icon: '💯', name: 'Perfect Set', desc: 'ทำถูก 10/10 ใน 1 เซต', earned: true },
    { icon: '📚', name: '100 Questions', desc: 'ทำครบ 100 ข้อ', earned: true },
    { icon: '⚡', name: 'Speed Demon', desc: 'ตอบถูก 5 ข้อภายใน 1 นาที', earned: false },
    { icon: '🏆', name: 'Top 10', desc: 'ติด Top 10 Leaderboard', earned: false },
    { icon: '🌟', name: 'Level 10', desc: 'ถึง Level 10 Master', earned: false },
  ];
}
