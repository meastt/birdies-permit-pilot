
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  QUIZ = 'QUIZ',
  STAT_LAB = 'STAT_LAB',
  MOCK_EXAM = 'MOCK_EXAM',
  HANDBOOK = 'HANDBOOK',
  EXAM_REVIEW = 'EXAM_REVIEW'
}

export enum Difficulty {
  WARMUP = 'WARMUP',
  CORE = 'CORE',
  EXPERT = 'EXPERT'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  difficulty: Difficulty;
  category: string;
  scenario?: string;
  handbookRef?: string;
}

export interface QuizResult {
  date: string;
  score: number;
  total: number;
  missedQuestions: string[]; // IDs
  isMock: boolean;
}

export interface UserStats {
  completedMilestones: string[];
  totalQuestionsAnswered: number;
  correctAnswers: number;
  history: QuizResult[];
}

export interface Milestone {
  id: string;
  name: string;
  section: string;
  difficulty: Difficulty;
  requiredScore: number;
}
