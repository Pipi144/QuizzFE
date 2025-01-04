"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogDescription } from "@radix-ui/react-dialog";
import React, { useCallback, useState } from "react";
import { produce } from "immer";
import { TNewQuestionOption } from "@/models/question";
import QuestionOption from "./QuestionOption";
import { useToast } from "@/hooks/use-toast";
import { addQuestion } from "../action";
import { Spinner } from "@/components/ui/spinner";

const AddQuestions = () => {
  const [showAddQuestion, setshowAddQuestion] = useState(false);
  const [questionText, setquestionText] = useState("");
  const [allOptions, setAllOptions] = useState<Array<TNewQuestionOption>>([]);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
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

  const handleAddQuestion = async () => {
    try {
      setIsAdding(true);
      const res = await addQuestion(questionText, allOptions);
      if (res) {
        toast({
          title: res.errorTitle,
          description: res.errorMessage,
          variant: "destructive",
        });
      } else {
        setAllOptions([]);
        setquestionText("");
        toast({
          title: "Success",
          description: "Question added successfully",
        });
      }
    } catch (error) {
      console.log("ERROR FAILED AddQuestions:", error);
      toast({
        title: "Failed to add question",
        description: "Unexpected error",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <Dialog
      open={showAddQuestion}
      onOpenChange={(open) => setshowAddQuestion(open)}
    >
      <DialogTrigger asChild>
        <Button
          className="bg-white text-black ml-auto hover:bg-white hover:opacity-80 hover:text-black"
          onClick={() => setshowAddQuestion(true)}
        >
          Add questions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>

          <DialogDescription className="text-opacity-20 text-xs">
            Add a question to the list of questions
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full overflow-auto custom-scrollbar">
          <div className="double-field-wrapper !p-0">
            <Label
              htmlFor="question"
              className="label-text !text-black !text-sm font-semibold"
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
            />
          </div>

          <div className="w-full h-[1px] my-6 bg-slate-300" />
          <div className="flex flex-col w-full">
            <Label className="label-text !text-black !text-sm mb-2 font-semibold">
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
              placeholder="New option..."
              className="p-0 border-none !outline-none !ring-0 !focus:ring-0 !focus:outline-none"
            />
          </div>

          <Button
            className="w-full bg-black text-white mt-6 flex flex-row items-center"
            onClick={handleAddQuestion}
            disabled={isAdding}
          >
            {isAdding ? "Submitting..." : "Submit"}
            {isAdding && <Spinner size="small" className="text-white ml-2" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestions;
