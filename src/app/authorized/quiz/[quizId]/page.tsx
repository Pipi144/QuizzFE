import React from "react";
import EditQuizForm from "./_components/EditQuizForm";
import BackButton from "../../../../components/BackButton";
import { fetchQuizById } from "../quizApi";

export type TUpdateUserState = {
  nickName?: string;
  name?: string;
  errorName?: string[];
  errorServer?: string[];
};
type EditUserProps = {
  params: Promise<{
    quizId: string;
  }>;
};

const EditQuiz = async ({ params }: EditUserProps) => {
  const { quizId } = await params;
  const quizInfo = await fetchQuizById(quizId);

  if (!quizInfo) throw new Error("Quiz not found");
  return (
    <div className="max-w-2xl flex h-full pt-[80px] flex-col font-concert text-white mx-auto w-full p-5 items-center">
      <BackButton>Quizzes</BackButton>
      <h1 className="text-3xl">Edit Quiz</h1>
      <EditQuizForm quiz={quizInfo} />
    </div>
  );
};

export default EditQuiz;
