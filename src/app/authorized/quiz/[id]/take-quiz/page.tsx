import React from "react";
import { fetchQuizById } from "../../quizApi";
import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const TakeQuiz = async ({ params }: Props) => {
  const { id } = await params;
  const quizInfo = await fetchQuizById(id);

  if (!quizInfo) throw new Error("Quiz not found");

  return (
    <div className="max-w-2xl flex h-full pt-[80px] flex-col !font-concert text-white mx-auto w-full p-5 items-center">
      <BackButton>Quizzes</BackButton>
      <h1 className="text-3xl">Take Quiz</h1>
      <div className="double-field-wrapper">
        <h3 className="label-text">Quiz name</h3>

        <h3 className="detail-text">{quizInfo.quizName}</h3>
      </div>
      <div className="double-field-wrapper">
        <h3 className="label-text">Number of questions</h3>

        <h3 className="detail-text">{quizInfo.numberOfQuestions}</h3>
      </div>
      <div className="double-field-wrapper">
        <h3 className="label-text">Time limit</h3>

        <h3 className="detail-text">
          {quizInfo.timeLimit
            ? `${quizInfo.timeLimit} minutes`
            : "No time limit"}
        </h3>
      </div>

      <Button className="bg-white text-black hover:bg-white hover:text-black hover:opacity-90 mt-5 min-w-32">
        Start quiz
      </Button>
    </div>
  );
};

export default TakeQuiz;
