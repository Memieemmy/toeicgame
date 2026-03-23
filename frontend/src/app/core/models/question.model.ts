export interface Question {
  _id: string;
  part: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tip: string;
  passage?: string;     // เพิ่ม — สำหรับ Part 6, 7
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  tags: string[];
}
