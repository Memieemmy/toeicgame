import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css'
})
export class OnboardingComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  currentStep = signal(1);
  nickname = signal('');
  selectedTarget = signal<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  selectedWeakAreas = signal<string[]>(['Part 5']);

  targets = [
    { value: 'beginner' as const, icon: '🌱', name: 'Beginner', score: 'เป้าหมาย 400–500 คะแนน · เริ่มต้นจากพื้นฐาน', badge: 'Beginner', badgeClass: 'badge-beginner' },
    { value: 'intermediate' as const, icon: '📈', name: 'Intermediate', score: 'เป้าหมาย 500–700 คะแนน · พัฒนาทักษะอย่างต่อเนื่อง', badge: 'Popular ⭐', badgeClass: 'badge-intermediate' },
    { value: 'advanced' as const, icon: '🔥', name: 'Advanced', score: 'เป้าหมาย 700–900 คะแนน · สำหรับผู้มีพื้นฐานดี', badge: 'Advanced', badgeClass: 'badge-advanced' },
  ];

  weakAreas = [
    { value: 'Part 5', title: 'Part 5 — Incomplete Sentences', desc: 'คำศัพท์, Grammar, Word Form, Collocation' },
    { value: 'Part 6', title: 'Part 6 — Text Completion', desc: 'เติมคำในบทความสั้น ทั้ง Grammar และ Context' },
    { value: 'Part 7', title: 'Part 7 — Reading Comprehension', desc: 'อ่านบทความ, อีเมล, โฆษณา แล้วตอบคำถาม' },
    { value: 'Listening', title: 'Parts 1–4 — Listening', desc: 'ฟังภาพ, บทสนทนา, Short Talk และ Long Conversation' },
  ];

  nicknameValid = computed(() => this.nickname().trim().length >= 3);

  goStep(n: number) {
    if (n === 2 && !this.nicknameValid()) return;
    this.currentStep.set(n);
  }

  selectTarget(value: 'beginner' | 'intermediate' | 'advanced') {
    this.selectedTarget.set(value);
  }

  toggleWeakArea(value: string) {
    const current = this.selectedWeakAreas();
    if (current.includes(value)) {
      this.selectedWeakAreas.set(current.filter(v => v !== value));
    } else {
      this.selectedWeakAreas.set([...current, value]);
    }
  }

  isWeakSelected(value: string): boolean {
    return this.selectedWeakAreas().includes(value);
  }

  confirm() {
    this.auth.createDemoUser(
      this.nickname().trim(),
      this.selectedTarget(),
      this.selectedWeakAreas()
    );
    this.router.navigate(['/dashboard']);
  }
}
