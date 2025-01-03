"use client";
import QuizAppRoutes from "@/RoutePaths";
import Link from "next/link";
import React from "react";
import { MdOutlineError } from "react-icons/md";

type Props = {};

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <span className="text-[25px] md:text-[35px] text-white font-concert mb-[20px]">
        {error.message ?? "Question not found"}
      </span>

      <MdOutlineError className="text-[70px] md:text-[90px] text-white" />

      <Link
        className="bg-white text-black px-4 py-1 rounded-sm min-w-12 mt-5"
        href={QuizAppRoutes.QuestionList}
      >
        Go to questions
      </Link>
    </div>
  );
};

export default Error;
