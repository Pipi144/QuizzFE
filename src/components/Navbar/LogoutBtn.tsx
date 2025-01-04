"use client";
import React, { useEffect } from "react";
import AnimatedButton from "../AnimatedComponents/animated-button";
import { IoLogOutOutline } from "react-icons/io5";
import QuizAppRoutes, { QuizAPIRoutes } from "@/RoutePaths";
import { usePathname, useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();
  const pathName = usePathname();
  const logOut = async () => {
    try {
      const res = await fetch(QuizAPIRoutes.Logout, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const resp = await res.json();

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  // need to refresh the page when user logs out/ session expired (redirect to login page)
  // refresh the page to refresh navbar
  useEffect(() => {
    if (pathName === QuizAppRoutes.Login) router.refresh();
  }, [pathName]);

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
