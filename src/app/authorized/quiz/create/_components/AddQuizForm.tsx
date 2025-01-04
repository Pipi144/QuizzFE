"use client";
import React, { useState } from "react";
import QuizTextField from "../../_components/QuizTextField";
import { TBasicQuestion } from "@/models/question";
import SelectQuestions from "../../_components/SelectQuestions";
import { Label } from "@/components/ui/label";
import SelectedQuestion from "../../_components/SelectedQuestion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { addQuiz } from "../../actions";
import { useRouter } from "next/navigation";

const AddQuizForm = () => {
  const [quizName, setquizName] = useState("");
  const [limitTime, setlimitTime] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<
    Array<TBasicQuestion>
  >([]);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const { back } = useRouter();
  const handleAddQuiz = async () => {
    try {
      setIsAdding(true);
      const res = await addQuiz({
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
          description: "Question added successfully",
        });
        back();
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
        className="!float-right !self-end w-full bg-white text-black hover:bg-white hover:text-black hover:opacity-85 mt-6 flex flex-row items-center"
        onClick={handleAddQuiz}
        disabled={isAdding}
      >
        {isAdding ? "Submitting..." : "Submit"}
        {isAdding && <Spinner size="small" className="text-white ml-2" />}
      </Button>
    </div>
  );
};

export default AddQuizForm;
