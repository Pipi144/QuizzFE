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
import { DialogDescription } from "@radix-ui/react-dialog";
import React, { useState } from "react";

type Props = {};

const AddQuestions = (props: Props) => {
  const [showAddQuestion, setshowAddQuestion] = useState(false);
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
        <form>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question" className="text-right">
              Question
            </Label>
            <Input
              id="question"
              placeholder="Question text..."
              className="col-span-3"
              multiple={true}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestions;
