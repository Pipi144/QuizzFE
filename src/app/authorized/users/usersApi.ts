"use server";
import { baseAddress } from "@/baseAddress";
import { TGetUserListResponse } from "@/models/ServerResponse";
import { TUserDetail, TUserRole } from "@/models/user";

import { COOKIES_KEYS } from "@/utils/cookies";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import { cookies } from "next/headers";

type TGetUserListParams = {
  page?: number;
  limitPerPage?: number;
  search?: string;
};
export async function getUserList({
  page = 0,
  limitPerPage = 10,
  search,
}: TGetUserListParams): Promise<TGetUserListResponse | undefined> {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    const searchParams = new URLSearchParams();
    searchParams.set("Page", `${page}`);
    searchParams.set("PageSize", `${limitPerPage}`);
    if (search) searchParams.set("Search", `${search}`);
    const url = new URL(`${baseAddress}/api/User?` + searchParams.toString());

    const resp = await fetch(url, {
      method: "GET",

      headers: header,
    });
    if (!resp.ok) {
      console.log("ERROR USER LIST:", resp);
      return;
    }

    return resp.json();
  } catch (error) {
    console.log("ERROR ERROR USER LIST:", error);
  }
}

export const getUserRoles = async (): Promise<TUserRole[] | undefined> => {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);

    const resp = await fetch(`${baseAddress}/api/User/user-roles`, {
      method: "GET",

      headers: header,
    });
    if (!resp.ok) {
      console.log("error getUserRoles:", resp);
      return;
    }

    return resp.json();
  } catch (error) {
    console.log("ERROR:", error);
  }
};

export const getUserById = async (
  id: string
): Promise<TUserDetail | undefined> => {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);

    const resp = await fetch(`${baseAddress}/api/User/${id}`, {
      method: "GET",
      headers: header,
    });
    if (!resp.ok) {
      console.log("error getUserById:", resp);
      throw new Error("User not found");
    }

    return resp.json();
  } catch (error) {
    console.log("ERROR:", error);
    throw new Error("User not found");
  }
};

export const getCrtUserInfo = async () => {
  try {
    const cookieStore = await cookies();
    const userInfo = cookieStore.get(COOKIES_KEYS.CurrentUser);

    return userInfo ? (JSON.parse(userInfo.value) as TUserDetail) : undefined;
  } catch (error) {
    console.log("ERROR :", error);
  }
};
