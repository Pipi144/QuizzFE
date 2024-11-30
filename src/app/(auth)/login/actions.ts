"use server";

import { baseAddress } from "@/baseAddress";
import { TLoginState } from "../../../models/AuthModels";
import * as z from "zod";
import { cookies } from "next/headers";
import { COOKIES_KEYS } from "@/utils/cookies";
import { redirect } from "next/navigation";
import QuizAppRoutes from "@/RoutePaths";
import { TTokenCookies } from "@/models/CookiesModels";
import dayjs from "dayjs";
import { revalidateTag } from "next/cache";
import { API_TAG } from "@/utils/apiTags";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email required")
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password required"),
});

const findErrors = (fieldName: string, errors: z.ZodIssue[]) => {
  return (errors ?? [])
    .filter((item) => {
      return item.path.includes(fieldName);
    })
    .map((item) => item.message);
};

export const handleLogin = async (
  formData: FormData
): Promise<TLoginState | undefined> => {
  const email = formData.get("email") ?? "";
  const password = formData.get("password") ?? "";
  const validation = schema.safeParse({
    email,
    password,
  });
  let returnedState: TLoginState = {
    email: email.toString(),
    password: password.toString(),
  };
  try {
    //validate form data
    if (!validation.success) {
      returnedState.emailErrors = findErrors("email", validation.error.issues);
      returnedState.passwordErrors = findErrors(
        "password",
        validation.error.issues
      );
      return returnedState;
    }

    const response = await fetch(`${baseAddress}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify({ email, password }),
    });
    const respJs = await response.json();
    if (!response.ok) {
      returnedState.serverErrors = [respJs.error_description] ?? [
        "Failed to login",
      ];

      return returnedState;
    }

    const tokenCookies: TTokenCookies = {
      accessToken: respJs.accessToken,
      expired: dayjs().unix() + Number(respJs.expiresIn),
    }; // save the token and expired time to cookies
    (await cookies()).set(
      COOKIES_KEYS.AccessToken,
      JSON.stringify(tokenCookies)
    );
  } catch (error) {
    console.log("ERROR:", error);
    returnedState.serverErrors = ["Unknown error"];
    return returnedState;
  }
  revalidateTag(API_TAG.CurrentUserInfo);
  redirect(QuizAppRoutes.QuestionList); // redirect to question list when successfully login
};
