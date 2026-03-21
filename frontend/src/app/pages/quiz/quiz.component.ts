import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService } from '../../core/services/game.service';
import { AuthService } from '../../core/services/auth.service';
import { Question } from '../../core/models/question.model';
import { SubmitResult } from '../../core/models/game-session.model';

type QuizState = 'loading' | 'playing' | 'answered' | 'result' | 'error';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit, OnDestroy {
  private game = inject(GameService);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);

  state = signal<QuizState>('loading');
  questions = signal<Question[]>([]);
  currentIndex = signal(0);
  selectedChoice = signal<number | null>(null);
  answers = signal<number[]>([]);
  timerSeconds = signal(180); // 3 minutes
  result = signal<SubmitResult | null>(null);

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  totalQuestions = computed(() => this.questions().length);
  progressPct = computed(() =>
    this.totalQuestions() > 0
      ? Math.round(((this.currentIndex()) / this.totalQuestions()) * 100)
      : 0
  );
  timerDisplay = computed(() => {
    const s = this.timerSeconds();
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  });
  timerWarning = computed(() => this.timerSeconds() < 30);

  letters = ['A', 'B', 'C', 'D'];

  ngOnInit() {
    const part = this.route.snapshot.queryParamMap.get('part');
    this.loadQuestions(part ? parseInt(part) : 5);
  }

  loadQuestions(part: number = 5) {
    this.state.set('loading');
    this.game.getQuestions(part, undefined, 10).subscribe({
      next: (qs) => {
        this.questions.set(qs);
        this.currentIndex.set(0);
        this.selectedChoice.set(null);
        this.answers.set([]);
        this.state.set('playing');
        this.startTimer();
      },
      error: () => {
        this.state.set('error');
      }
    });
  }

  startTimer() {
    this.timerSeconds.set(180);
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      const s = this.timerSeconds();
      if (s <= 0) {
        this.clearTimer();
        // Auto-confirm with no answer if time runs out
        if (this.state() === 'playing') {
          this.selectedChoice.set(-1);
          this.confirmAnswer();
        }
      } else {
        this.timerSeconds.set(s - 1);
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  selectChoice(index: number) {
    if (this.state() !== 'playing') return;
    this.selectedChoice.set(index);
  }

  confirmAnswer() {
    if (this.state() !== 'playing') return;
    const chosen = this.selectedChoice();
    if (chosen === null) return;
    this.clearTimer();
    this.answers.update(prev => [...prev, chosen === -1 ? -1 : chosen]);
    this.state.set('answered');
  }

  isCorrect(index: number): boolean {
    return index === this.currentQuestion()?.answer;
  }

  isWrong(index: number): boolean {
    const sel = this.selectedChoice();
    return sel === index && index !== this.currentQuestion()?.answer;
  }

  nextQuestion() {
    const next = this.currentIndex() + 1;
    if (next >= this.totalQuestions()) {
      this.submitAll();
    } else {
      this.currentIndex.set(next);
      this.selectedChoice.set(null);
      this.state.set('playing');
      this.startTimer();
    }
  }

  submitAll() {
    this.state.set('loading');
    const qIds = this.questions().map(q => q._id);
    const ans = this.answers();
    this.game.submitAnswers(qIds, ans, this.currentQuestion()?.part).subscribe({
      next: (res) => {
        this.result.set(res);
        this.state.set('result');
        // Update user XP in local storage
        const user = this.auth.getUser();
        if (user) {
          user.xp = (user.xp || 0) + res.xpEarned;
          user.totalQuestions = (user.totalQuestions || 0) + res.total;
          user.correctAnswers = (user.correctAnswers || 0) + res.correct;
          user.streak = res.userStreak || user.streak;
          user.level = res.userLevel || user.level;
          this.auth.saveUser(user);
        }
      },
      error: () => this.state.set('error')
    });
  }

  getScoreGrade(): string {
    const r = this.result();
    if (!r) return '';
    const pct = r.accuracy;
    if (pct >= 90) return '🏆 ยอดเยี่ยม!';
    if (pct >= 70) return '🎉 ดีมาก!';
    if (pct >= 50) return '👍 พอใช้ได้';
    return '💪 ฝึกต่อไป!';
  }

  ngOnDestroy() {
    this.clearTimer();
  }
}
