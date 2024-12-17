"use server";

import { baseAddress } from "@/baseAddress";
import { TLoginState } from "../../../models/AuthModels";
import * as z from "zod";
import { redirect } from "next/navigation";
import QuizAppRoutes from "@/RoutePaths";
import { findErrors } from "@/utils/serverHelperFnc";

const schema = z.object({
  email: z
    .string()
    .min(1, "Email required")
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password required"),
  firstName: z.string(),
  givenName: z.string(),
  lastName: z.string(),
  nickName: z.string(),
});

export const handleRegister = async (
  formData: FormData
): Promise<TLoginState | undefined> => {
  const email = formData.get("email") ?? "";
  const password = formData.get("password") ?? "";
  const firstName = formData.get("firstName") ?? "";
  const givenName = formData.get("givenName") ?? "";
  const lastName = formData.get("lastName") ?? "";
  const nickName = formData.get("nickName") ?? "";
  const validation = schema.safeParse({
    email,
    password,
    firstName,
    givenName,
    lastName,
    nickName,
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

    const response = await fetch(`${baseAddress}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        givenName,
        lastName,
        nickName,
      }),
    });
    const respJs = await response.json();
    if (!response.ok) {
      returnedState.serverErrors = [respJs.error_description] ?? [
        "Failed to register",
      ];

      return returnedState;
    }
  } catch (error) {
    console.log("ERROR:", error);
    returnedState.serverErrors = ["Unknown error"];
    return returnedState;
  }

  redirect(QuizAppRoutes.Login); // redirect to login page after successfully registering user
};
