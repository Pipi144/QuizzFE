"use server";

import { baseAddress } from "@/baseAddress";
import { TBasicUser, TUserRole } from "@/models/user";
import { API_TAG } from "@/utils/apiTags";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
type TGetUserListParams = {
  page?: number;
  limitPerPage?: number;
  search?: string;
};

type TGetUserListResponse = {
  start: number;
  limit: number;
  users: TBasicUser[];
  total: number;
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
    header.set("Authorization", `Bearer ${accessToken.accessToken}`);
    const searchParams = new URLSearchParams();
    searchParams.set("Page", `${page}`);
    searchParams.set("PageSize", `${limitPerPage}`);
    if (search) searchParams.set("Search", `${search}`);
    const url = new URL(`${baseAddress}/api/User?` + searchParams.toString());

    const resp = await fetch(url, {
      method: "GET",
      next: {
        tags: [API_TAG.UserList],
      },
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

export const getUserById = async (
  id: string
): Promise<TBasicUser | undefined> => {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken.accessToken}`);

    const resp = await fetch(`${baseAddress}/api/User/${id}`, {
      method: "GET",
      next: {
        tags: [`${API_TAG.UserList}-${id}`],
        revalidate: 10,
      },
      headers: header,
    });
    if (!resp.ok) {
      console.log("error getUserById:", resp);
      return;
    }

    return resp.json();
  } catch (error) {
    console.log("ERROR:", error);
  }
};

export const getUserRoles = async (): Promise<TUserRole[] | undefined> => {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken.accessToken}`);

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
