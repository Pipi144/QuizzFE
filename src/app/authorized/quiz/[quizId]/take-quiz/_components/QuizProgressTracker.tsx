"use client";
import React from "react";
import { useTakeQuizContext } from "../_provider/TakeQuizProvider";
import ProgressBar from "@ramonak/react-progress-bar";

const QuizProgressTracker = () => {
  const { quizInfo, currentQuestionIdx } = useTakeQuizContext();
  const completedPercentage =
    ((currentQuestionIdx + 1) / quizInfo.numberOfQuestions) * 100;
  return (
    <ProgressBar
      completed={completedPercentage}
      baseBgColor="white"
      bgColor="black"
      customLabel={`${currentQuestionIdx + 1}/${quizInfo.numberOfQuestions}`}
      labelClassName="quiz-progress-bar-label"
      height="18px"
      transitionDuration="0.5s"
      labelAlignment="center"
      className="border-[0.5px] border-solid border-white rounded-full"
    />
  );
};

export default QuizProgressTracker;
