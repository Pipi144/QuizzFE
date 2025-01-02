export type TBasicQuestion = {
  id: string;
  questionText: string;
  createdAt: string;
};
export type TQuestion = TBasicQuestion & {
  questionOptions: TQuestionOptions[];
};

export type TNewQuestionOption = {
  optionText: string;
  isCorrectAnswer: boolean;
};

export type TBasicQuestionOption = {
  id: string;
  optionText: string;
};
export type TQuestionOptions = TBasicQuestionOption &
  TNewQuestionOption & {
    id: string;

    questionId: string;
    optionText: string;
  };
