"use server";

import { baseAddress } from "@/baseAddress";
import { getCrtUserInfo } from "@/lib/usersApi";
import { TNewQuestionOption } from "@/models/question";
import QuizAppRoutes, { QuizAPIRoutes } from "@/RoutePaths";
import { API_TAG } from "@/utils/apiTags";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type TResponseAddQuestion = {
  errorMessage: string;
  errorTitle: string;
};
export const addQuestion = async (
  questionText: string,
  allOptions: TNewQuestionOption[]
): Promise<TResponseAddQuestion | undefined> => {
  try {
    if (!questionText) {
      return {
        errorMessage: "Question text is required",
        errorTitle: "Missing information",
      };
    }
    if (allOptions.length < 2) {
      return {
        errorMessage: "At least two options are required",
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
    const res = await fetch(`${baseAddress}/api/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        questionText,
        questionOptions: allOptions,
        createdByUserId: userInfo.userId,
      }),
    });
    const respJson = await res.json();
    if (!res.ok) {
      return {
        errorMessage: respJson.details,
        errorTitle: "Failed Request",
      };
    }
  } catch (error) {
    return {
      errorMessage: "Failed to add question",
      errorTitle: "Unexpected Error",
    };
  }

  revalidateTag(API_TAG.QuestionList);
};

export const editQuestion = async (
  questionId: string,
  questionText: string,
  allOptions: TNewQuestionOption[]
): Promise<TResponseAddQuestion | undefined> => {
  try {
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
    const res = await fetch(`${baseAddress}/api/question/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: questionId,
        questionText,
        questionOptions: allOptions,
        createdByUserId: userInfo.userId,
      }),
    });
    const respJson = await res.json();
    if (!res.ok) {
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

  revalidateTag(API_TAG.QuestionList);
  revalidateTag(API_TAG.QuestionList + `-${questionId}`);
};
