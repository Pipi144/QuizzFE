"use client";
import BackButton from "@/components/BackButton";
import React from "react";
import { useTakeQuizContext } from "../_provider/TakeQuizProvider";
import { Button } from "@/components/ui/button";

const QuizIntroduction = () => {
  const { quizInfo, setIsQuizStart } = useTakeQuizContext();
  return (
    <>
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

      <Button
        onClick={() => setIsQuizStart(true)}
        className="bg-white text-black hover:bg-white hover:text-black hover:opacity-90 mt-5 min-w-32"
      >
        Start quiz
      </Button>
    </>
  );
};

export default QuizIntroduction;
