export interface User {
  _id: string;
  nickname: string;
  email?: string;
  level: number;
  xp: number;
  streak: number;
  lastPlayedDate?: string;
  targetScore: 'beginner' | 'intermediate' | 'advanced';
  weakAreas: string[];
  totalQuestions: number;
  correctAnswers: number;
  createdAt?: string;
}
