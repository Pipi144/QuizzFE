import React, { useEffect, useState } from "react";
import { useTakeQuizContext } from "../_provider/TakeQuizProvider";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import AnimatedSpan from "@/components/AnimatedComponents/AnimatedSpan";
import { Variants } from "framer-motion";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import SubmitQuiz from "./SubmitQuiz";

const QuizTimer = () => {
  const {
    timeCountDown,
    setTimeCountDown,
    quizInfo,
    deleteQuizSessionStorage,
  } = useTakeQuizContext();

  const totalTime = quizInfo.timeLimit ? quizInfo.timeLimit * 60 : undefined;
  const percentage =
    totalTime && timeCountDown ? (timeCountDown / totalTime) * 100 : 0;
  const minutes = timeCountDown ? `${Math.floor(timeCountDown / 60)}` : "00";
  const seconds = timeCountDown
    ? `${String(timeCountDown % 60).padStart(2, "0")}`
    : "00";

  const textAnimatedVariants: Variants = {
    initial: {
      color: "#fff",
    },
    timesUp: {
      color: ["#fff", "#f00", "#fff"],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeCountDown((prev) => (prev ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeCountDown]);

  // if user is in the middle of the quiz and tries to close the tab
  // we want to prevent the user from closing the tab

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      event.returnValue =
        "You haven't done the quiz, Are you sure you want to leave?";
    };
    const handleUnload = (event: Event) => {
      event.preventDefault();
      deleteQuizSessionStorage();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
  if (!quizInfo.timeLimit) return null;
  return (
    <div className="w-full items-center justify-between flex mt-4">
      <div className="w-14 h-14 self-start ">
        <CircularProgressbarWithChildren
          value={percentage}
          styles={{
            path: {
              stroke: `white`,
              strokeWidth: "6px", // Thickness of the path
              strokeLinecap: "round", // Rounded ends for the progress path
            },
            trail: {
              stroke: "transparent", // Color of the trail
              strokeWidth: "12px", // Thickness of the trail
              strokeLinecap: "round", // Rounded ends for the trail
            },
            root: {
              padding: 4,
            },
          }}
        >
          <AnimatedSpan
            className=" font-concert text-xs font-medium"
            animate={percentage <= 15 && percentage > 0 ? "timesUp" : "initial"}
            variants={textAnimatedVariants}
          >
            {minutes}:{seconds}
          </AnimatedSpan>
        </CircularProgressbarWithChildren>
      </div>
      <SubmitQuiz />
    </div>
  );
};

export default QuizTimer;
