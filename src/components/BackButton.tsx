"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { FaAngleLeft } from "react-icons/fa";
type Props = PropsWithChildren & {};

const BackButton = ({ children }: Props) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.back();
      }}
      className="back-btn"
    >
      <FaAngleLeft color="white" size={50} />
      {children ?? <>Questions</>}
    </Button>
  );
};

export default BackButton;
