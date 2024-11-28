"use server";

import { baseAddress } from "@/baseAddress";
import { TLoginState } from "../../../models/AuthModels";
import * as z from "zod";
import { cookies } from "next/headers";
import { COOKIES_KEYS } from "@/cookies";
import { redirect } from "next/navigation";
import QuizAppRoutes from "@/RoutePaths";
import { TTokenCookies } from "@/models/CookiesModels";
import dayjs from "dayjs";

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
  let isLoggedIn = false;
  try {
    //validate form data

    if (validation.success) {
      const response = await fetch(`${baseAddress}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify({ email, password }),
      });
      const respJs = await response.json();
      console.log(respJs);
      if (!response.ok) {
        returnedState.serverErrors = [respJs.error_description] ?? [
          "Failed to login",
        ];

        return returnedState;
      }

      if (respJs.accessToken && respJs.expiresIn) {
        isLoggedIn = true;
        const tokenCookies: TTokenCookies = {
          accessToken: respJs.accessToken,
          expired: dayjs().unix() + Number(respJs.expiresIn),
        }; // save the token to cookies and expired time
        (await cookies()).set(
          COOKIES_KEYS.AccessToken,
          JSON.stringify(tokenCookies)
        );
      } else {
        returnedState.serverErrors = ["No token returned"];
        return returnedState;
      }
    } else {
      returnedState.emailErrors = findErrors("email", validation.error.issues);
      returnedState.passwordErrors = findErrors(
        "password",
        validation.error.issues
      );
      return returnedState;
    }
  } catch (error) {
    console.log("ERROR:", error);
    returnedState.serverErrors = ["Unknown error"];
    return returnedState;
  }

  if (isLoggedIn) redirect(QuizAppRoutes.QuestionList);
};
