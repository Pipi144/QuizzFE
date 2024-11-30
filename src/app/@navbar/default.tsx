import QuizAppRoutes from "@/RoutePaths";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import iconImg from "../favicon.ico";
import { getCrtUserInfo, logOut } from "./actions";
import AnimatedButton from "@/components/animated-button";
import { IoLogOutOutline } from "react-icons/io5";

type Props = {};

const NavDefault = async (props: Props) => {
  const userInfo = await getCrtUserInfo();
  console.log(userInfo);
  return (
    <div className="shadow-navMenuShadow w-full fixed top-0 max-w-[1280px] p-[20px] self-center flex flex-row items-center">
      <Link
        href={QuizAppRoutes.Home}
        className="cursor-pointer flex flex-row items-center"
      >
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

      {userInfo ? (
        <>
          <Link
            href={QuizAppRoutes.QuestionList}
            className="mx-2 text-white font-concert text-base"
          >
            Questions
          </Link>
          <AnimatedButton className="ml-auto text-white rounded-full bg-fuchsia-500 px-[10px] py-[5px] uppercase line leading-none">
            {userInfo.name?.[0]}
            {userInfo.familyName?.[0]}
          </AnimatedButton>
          <AnimatedButton
            animatedVariants="fadeInRight"
            className="ml-[15px]"
            onClick={logOut}
          >
            <IoLogOutOutline className="text-white" size={25} />
          </AnimatedButton>
        </>
      ) : (
        <>
          <Link
            href={QuizAppRoutes.Login}
            className="px-[20px] py-[5px] rounded-sm ml-auto bg-white hover:bg-white hover:bg-opacity-80 text-black mr-[10px]"
          >
            Login
          </Link>
          <Link
            href={QuizAppRoutes.Register}
            className="px-[20px] py-[5px] border-[1px] border-solid border-btnDarkBorderColor
         rounded-sm bg-btnDarkBgColor hover:bg-btnDarkHoverBgColor text-white 
         transition-all duration-200 ease-linear cursor-pointer"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default NavDefault;
