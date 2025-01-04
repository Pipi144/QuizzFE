import LoaderOverlay from "@/components/LoaderOverlay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { submitQuiz } from "../../../actions";
import { useTakeQuizContext } from "../_provider/TakeQuizProvider";
import ConfirmDialog from "@/components/ConfirmDialog";
import QuizAppRoutes from "@/RoutePaths";

const SubmitQuiz = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmSubmit, setshowConfirmSubmit] = useState(false);

  const [showDialogTimesUp, setshowDialogTimesUp] = useState(false);
  const { quizInfo, answers, deleteQuizSessionStorage, timeCountDown } =
    useTakeQuizContext();
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async () => {
    try {
      deleteQuizSessionStorage();
      setshowConfirmSubmit(false);
      setIsSubmitting(true);
      const res = await submitQuiz({ quizId: quizInfo.quizId, answers });

      if ("id" in res) {
        router.replace(
          `${QuizAppRoutes.Quiz}/${quizInfo.quizId}/take-quiz/${res.id}`
        );
      } else {
        toast({
          title: "Failed to submit quiz!",

          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("ERROR FAILED SubmitQuiz:", error);
      toast({
        title: "Failed to delete quiz!",
        description: "onDelete failed",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (quizInfo.timeLimit && timeCountDown !== null && timeCountDown <= 0) {
      setshowDialogTimesUp(true);
    }
  }, [quizInfo.timeLimit, timeCountDown]);

  return (
    <>
      <Button
        onClick={() => setshowConfirmSubmit(true)}
        className="bg-white text-black hover:bg-white hover:text-black"
      >
        Finish
      </Button>
      <ConfirmDialog
        title="Are you sure you want to submit the quiz?"
        description="You can't change your answers after submitting the quiz."
        open={showConfirmSubmit}
        onOpenChange={setshowConfirmSubmit}
        footerContent={
          <div className="flex justify-end">
            <Button
              onClick={() => setshowConfirmSubmit(false)}
              className="bg-white text-black hover:bg-white hover:text-black border-black border-[1px] border-solid"
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              className="bg-black text-white hover:bg-black ml-3"
            >
              Submit
            </Button>
          </div>
        }
      />
      <ConfirmDialog
        open={showDialogTimesUp}
        onOpenChange={(open) => {
          setshowDialogTimesUp(open);

          if (!open) onSubmit();
        }}
        title="Time's up!"
        description="You have run out of time!"
        footerContent={
          <Button
            className="bg-black text-white hover:bg-black ml-3"
            onClick={() => {
              onSubmit();
              setshowDialogTimesUp(false);
            }}
          >
            Submit
          </Button>
        }
      />
      <LoaderOverlay isOpen={isSubmitting} backdrop="blur" />
    </>
  );
};

export default SubmitQuiz;
