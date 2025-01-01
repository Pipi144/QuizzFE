"use server";

import { baseAddress } from "@/baseAddress";
import { TBasicQuestion } from "@/models/question";
import { TPaginatedResponse } from "@/models/ServerResponse";
import { getValidCookieToken } from "@/utils/serverHelperFnc";

export const getQuestionsWithFilter = async ({
  page = 1,
  limitPerPage = 10,
  search,
}: {
  page?: number;
  limitPerPage?: number;
  search?: string;
}): Promise<TPaginatedResponse<TBasicQuestion> | undefined> => {
  const accessToken = await getValidCookieToken();
  if (!accessToken) return;
  const header = new Headers();
  header.set("Authorization", `Bearer ${accessToken}`);
  const searchParams = new URLSearchParams();
  searchParams.set("Page", `${page + 1}`);
  searchParams.set("PageSize", `${limitPerPage}`);
  if (search) searchParams.set("questionText", `${search}`);
  const url = new URL(`${baseAddress}/api/question?` + searchParams.toString());
  const response = await fetch(url, {
    headers: header,
    method: "GET",
    cache: "no-cache",
  });

  if (!response.ok) {
    console.log("RESPONSE:", response);
    throw new Error("Failed to fetch questions");
  }
  return response.json();
};
