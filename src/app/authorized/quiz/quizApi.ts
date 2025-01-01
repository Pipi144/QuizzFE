import { baseAddress } from "@/baseAddress";
import { TBasicQuiz, TQuiz } from "@/models/quiz";
import { TPaginatedResponse } from "@/models/ServerResponse";
import { API_TAG } from "@/utils/apiTags";
import { getValidCookieToken } from "@/utils/serverHelperFnc";

export const getAllQuizzes = async ({
  page = 1,
  limitPerPage = 10,
  search,
}: {
  page?: number;
  limitPerPage?: number;
  search?: string;
}): Promise<TPaginatedResponse<TBasicQuiz> | undefined> => {
  const accessToken = await getValidCookieToken();
  if (!accessToken) return;
  const header = new Headers();
  header.set("Authorization", `Bearer ${accessToken}`);
  const searchParams = new URLSearchParams();
  searchParams.set("Page", `${page + 1}`);
  searchParams.set("PageSize", `${limitPerPage}`);
  if (search) searchParams.set("questionText", `${search}`);
  const url = new URL(`${baseAddress}/api/quiz?` + searchParams.toString());
  const response = await fetch(url, {
    headers: header,
    method: "GET",
    next: {
      tags: [API_TAG.QuizList],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch quizzes");
  }
  return response.json();
};

export const fetchQuizById = async (id: string): Promise<TQuiz | undefined> => {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${baseAddress}/api/quiz/${id}`, {
      method: "GET",
      headers: header,
      next: {
        tags: [API_TAG.QuizList + `-${id}`],
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
