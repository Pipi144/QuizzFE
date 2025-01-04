import BackButton from "@/components/BackButton";
import React from "react";
import AddQuizForm from "./_components/AddQuizForm";

const CreateQuiz = () => {
  return (
    <div className="max-w-2xl flex h-full pt-[80px] flex-col font-concert text-white mx-auto w-full p-5 items-center">
      <BackButton>Quizzes</BackButton>
      <h1 className="text-3xl">Create Quiz</h1>
      <AddQuizForm />
    </div>
  );
};

export default CreateQuiz;
