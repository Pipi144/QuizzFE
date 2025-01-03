"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import QuizAppRoutes, { QuizAPIRoutes } from "@/RoutePaths";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { deleteQuiz } from "../../actions";

type Props = {
  quizId: string;
};

const ConfirmDelete = ({ quizId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const onDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await deleteQuiz(quizId);

      if (!res) {
        toast({
          title: "Failed to delete quiz!",
          variant: "destructive",
        });
      } else {
        router.replace(QuizAppRoutes.Quiz);
      }
    } catch (error) {
      console.log("ERROR FAILED ConfirmDelete:", error);
      toast({
        title: "Failed to delete quiz!",
        description: "onDelete failed",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`flex flex-row items-center ${
          isDeleting ? "bg-red-400" : "bg-red-700"
        } text-white font-concert text-base px-4 py-2 rounded-sm mt-5`}
      >
        {isDeleting ? "Deleting..." : "Delete"}
        {isDeleting && <Spinner size="small" className="text-white ml-2" />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this quiz?</AlertDialogTitle>
          <AlertDialogDescription>
            All data belong to this quiz will be deleted permanently, are you
            sure to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
