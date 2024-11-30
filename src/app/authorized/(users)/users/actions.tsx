"use server";

import { baseAddress } from "@/baseAddress";
import { TBasicUser } from "@/models/user";
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
    const url = new URL(
      `${baseAddress}/api/User/get-users?` + searchParams.toString()
    );

    const resp = await fetch(url, {
      method: "GET",
      next: {
        tags: [API_TAG.UserList],
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
}
