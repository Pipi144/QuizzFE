export type TBasicQuestion = {
  id: string;
  questionText: string;
};
export type TQuestion = TBasicQuestion & {
  questionOptions: TQuestionOptions[];
};

export type TQuestionOptions = {
  id: string;
  optionText: string;
  isCorrectAnswer: boolean;
  questionId: string;
};
