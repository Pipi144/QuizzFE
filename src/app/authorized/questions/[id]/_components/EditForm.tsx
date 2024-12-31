"use client";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { TNewQuestionOption, TQuestion } from "@/models/question";
import { useToast } from "@/hooks/use-toast";
import { produce } from "immer";
import { editQuestion } from "../../action";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QuestionOption from "../../_components/QuestionOption";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import QuizAppRoutes from "@/RoutePaths";

type Props = {
  question: TQuestion;
};

const EditForm = ({ question }: Props) => {
  const [questionText, setquestionText] = useState(question.questionText);
  const [allOptions, setAllOptions] = useState<Array<TNewQuestionOption>>(
    question.questionOptions
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const { replace } = useRouter();
  const onCheckAnswerCorrect = useCallback((index: number) => {
    setAllOptions(
      produce((draft) => {
        const itemTarget = draft[index];
        const itemCorrectIdx = draft.findIndex((item) => item.isCorrectAnswer);
        if (itemCorrectIdx !== -1 && itemCorrectIdx !== index) {
          draft[itemCorrectIdx].isCorrectAnswer = false;
        }
        if (itemTarget) itemTarget.isCorrectAnswer = true;

        return draft;
      })
    );
  }, []);
  const onRemoveOption = useCallback((index: number) => {
    setAllOptions(
      produce((draft) => {
        const removedItem = draft[index];
        draft.splice(index, 1);
        if (removedItem.isCorrectAnswer) draft[0].isCorrectAnswer = true;

        return draft;
      })
    );
  }, []);

  const handleUpdateQuestion = async () => {
    try {
      setIsUpdating(true);
      const res = await editQuestion(question.id, questionText, allOptions);
      if (res) {
        toast({
          title: res.errorTitle,
          description: res.errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Question updated successfully",
        });
        replace(QuizAppRoutes.QuestionList);
      }
    } catch (error) {
      toast({
        title: "Failed to add question",
        description: "Unexpected error",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className="flex flex-col w-full overflow-auto custom-scrollbar !text-black bg-white p-3 mt-4 rounded-md">
      <div className="double-field-wrapper !p-0">
        <Label
          htmlFor="question"
          className="label-text !text-sm !text-black mb-2 font-semibold"
        >
          Question
        </Label>
        <Textarea
          id="question"
          placeholder="Question text..."
          value={questionText}
          onChange={(e) => setquestionText(e.target.value)}
          onSubmit={(e) => e.preventDefault()}
          className="w-[calc(100% - 2px)]"
          disabled={isUpdating}
        />
      </div>

      <div className="w-full h-[1px] my-6 bg-slate-300" />
      <div className="flex flex-col w-full">
        <Label className="label-text  !text-sm mb-2 !text-black font-semibold">
          Options
        </Label>
        {allOptions.map((option, index) => (
          <QuestionOption
            option={option}
            index={index}
            onCheckAnswerCorrect={onCheckAnswerCorrect}
            key={index}
            onRemoveOption={onRemoveOption}
          />
        ))}
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setAllOptions(
                produce((draft) => {
                  draft.push({
                    optionText: (e.target as HTMLInputElement).value,
                    isCorrectAnswer: draft.length === 0,
                  });
                })
              );
              (e.target as HTMLInputElement).value = "";
            }
          }}
          disabled={isUpdating}
          placeholder="New option..."
          className="p-0 border-none !outline-none !ring-0 !focus:ring-0 !focus:outline-none"
        />
      </div>

      <Button
        className="self-end min-w-24 bg-black text-white mt-6 flex flex-row items-center"
        onClick={handleUpdateQuestion}
        disabled={isUpdating}
      >
        {isUpdating ? "Updating..." : "Submit"}
        {isUpdating && <Spinner size="small" className="text-white ml-2" />}
      </Button>
    </div>
  );
};

export default EditForm;
