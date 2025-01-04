"use client";
import { Button } from "@/components/ui/button";
import QuizAppRoutes from "@/RoutePaths";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineError } from "react-icons/md";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();
  const handleReset = () => {
    reset();
    router.replace(QuizAppRoutes.Home);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <span className="text-[25px] md:text-[35px] text-white font-concert mb-[20px]">
        {error.message ?? "User not found"}
      </span>

      <MdOutlineError className="text-[70px] md:text-[90px] text-white" />

      <Button
        className="bg-white text-black hover:opacity-80 hover:bg-white hover:text-black px-4 py-1 rounded-sm min-w-12 mt-5"
        onClick={handleReset}
      >
        Go home
      </Button>
    </div>
  );
};

export default Error;
