import { baseAddress } from "@/baseAddress";
import { TBasicQuiz, TQuiz, TQuizFullQuestions } from "@/models/quiz";
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
      console.error("Failed to fetch quiz by ID:", response.statusText);
      return;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    return;
  }
};

export const fetchQuizWithFullQuestionsById = async (
  id: string
): Promise<TQuizFullQuestions | undefined> => {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${baseAddress}/api/quiz/full/${id}`, {
      method: "GET",
      headers: header,
      next: {
        tags: [API_TAG.QuizList + `-${id}`],
      },
    });
    const resp = await response.json();
    if (!response.ok) {
      console.error("Failed to fetch quiz by ID:", resp);
      return;
    }

    return resp;
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    return;
  }
};
