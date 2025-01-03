import { TBasicQuestionOption } from "@/models/question";
import React, { memo } from "react";
import { useTakeQuizContext } from "../_provider/TakeQuizProvider";
import { produce } from "immer";
import { cn } from "@/lib/utils";

type Props = {
  questionId: string;
  option: TBasicQuestionOption;
};

const QuestionOption = ({ questionId, option }: Props) => {
  const { setAnswers, answers, switchQuestion } = useTakeQuizContext();
  const selectOption = () => {
    setAnswers(
      produce((draft) => {
        const foundQuestion = draft.find(
          (question) => question.questionId === questionId
        );
        if (foundQuestion) {
          foundQuestion.selectedOptionId = option.id;
        }
        return draft;
      })
    );
    switchQuestion("next");
  };
  const isSelected = answers.find(
    (a) => a.questionId === questionId && a.selectedOptionId === option.id
  );

  return (
    <div
      onClick={selectOption}
      className={cn([
        "text-center my-1 min-w-48 max-w-full cursor-pointer text-white font-concert text-base border-white rounded-full border-[1px] px-2 py-1 hover:bg-slate-50 hover:text-black hover:bg-opacity-40 transition-all ease-linear duration-200",
        isSelected && "bg-white text-black",
      ])}
    >
      {option.optionText}
    </div>
  );
};

export default memo(QuestionOption);
