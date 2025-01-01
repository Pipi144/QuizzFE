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
    id: string;
  }>;
};

const EditQuestion = async ({ params }: EditUserProps) => {
  const { id } = await params;
  const quizInfo = await fetchQuizById(id);

  if (!quizInfo) throw new Error("Question not found");
  return (
    <div className="max-w-2xl flex h-full pt-[80px] flex-col font-concert text-white mx-auto w-full p-5 items-center">
      <BackButton>Quizzes</BackButton>
      <h1 className="text-3xl">Edit Quiz</h1>
      <EditQuizForm quiz={quizInfo} />
    </div>
  );
};

export default EditQuestion;
