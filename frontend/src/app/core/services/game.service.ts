import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Question } from '../models/question.model';
import { SubmitResult } from '../models/game-session.model';
import { User } from '../models/user.model';

const MOCK_QUESTIONS: Question[] = [
  {
    _id: 'mock_1', part: 5, category: 'Preposition', level: 'intermediate',
    tip: 'ใช้ "by" เมื่อหมายถึง "ภายในเวลา" (deadline) เช่น "by Friday" ส่วน "until" ใช้เมื่อกริยาดำเนินต่อเนื่องจนถึงเวลานั้น',
    question: 'The manager asked all employees to submit their monthly reports ______ Friday afternoon.',
    choices: ['until', 'by', 'during', 'within'],
    answer: 1,
    explanation: '"by + time" หมายถึง ภายในเวลา (deadline) — Submit by Friday = ส่งภายในวันศุกร์',
    tags: ['preposition', 'time']
  },
  {
    _id: 'mock_2', part: 5, category: 'Vocabulary', level: 'intermediate',
    tip: '"Mandatory" = บังคับ, "Optional" = ไม่บังคับ, "Voluntary" = สมัครใจ ความแตกต่างนี้ออกสอบบ่อยมาก',
    question: 'Attendance at the safety training session is ______ for all new employees.',
    choices: ['optional', 'voluntary', 'mandatory', 'flexible'],
    answer: 2,
    explanation: '"Mandatory" = บังคับต้องทำ ใช้กับกฎระเบียบหรือนโยบายที่ต้องปฏิบัติตาม',
    tags: ['vocabulary', 'adjective']
  },
  {
    _id: 'mock_3', part: 5, category: 'Grammar', level: 'beginner',
    tip: 'Present Perfect ใช้กับเหตุการณ์ที่เกิดขึ้นในอดีตและมีผลกับปัจจุบัน — มักใช้กับ "already", "yet", "since", "for"',
    question: 'The company ______ its new product line since last month.',
    choices: ['launch', 'launched', 'has launched', 'will launch'],
    answer: 2,
    explanation: '"since last month" บ่งบอกว่าต้องใช้ Present Perfect = "has launched"',
    tags: ['grammar', 'tense']
  },
  {
    _id: 'mock_4', part: 5, category: 'Word Form', level: 'intermediate',
    tip: 'ดูว่าต้องการ noun, verb, adjective หรือ adverb โดยดูจากตำแหน่งในประโยค หลัง "the" ต้องเป็น noun หรือ adjective',
    question: 'The ______ of the new policy will take effect next quarter.',
    choices: ['implement', 'implementing', 'implementation', 'implemented'],
    answer: 2,
    explanation: 'หลัง "The" ต้องการ noun = "implementation" (การนำไปใช้)',
    tags: ['word-form', 'noun']
  },
  {
    _id: 'mock_5', part: 5, category: 'Conjunction', level: 'advanced',
    tip: '"Despite" และ "Although" ต่างกัน — "Despite" ตามด้วย noun/noun phrase ส่วน "Although" ตามด้วย clause (subject + verb)',
    question: '______ the heavy rain, the outdoor event was not cancelled.',
    choices: ['Although', 'Despite', 'Even though', 'Because'],
    answer: 1,
    explanation: '"Despite" + noun phrase ("the heavy rain") — ไม่มี verb หลัง despite จึงต้องใช้ Despite',
    tags: ['conjunction', 'contrast']
  },
  {
    _id: 'mock_6', part: 5, category: 'Vocabulary', level: 'intermediate',
    tip: '"Negotiate" = เจรจาต่อรอง, "Facilitate" = อำนวยความสะดวก, "Mediate" = เป็นตัวกลาง ความหมายใกล้เคียงกันแต่ต่างกัน',
    question: 'The HR manager will ______ the discussion between the two departments.',
    choices: ['negotiate', 'facilitate', 'demonstrate', 'participate'],
    answer: 1,
    explanation: '"Facilitate" = อำนวยความสะดวก / ช่วยให้การประชุมดำเนินไปได้ราบรื่น',
    tags: ['vocabulary', 'verb']
  },
  {
    _id: 'mock_7', part: 5, category: 'Preposition', level: 'beginner',
    tip: '"In charge of" = รับผิดชอบ, "Responsible for" = รับผิดชอบต่อ ทั้งสองตามด้วย noun/gerund',
    question: 'Ms. Johnson is responsible ______ managing the marketing budget.',
    choices: ['to', 'for', 'with', 'of'],
    answer: 1,
    explanation: '"responsible for" = รับผิดชอบต่อ (collocations ที่ต้องจำ)',
    tags: ['preposition', 'collocation']
  },
  {
    _id: 'mock_8', part: 5, category: 'Grammar', level: 'intermediate',
    tip: 'Passive voice: subject + be + past participle. ดูว่า subject เป็น "ผู้กระทำ" หรือ "ผู้ถูกกระทำ"',
    question: 'The annual report ______ by the finance team every December.',
    choices: ['prepares', 'is prepared', 'preparing', 'has prepared'],
    answer: 1,
    explanation: '"The annual report" เป็น object ที่ถูกกระทำ ต้องใช้ Passive voice = "is prepared"',
    tags: ['grammar', 'passive']
  },
  {
    _id: 'mock_9', part: 5, category: 'Vocabulary', level: 'advanced',
    tip: '"Streamline" = ทำให้กระบวนการมีประสิทธิภาพมากขึ้น เป็นคำที่ใช้บ่อยในบริบทธุรกิจ TOEIC',
    question: 'The new software will ______ the company\'s inventory management process.',
    choices: ['complicate', 'streamline', 'abandon', 'duplicate'],
    answer: 1,
    explanation: '"Streamline" = ทำให้กระบวนการมีประสิทธิภาพ / ลดขั้นตอนที่ไม่จำเป็นออก',
    tags: ['vocabulary', 'business']
  },
  {
    _id: 'mock_10', part: 5, category: 'Word Form', level: 'intermediate',
    tip: 'Adverb มักลงท้ายด้วย "-ly" และใช้ขยาย verb หรือ adjective ตรวจสอบตำแหน่งในประโยคเสมอ',
    question: 'The team completed the project ______ ahead of the deadline.',
    choices: ['significant', 'significance', 'significantly', 'signify'],
    answer: 2,
    explanation: '"significantly" เป็น adverb ขยาย "ahead of the deadline" แสดงความมากน้อย',
    tags: ['word-form', 'adverb']
  }
];

@Injectable({ providedIn: 'root' })
export class GameService {
  private api = inject(ApiService);
  private authService = inject(AuthService);

  getQuestions(part?: number, level?: string, limit: number = 10): Observable<Question[]> {
    const params: Record<string, string | number> = { limit };
    if (part) params['part'] = part;
    if (level) params['level'] = level;
    return this.api.get<Question[]>('/questions', params).pipe(
      catchError(() => of(MOCK_QUESTIONS.slice(0, limit)))
    );
  }

  fetchQuestions(part?: number, level?: string, count: number = 10): Observable<Question[]> {
    return this.getQuestions(part, level, count);
  }

  startSession(part?: number, level?: string, count: number = 10) {
    return this.api.post<{ questions: Question[]; sessionStartedAt: string }>('/game/start', {
      part, level, count
    }).pipe(
      catchError(() => of({ questions: MOCK_QUESTIONS.slice(0, count), sessionStartedAt: new Date().toISOString() }))
    );
  }

  submitAnswers(questionIds: string[], answers: number[], part?: number, duration?: number): Observable<SubmitResult> {
    return this.api.post<SubmitResult>('/game/submit', {
      questionIds, answers, part, duration
    }).pipe(
      catchError(() => {
        const correct = answers.filter((a, i) => {
          const q = MOCK_QUESTIONS.find(q => q._id === questionIds[i]);
          return q && q.answer === a;
        }).length;
        const total = questionIds.length;
        const accuracy = Math.round((correct / total) * 100);
        const xpEarned = correct * 10;
        return of({
          correct, total, accuracy, xpEarned,
          sessionId: 'mock_session_' + Date.now(),
          userXp: xpEarned,
          userLevel: 1,
          userStreak: 1
        } as SubmitResult);
      })
    );
  }

  getCurrentUser(): User | null {
    return this.authService.getUser();
  }

  getHistory() {
    return this.api.get<any[]>('/game/history').pipe(
      catchError(() => of([]))
    );
  }
}
