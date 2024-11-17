import React from "react";
import { TbError404 } from "react-icons/tb";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <span className="text-[30px] md:text-[50px] text-white font-concert mb-[20px]">
        Page not found
      </span>
      <TbError404 className="text-[150px] md:text-[200px] text-white" />
    </div>
  );
};

export default NotFound;
