import React from "react";
import { fetchQuizById, fetchQuizWithFullQuestionsById } from "../../quizApi";
import TakeQuizForm from "./_components/TakeQuizForm";
import TakeQuizProviderWrapper from "./_provider/TakeQuizProvider";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const TakeQuiz = async ({ params }: Props) => {
  const { id } = await params;
  const quizInfo = await fetchQuizWithFullQuestionsById(id);

  if (!quizInfo) throw new Error("Quiz not found");

  return (
    <TakeQuizProviderWrapper quizInfo={quizInfo}>
      <TakeQuizForm />
    </TakeQuizProviderWrapper>
  );
};

export default TakeQuiz;
