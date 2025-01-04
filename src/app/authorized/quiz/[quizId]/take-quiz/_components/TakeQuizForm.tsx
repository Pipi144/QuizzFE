"use client";
import React from "react";
import { useTakeQuizContext } from "../_provider/TakeQuizProvider";
import QuizIntroduction from "./QuizIntroduction";
import QuizProgress from "./QuizProgress";

const TakeQuizForm = () => {
  const { isQuizStart } = useTakeQuizContext();
  return (
    <div className="max-w-2xl flex h-full pt-[80px] flex-col !font-concert text-white mx-auto w-full p-5 items-center">
      {!isQuizStart ? <QuizIntroduction /> : <QuizProgress />}
    </div>
  );
};

export default TakeQuizForm;
