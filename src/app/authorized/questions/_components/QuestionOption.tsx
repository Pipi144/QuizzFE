import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TNewQuestionOption } from "@/models/question";
import React, { memo } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  option: TNewQuestionOption;
  index: number;
  onCheckAnswerCorrect: (index: number) => void;
  onRemoveOption: (index: number) => void;
};

const QuestionOption = ({
  option,
  index,
  onCheckAnswerCorrect,
  onRemoveOption,
}: Props) => {
  return (
    <div
      className="my-1 flex items-center cursor-pointer p-1"
      onClick={() => onCheckAnswerCorrect(index)}
    >
      <Checkbox
        id={`option#${index}`}
        checked={option.isCorrectAnswer}
        className="ml-1"
      />
      <Label
        htmlFor={`option#${index}`}
        className={`ml-2 text-sm ${
          option.isCorrectAnswer ? "font-medium" : "font-light"
        } leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pointer-events-none`}
      >
        {option.optionText}
      </Label>

      <IoMdClose
        className="text-black text-lg ml-auto cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onRemoveOption(index);
        }}
      />
    </div>
  );
};

export default memo(QuestionOption);
