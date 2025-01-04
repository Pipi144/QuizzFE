"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import QuizTextField from "../../_components/QuizTextField";
import { TQuiz } from "@/models/quiz";
import { TBasicQuestion } from "@/models/question";
import { editQuiz } from "../../actions";
import SelectQuestions from "../../_components/SelectQuestions";
import SelectedQuestion from "../../_components/SelectedQuestion";

type Props = {
  quiz: TQuiz;
};

const EditQuizForm = ({ quiz }: Props) => {
  const [quizName, setquizName] = useState(quiz.quizName);
  const [limitTime, setlimitTime] = useState(quiz.timeLimit?.toString() ?? "");
  const [selectedQuestions, setSelectedQuestions] = useState<
    Array<TBasicQuestion>
  >(quiz.questions);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const { back } = useRouter();
  const handleEditQuiz = async () => {
    try {
      setIsAdding(true);
      const res = await editQuiz({
        quizId: quiz.quizId,
        quizName,
        timeLimit: limitTime,
        questions: selectedQuestions,
      });
      console.log("res", res);
      if (res) {
        toast({
          title: res.errorTitle,
          description: res.errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Quiz updated successfully",
        });
        back();
      }
    } catch (error) {
      console.log("ERROR FAILED EditQuizForm:", error);
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
    <div className="mt-4 w-full rounded-md overflow-auto custom-scrollbar flex flex-col flex-1 !font-concert">
      <div className="double-field-wrapper ">
        <QuizTextField
          labelText="Quiz name"
          id="quizName"
          placeholder="Enter quiz name..."
          name="quizName"
          value={quizName}
          onChange={(e) => setquizName(e.target.value)}
        />

        <QuizTextField
          labelText="Duration (minutes)"
          id="quizDuration"
          placeholder="Time limit of quiz ..."
          name="quizDuration"
          inputMode="numeric"
          type="number"
          value={limitTime}
          onChange={(e) => setlimitTime(e.target.value)}
        />
      </div>
      <div className="double-field-wrapper !items-start">
        <SelectQuestions
          selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestions}
        />

        <div className="flex-col flex space-y-1.5 !font-concert w-full md:w-[45%]">
          <Label>Selected questions</Label>

          {selectedQuestions.map((q, i) => (
            <SelectedQuestion
              key={q.id}
              question={q}
              setSelectedQuestions={setSelectedQuestions}
              index={i}
            />
          ))}
        </div>
      </div>
      <Button
        className="self-end w-full bg-white text-black hover:bg-white hover:text-black hover:opacity-85 mt-6 flex flex-row items-center"
        onClick={handleEditQuiz}
        disabled={isAdding}
      >
        {isAdding ? "Updating..." : "Update"}
        {isAdding && <Spinner size="small" className="text-white ml-2" />}
      </Button>
    </div>
  );
};

export default EditQuizForm;
