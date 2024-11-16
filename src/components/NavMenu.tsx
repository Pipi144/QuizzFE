import { QuizAppRoutes } from "@/RoutePaths";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

type Props = {};

const NavMenu = (props: Props) => {
  return (
    <div className="shadow-navMenuShadow w-full fixed top-0 max-w-[1280px] p-[20px] self-center flex flex-row ">
      <Link href={QuizAppRoutes.Home} className="cursor-pointer">
        <Image
          width={25}
          height={25}
          src={require("../app/favicon.ico")}
          alt="App icon"
          className="md:w-[35px] md:h-[35px] object-contain"
        />
      </Link>
      <Button className="ml-auto bg-white hover:bg-white hover:bg-opacity-80 text-black ">
        Login
      </Button>
    </div>
  );
};

export default NavMenu;
