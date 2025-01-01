"use server";

import { baseAddress } from "@/baseAddress";
import { TBasicQuestion } from "@/models/question";
import { TPaginatedResponse } from "@/models/ServerResponse";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import { getCrtUserInfo } from "../users/usersApi";
import { revalidateTag } from "next/cache";
import { API_TAG } from "@/utils/apiTags";

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

type TResponseQuizAPI = {
  errorMessage: string;
  errorTitle: string;
};
export const addQuiz = async ({
  quizName,
  timeLimit,
  questions,
}: {
  quizName: string;
  timeLimit: string;
  questions: TBasicQuestion[];
}): Promise<TResponseQuizAPI | undefined> => {
  try {
    if (!quizName) {
      return {
        errorMessage: "Quiz name is required",
        errorTitle: "Missing information",
      };
    }
    if (questions.length < 1) {
      return {
        errorMessage: "At least 1 question is required",
        errorTitle: "Missing information",
      };
    }

    const accessToken = await getValidCookieToken();
    if (!accessToken) {
      return {
        errorMessage: "Your session might expire, please login again",
        errorTitle: "Session expired",
      };
    }
    const userInfo = await getCrtUserInfo();
    if (!userInfo) {
      return {
        errorMessage: "Failed to get user information",
        errorTitle: "User session expired",
      };
    }
    const body: any = {
      quizName,
      createdByUserId: userInfo.userId,
      questionIds: questions.map((q) => q.id),
    };
    if (timeLimit) body.timeLimit = timeLimit;
    const res = await fetch(`${baseAddress}/api/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    const respJson = await res.json();
    if (!res.ok) {
      console.log("RESPONSE:", respJson);
      return {
        errorMessage: respJson.details,
        errorTitle: "Failed Request",
      };
    }
  } catch (error) {
    return {
      errorMessage: "Failed to add quiz",
      errorTitle: "Unexpected Error",
    };
  }

  revalidateTag(API_TAG.QuizList);
};

export const editQuiz = async ({
  quizId,
  quizName,
  questions,
  timeLimit,
}: {
  quizId: string;
  quizName: string;
  timeLimit: string;
  questions: TBasicQuestion[];
}): Promise<TResponseQuizAPI | undefined> => {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) {
      return {
        errorMessage: "Your session might expire, please login again",
        errorTitle: "Session expired",
      };
    }
    if (questions.length < 1) {
      return {
        errorMessage: "At least 1 question is required",
        errorTitle: "Missing information",
      };
    }
    const res = await fetch(`${baseAddress}/api/quiz/${quizId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        quizName,
        timeLimit: timeLimit || 0,
        questionIds: questions.map((q) => q.id),
      }),
    });
    const respJson = await res.json();
    if (!res.ok) {
      console.log("RESPONSE:", respJson);
      return {
        errorMessage: respJson.details,
        errorTitle: "Failed Request",
      };
    }
  } catch (error) {
    console.log("ERROR ADD QUESTION:", error);
    return {
      errorMessage: "Failed to add question",
      errorTitle: "Unexpected Error",
    };
  }

  revalidateTag(API_TAG.QuizList);
  revalidateTag(API_TAG.QuizList + `-${quizId}`);
};

export const deleteQuiz = async (quizId: string) => {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return false;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${baseAddress}/api/quiz/${quizId}`, {
      method: "DELETE",
      headers: header,
    });
    if (!response.ok) revalidateTag(API_TAG.QuizList);
    return response.ok;
  } catch (error) {
    return false;
  }
};
