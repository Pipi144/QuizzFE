import React from "react";
import { fetchQuizWithFullQuestionsById } from "../../quizApi";
import TakeQuizForm from "./_components/TakeQuizForm";
import TakeQuizProviderWrapper from "./_provider/TakeQuizProvider";

type Props = {
  params: Promise<{
    quizId: string;
  }>;
};

const TakeQuiz = async ({ params }: Props) => {
  const { quizId } = await params;
  const quizInfo = await fetchQuizWithFullQuestionsById(quizId);

  if (!quizInfo) throw new Error("Quiz not found");

  return (
    <TakeQuizProviderWrapper quizInfo={quizInfo}>
      <TakeQuizForm />
    </TakeQuizProviderWrapper>
  );
};

export default TakeQuiz;
