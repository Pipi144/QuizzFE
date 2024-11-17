import { TUser } from "./user";

export type TQuestion = {
  id: string;
  questionText: string;
  createdByUser: TUser;
  questionOptions: TQuestionOptions[];
};

export type TQuestionOptions = {
  id: string;
  optionText: string;
  isCorrectAnswer: boolean;
  questionId: string;
};
