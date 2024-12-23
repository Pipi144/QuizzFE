"use client";
import QuizAppRoutes from "@/RoutePaths";
import Link from "next/link";
import React from "react";
import { MdOutlineError } from "react-icons/md";

type Props = {};

const Error = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <span className="text-[30px] md:text-[50px] text-white font-concert mb-[20px]">
        Failed to get users
      </span>

      <MdOutlineError className="text-[100px] md:text-[150px] text-white" />

      <Link
        className="bg-white text-black px-4 py-1 rounded-sm min-w-12 mt-5"
        href={QuizAppRoutes.Users}
      >
        Ok
      </Link>
    </div>
  );
};

export default Error;
