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
