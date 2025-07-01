
export interface Problem {
  _id: string;
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  category: string[];
  constraints: string[];
  examples: ProblemExample[];
  starterCode: Record<SupportedLanguage, string>;
  solutionCode: Record<SupportedLanguage, string>;
  hints: string[];
  timeLimit: number; // in milliseconds
  memoryLimit: number; // in MB
  likes: number;
  submissions: number;
  successRate: number;
  createdAt: string;
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export type SupportedLanguage = 'javascript' | 'python' | 'java' | 'cpp' | 'rust';

export interface TestCase {
  input: string;
  output: string;
  hidden: boolean;
}

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: SupportedLanguage;
  status: 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'memory_limit_exceeded' | 'runtime_error' | 'compilation_error';
  runtime: number;
  memory: number;
  submittedAt: string;
}
