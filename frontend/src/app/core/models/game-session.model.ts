export interface GameSession {
  _id: string;
  userId: string;
  part: number;
  questions: string[];
  answers: number[];
  score: number;
  xpEarned: number;
  duration: number;
  completedAt: string;
}

export interface SubmitResult {
  correct: number;
  total: number;
  accuracy: number;
  xpEarned: number;
  sessionId: string;
  userXp: number;
  userLevel: number;
  userStreak: number;
}
