import { QuizAppRoutes } from "@/RoutePaths";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import iconImg from "../app/favicon.ico";
import AnimatedGradientText from "./ui/animated-gradient-text";

type Props = {};

const NavMenu = (props: Props) => {
  return (
    <div className="shadow-navMenuShadow w-full fixed top-0 max-w-[1280px] p-[20px] self-center flex flex-row ">
      <Link href={QuizAppRoutes.Home} className="cursor-pointer flex flex-row">
        <Image
          width={25}
          height={25}
          src={iconImg}
          alt="App icon"
          className="md:w-[30px] md:h-[30px] object-contain"
        />
        <AnimatedGradientText className="bg-transparent ml-[4px]">
          <span className="inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
            Pi Quiz
          </span>
        </AnimatedGradientText>
      </Link>
      <Button className="ml-auto bg-white hover:bg-white hover:bg-opacity-80 text-black ">
        Login
      </Button>
    </div>
  );
};

export default NavMenu;
