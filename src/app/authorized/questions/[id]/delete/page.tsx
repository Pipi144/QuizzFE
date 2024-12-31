import React from "react";
import BackButton from "../_components/BackButton";
import ConfirmDelete from "../_components/ConfirmDelete";
import { fetchQuestionById } from "../../questionApi";

type Props = {
  params: Promise<{ id: string }>;
};

const DeleteUser = async ({ params }: Props) => {
  const { id } = await params;
  const questionInfo = await fetchQuestionById(id);

  if (!questionInfo) throw new Error("Question not found");
  return (
    <div className="max-w-lg flex h-full pt-[80px] flex-col font-concert text-white mx-auto w-full p-5 items-center">
      <BackButton />
      <h1 className="text-3xl my-5">Delete Question</h1>

      <div className="double-field-wrapper">
        <h3 className="label-text">Question</h3>

        <h3 className="detail-text">{questionInfo.questionText}</h3>
      </div>

      <ConfirmDelete questionId={id} />
    </div>
  );
};

export default DeleteUser;
