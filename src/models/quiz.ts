import { TBasicQuestion } from "./question";

export type TBasicQuiz = {
  quizId: string;
  numberOfQuestions: number;
  quizName: string;
  timeLimit: number;
  createdAt: string;
};

export type TQuiz = TBasicQuiz & {
  questions: TBasicQuestion[];
};
