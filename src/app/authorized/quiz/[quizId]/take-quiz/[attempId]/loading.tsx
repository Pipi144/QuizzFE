import { Spinner } from "@/components/ui/spinner";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <Spinner className="self-center text-blue-500 " size={"large"} />

      <p className="text-2xl text-white font-Gorditas">
        Calculating results...
      </p>
    </div>
  );
};

export default Loading;