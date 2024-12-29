import { Metadata } from "next";
import React from "react";

type Props = {};
export const metadata: Metadata = {
  title: "Questions",
  description: "All questions information",
};
const Questions = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col  max-w-[980px] p-[20px] pt-[80px] mx-auto text-white font-concert">
      <h1 className="page-title-text">Questions</h1>
    </div>
  );
};

export default Questions;
