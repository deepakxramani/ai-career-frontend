// ─── Interview Step Machine ─────────────────────────────────────
export type InterviewStep = 'setup' | 'questions' | 'interview' | 'completed';

// ─── Setup ──────────────────────────────────────────────────────
export type ExperienceLevel = 'Fresher' | 'Junior' | 'Mid-Level' | 'Senior';

export interface InterviewSetup {
  role: string;
  experience: ExperienceLevel;
  resumeText: string;
}

// ─── Generated Questions ────────────────────────────────────────
export interface GeneratedQuestions {
  technical_questions: string[];
  hr_questions: string[];
  coding_questions: string[];
}

export type QuestionCategory = 'Technical' | 'HR' | 'Coding';

export interface InterviewQuestion {
  text: string;
  category: QuestionCategory;
}

// ─── Chat ───────────────────────────────────────────────────────
export interface ChatResponse {
  feedback: string;
  score: number;
  next_question: string;
}

export interface InterviewMessage {
  user: string;
  ai: ChatResponse;
}

// ─── History ────────────────────────────────────────────────────
export interface InterviewSession {
  _id: string;
  userId: string;
  role: string;
  messages: InterviewMessage[];
  createdAt: string;
  updatedAt: string;
}
