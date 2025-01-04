import React from "react";
import QuizProgressTracker from "./QuizProgressTracker";
import QuizTimer from "./QuizTimer";
import { useTakeQuizContext } from "../_provider/TakeQuizProvider";
import QuestionOption from "./QuestionOption";
import { Button } from "@/components/ui/button";

const QuizProgress = () => {
  const { quizInfo, currentQuestionIdx, switchQuestion } = useTakeQuizContext();
  const currentQuestion = quizInfo.questions[currentQuestionIdx];
  return (
    <div className="w-full h-full flex flex-col">
      <QuizProgressTracker />
      <QuizTimer />
      <h1 className="text-2xl font-bold text-white my-5 text-center max-w-[80%] mx-auto break-words">
        Q{currentQuestionIdx + 1}: {currentQuestion.questionText}
      </h1>
      <div className="flex flex-col flex-shrink-1 w-full overflow-auto custom-scrollbar">
        {currentQuestion.questionOptions.map((o) => (
          <QuestionOption
            option={o}
            questionId={currentQuestion.id}
            key={o.id}
          />
        ))}
      </div>
      <div className="double-field-wrapper mt-5 !justify-center">
        <Button
          disabled={currentQuestionIdx === 0}
          onClick={() => switchQuestion("prev")}
          className="bg-white hover:bg-white text-black hover:text-black mx-2 hover:bg-opacity-85"
        >
          Prev
        </Button>
        <Button
          onClick={() => switchQuestion("next")}
          disabled={currentQuestionIdx === quizInfo.numberOfQuestions - 1}
          className="bg-white hover:bg-white text-black hover:text-black mx-2 hover:bg-opacity-85"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default QuizProgress;
