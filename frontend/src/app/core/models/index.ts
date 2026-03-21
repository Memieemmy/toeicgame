export type { User } from './user.model';
export type { Question } from './question.model';
export type { GameSession, SubmitResult } from './game-session.model';

export interface LeaderboardEntry {
  rank: number;
  nickname: string;
  xp: number;
  level: number;
  accuracy: number;
  targetScore?: string;
}
