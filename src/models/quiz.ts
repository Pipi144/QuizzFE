import { TBasicQuestion, TQuestion } from "./question";

export type TBasicQuiz = {
  quizId: string;
  numberOfQuestions: number;
  quizName: string;
  timeLimit: number | null;
  createdAt: string;
};

export type TQuiz = TBasicQuiz & {
  questions: TBasicQuestion[];
};

export type TQuizFullQuestions = TBasicQuiz & {
  questions: TQuestion[];
};

export type TQuizAnswer = {
  questionId: string;
  selectedOptionId: string | null; // null represents unanswered
};

export type TQuizAttempt = {
  id: number;
  score: number;
  createdAt: string;
  attemptByUserId: string;
  quizId: number;
  quizName: string;
  totalQuestions: number;
  correctAnswers: number;
};
