"use server";

import { baseAddress } from "@/baseAddress";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import { TUser } from "@/models/user";
import { API_TAG } from "@/utils/apiTags";
import { cookies } from "next/headers";

import QuizAppRoutes from "@/RoutePaths";
import { redirect } from "next/navigation";

export const getCrtUserInfo = async (): Promise<TUser | undefined> => {
  try {
    console.log("LOAD getCrtUserInfo");
    const accessToken = await getValidCookieToken();
    console.log("ACCESS TOKEN:", accessToken);
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken.accessToken}`);
    const resp = await fetch(`${baseAddress}/api/User/current-user-info`, {
      method: "GET",
      next: {
        tags: [API_TAG.CurrentUserInfo],
      },
      headers: header,
    });
    if (!resp.ok) {
      console.log(resp);
      return;
    }

    return resp.json();
  } catch (error) {
    console.log("ERROR:", error);
  }
};

export const logOut = async () => {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((c) => cookieStore.delete(c.name));

  redirect(QuizAppRoutes.Home);
};
