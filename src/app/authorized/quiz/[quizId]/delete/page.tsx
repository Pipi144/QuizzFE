import React from "react";
import BackButton from "../../../../../components/BackButton";
import ConfirmDelete from "../_components/ConfirmDelete";
import { fetchQuizById } from "../../quizApi";

type Props = {
  params: Promise<{ quizId: string }>;
};

const DeleteUser = async ({ params }: Props) => {
  const { quizId } = await params;
  const quizInfo = await fetchQuizById(quizId);

  if (!quizInfo) throw new Error("Question not found");
  return (
    <div className="max-w-lg flex h-full pt-[80px] flex-col font-concert text-white mx-auto w-full p-5 items-center">
      <BackButton />
      <h1 className="text-3xl my-5">Delete Quiz</h1>

      <div className="double-field-wrapper">
        <h3 className="label-text">Quiz name</h3>

        <h3 className="detail-text">{quizInfo.quizName}</h3>
      </div>
      <div className="double-field-wrapper">
        <h3 className="label-text">Number of questions</h3>

        <h3 className="detail-text">{quizInfo.numberOfQuestions}</h3>
      </div>

      <ConfirmDelete quizId={quizId} />
    </div>
  );
};

export default DeleteUser;
