import { Spinner } from "@/components/ui/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <Spinner className="self-center text-blue-500 " size={"large"} />

      <p className="text-2xl text-white font-Gorditas">Getting questions...</p>
    </div>
  );
};

export default Loading;
