import { baseAddress } from "@/baseAddress";
import { TQuestion } from "@/models/question";
import { TGetQuestionListResponse } from "@/models/ServerResponse";
import { API_TAG } from "@/utils/apiTags";
import { getValidCookieToken } from "@/utils/serverHelperFnc";

export const getAllQuestions = async ({
  page = 1,
  limitPerPage = 10,
  search,
}: {
  page?: number;
  limitPerPage?: number;
  search?: string;
}): Promise<TGetQuestionListResponse | undefined> => {
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
    next: {
      tags: [API_TAG.QuestionList],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json();
};

export const fetchQuestionById = async (
  id: string
): Promise<TQuestion | undefined> => {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${baseAddress}/api/question/${id}`, {
      method: "GET",
      headers: header,
      next: {
        tags: [API_TAG.QuestionList + `-${id}`],
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch user by ID:", response.statusText);
      return;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return;
  }
};
