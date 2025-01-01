import { TBasicQuestion } from "@/models/question";
import { produce } from "immer";
import React, { memo } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  setSelectedQuestions: React.Dispatch<React.SetStateAction<TBasicQuestion[]>>;
  question: TBasicQuestion;
  index: number;
};

const SelectedQuestion = ({ setSelectedQuestions, question, index }: Props) => {
  return (
    <div className="flex w-full text-sm text-white my-1 items-center">
      <span className="flex-1 max-w-full truncate">
        {index + 1}. {question.questionText}
      </span>

      <IoClose
        className="text-white text-base cursor-pointer"
        onClick={() => {
          setSelectedQuestions(
            produce((draft) => {
              draft.splice(index, 1);
            })
          );
        }}
      />
    </div>
  );
};

export default memo(SelectedQuestion);
