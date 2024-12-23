import QuizAppRoutes from "@/RoutePaths";

import Link from "next/link";
import React from "react";
import AnimatedGradientText from "../ui/animated-gradient-text";
import MenuItem from "./MenuItem";
import AnimatedButton from "../animated-button";
import Image from "next/image";
import iconImg from "../../app/favicon.ico";
import LogoutBtn from "./LogoutBtn";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import { baseAddress } from "@/baseAddress";
import { API_TAG } from "@/utils/apiTags";

type Props = {};
const getCrtUserInfo = async () => {
  try {
    console.log("GET CURRENT USER INFO");
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    const resp = await fetch(`${baseAddress}/api/User/current-user-info`, {
      method: "GET",
      next: {
        tags: [API_TAG.CurrentUserInfo],
      },
      headers: header,
    });
    const respJson = await resp.json();
    if (!resp.ok) {
      console.log("getCrtUserInfo:", respJson);
      return;
    }

    return respJson;
  } catch (error) {
    console.log("ERROR :", error);
  }
};
const Navbar = async (props: Props) => {
  const userInfo = await getCrtUserInfo();

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
          <MenuItem itemText="Questions" itemUrl={QuizAppRoutes.QuestionList} />
          <MenuItem itemText="Manage users" itemUrl={QuizAppRoutes.Users} />
          <AnimatedButton className="ml-auto">
            <Image
              width={25}
              height={25}
              src={userInfo.pictureUrl}
              alt="App icon"
              className="md:w-[30px] md:h-[30px] object-cover overflow-hidden rounded-full"
            />
          </AnimatedButton>
          <LogoutBtn />
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

export default Navbar;
