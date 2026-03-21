export interface Question {
  _id: string;
  part: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tip: string;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  tags: string[];
}
