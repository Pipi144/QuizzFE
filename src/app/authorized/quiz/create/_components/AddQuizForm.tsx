"use client";
import React, { useState } from "react";
import AddQuizTextField from "./AddQuizTextField";
import { TBasicQuestion } from "@/models/question";
import SelectQuestions from "./SelectQuestions";

type Props = {};

const AddQuizForm = (props: Props) => {
  const [selectedQuestions, setSelectedQuestions] = useState<
    Array<TBasicQuestion>
  >([]);

  return (
    <form className="mt-4 w-full rounded-md overflow-auto custom-scrollbar flex flex-col flex-1">
      <div className="double-field-wrapper !items-start">
        <div className="flex flex-col w-[45%]">
          <AddQuizTextField
            labelText="Quiz name"
            id="quizName"
            placeholder="Enter quiz name..."
            name="quizName"
          />

          <AddQuizTextField
            labelText="Duration (seconds)"
            id="quizDuration"
            placeholder="Time limit of quiz ..."
            name="quizDuration"
            inputMode="numeric"
            type="number"
          />
        </div>

        <div className="flex flex-col w-[45%]">
          <SelectQuestions
            selectedQuestions={selectedQuestions}
            setSelectedQuestions={setSelectedQuestions}
          />
        </div>
      </div>
    </form>
  );
};

export default AddQuizForm;
