import React, { useEffect } from "react";
import { useTakeQuizContext } from "../_provider/TakeQuizProvider";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import AnimatedSpan from "@/components/AnimatedComponents/AnimatedSpan";
import { Variants } from "framer-motion";

type Props = {};

const QuizTimer = (props: Props) => {
  const { timeCountDown, setTimeCountDown, quizInfo } = useTakeQuizContext();

  const totalTime = quizInfo.timeLimit ? quizInfo.timeLimit * 60 : undefined;
  const percentage =
    totalTime && timeCountDown ? (timeCountDown / totalTime) * 100 : 0;
  const minutes = timeCountDown ? `${Math.floor(timeCountDown / 60)}` : "00";
  const seconds = timeCountDown ? `${timeCountDown % 60}` : "00";

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

  if (!quizInfo.timeLimit) return null;
  return (
    <div className="w-14 h-14 self-end mt-4">
      <CircularProgressbarWithChildren
        value={percentage}
        styles={{
          path: {
            stroke: `white`,
            strokeWidth: "10px", // Thickness of the path
            strokeLinecap: "round", // Rounded ends for the progress path
          },
          trail: {
            stroke: "transparent", // Color of the trail
            strokeWidth: "16px", // Thickness of the trail
            strokeLinecap: "round", // Rounded ends for the trail
          },
        }}
      >
        <AnimatedSpan
          className=" font-concert text-sm font-medium"
          animate={percentage <= 15 && percentage > 0 ? "timesUp" : "initial"}
          variants={textAnimatedVariants}
        >
          {minutes}:{seconds}
        </AnimatedSpan>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default QuizTimer;
