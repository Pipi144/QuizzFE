"use server";

import { baseAddress } from "@/baseAddress";
import { TLoginState } from "../../../models/AuthModels";
import * as z from "zod";
import { cookies } from "next/headers";
import { COOKIES_KEYS } from "@/utils/cookies";
import { redirect } from "next/navigation";
import QuizAppRoutes from "@/RoutePaths";
import { revalidateTag } from "next/cache";
import { API_TAG } from "@/utils/apiTags";
import { findErrors } from "@/utils/serverHelperFnc";
import { getCrtUserInfo } from "@/app/authorized/users/usersApi";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email required")
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password required"),
});

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
      returnedState.emailErrors = await findErrors(
        "email",
        validation.error.issues
      );
      returnedState.passwordErrors = await findErrors(
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
      returnedState.serverErrors = respJs.error_description
        ? [respJs.error_description]
        : ["Failed to login"];

      return returnedState;
    }
    const cookiesStore = await cookies();

    // get user information
    const respUser = await fetch(`${baseAddress}/api/User/current-user-info`, {
      method: "GET",
      next: {
        tags: [API_TAG.CurrentUserInfo],
        revalidate: 3600,
      },
      headers: {
        Authorization: `Bearer ${respJs.accessToken}`,
      },
    });
    const respUserJson = await respUser.json();
    if (!respUser.ok) {
      returnedState.serverErrors = ["Failed to get user information"];
      return returnedState;
    }

    cookiesStore.set(COOKIES_KEYS.CurrentUser, JSON.stringify(respUserJson), {
      httpOnly: true, // Prevents access via JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Protects against CSRF
      path: "/",
      maxAge: 0.95 * respJs.expiresIn,
    });
    cookiesStore.set(COOKIES_KEYS.AccessToken, respJs.accessToken, {
      httpOnly: true, // Prevents access via JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Protects against CSRF
      maxAge: 0.95 * respJs.expiresIn,
      path: "/",
    });
  } catch (error) {
    console.log("ERROR:", error);
    returnedState.serverErrors = ["Unknown error"];
    return returnedState;
  }

  redirect(QuizAppRoutes.QuestionList); // redirect to question list when successfully login
};
