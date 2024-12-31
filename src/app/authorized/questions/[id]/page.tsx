import React from "react";
import EditForm from "./_components/EditForm";
import BackButton from "../../../../components/BackButton";
import { baseAddress } from "@/baseAddress";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import { API_TAG } from "@/utils/apiTags";
import { fetchQuestionById } from "../questionApi";

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
  const questionInfo = await fetchQuestionById(id);

  if (!questionInfo) throw new Error("Question not found");
  return (
    <div className="max-w-2xl flex h-full pt-[80px] flex-col font-concert text-white mx-auto w-full p-5 items-center">
      <BackButton />
      <h1 className="text-3xl">Edit Question</h1>
      <EditForm question={questionInfo} />
    </div>
  );
};

export default EditQuestion;
