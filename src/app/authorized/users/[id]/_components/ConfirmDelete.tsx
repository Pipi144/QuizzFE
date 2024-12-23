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

type Props = {
  userId: string;
};

const ConfirmDelete = ({ userId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const onDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch(QuizAPIRoutes.DeleteUser, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const respJson = await res.json();
        toast({
          title: "Failed to delete user!",
          description: respJson.message ?? "Unknown error",
          variant: "destructive",
        });
      } else router.replace(QuizAppRoutes.Users);
    } catch (error) {
      console.log("ERROR FAILED ConfirmDelete:", error);
      toast({
        title: "Failed to delete user!",
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
          <AlertDialogTitle>Are you sure to delete user?</AlertDialogTitle>
          <AlertDialogDescription>
            All data belong to this user will be deleted permanently, are you
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
