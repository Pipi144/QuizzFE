"use client";
import React from "react";
import { MdOutlineError } from "react-icons/md";

type Props = {};

const Error = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <span className="text-[30px] md:text-[50px] text-white font-concert mb-[20px]">
        Failed to get users
      </span>

      <MdOutlineError className="text-[150px] md:text-[200px] text-white" />
    </div>
  );
};

export default Error;
