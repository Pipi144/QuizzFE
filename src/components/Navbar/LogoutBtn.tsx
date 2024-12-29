"use client";
import React from "react";
import AnimatedButton from "../animated-button";
import { IoLogOutOutline } from "react-icons/io5";
import QuizAppRoutes, { QuizAPIRoutes } from "@/RoutePaths";
import { useRouter } from "next/navigation";

type Props = {};

const LogoutBtn = (props: Props) => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const res = await fetch(QuizAPIRoutes.Logout, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resp = await res.json();

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {}
  };
  return (
    <AnimatedButton
      animatedVariants="fadeInRight"
      className="ml-[15px]"
      onClick={() => logOut()}
    >
      <IoLogOutOutline className="text-white" size={25} />
    </AnimatedButton>
  );
};

export default LogoutBtn;
