"use client";
import React from "react";
import { useTakeQuizContext } from "../_provider/TakeQuizProvider";
import ProgressBar from "@ramonak/react-progress-bar";
type Props = {};

const QuizProgressTracker = (props: Props) => {
  const { quizInfo, currentQuestionIdx } = useTakeQuizContext();
  const completedPercentage =
    (currentQuestionIdx + 1 / quizInfo.numberOfQuestions) * 100;
  return (
    <ProgressBar
      completed={completedPercentage}
      baseBgColor="white"
      bgColor="black"
      customLabel={`${currentQuestionIdx + 1}/${quizInfo.numberOfQuestions}`}
      labelClassName="quiz-progress-bar-label"
      height="14px"
      transitionDuration="0.5s"
    />
  );
};

export default QuizProgressTracker;
