"use server";

import { baseAddress } from "@/baseAddress";
import { findErrors, getValidCookieToken } from "@/utils/serverHelperFnc";
import * as z from "zod";
import { TUpdateUserState } from "./[id]/page";
import { revalidatePath } from "next/cache";

import QuizAppRoutes from "@/RoutePaths";
import { redirect } from "next/navigation";

const schema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
  userId: z.string().min(1, "Missing user id"),
});

export const updateUser = async (
  formData: FormData
): Promise<TUpdateUserState | undefined> => {
  const name = formData.get("name")?.toString() ?? "";
  const userId = formData.get("userId")?.toString() ?? "";
  const nickName = formData.get("nickName")?.toString() ?? "";
  const currentRoleId = formData.get("currentRoleId")?.toString() ?? "";
  const newRoleId = formData.get("newRoleId")?.toString() ?? "";
  const validation = schema.safeParse({
    name,
    userId,
  });
  let returnedState: TUpdateUserState = {
    name,
    nickName,
  };
  console.log("UPDATE USER");
  if (!validation.success) {
    returnedState.errorName = await findErrors("name", validation.error.issues);
    returnedState.errorServer = await findErrors(
      "userId",
      validation.error.issues
    );
    return returnedState;
  }

  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken) return;
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    header.set("Content-Type", "application/json");
    let body = JSON.stringify({
      name,
      nickName,
      roleId: currentRoleId !== newRoleId ? newRoleId : null,
    });

    const resp = await fetch(`${baseAddress}/api/User/${userId}`, {
      method: "PATCH",

      headers: header,

      body,
    });
    const respJs = await resp.json();
    console.log("EDIT USER ACTION:", respJs);
    if (!resp.ok) {
      returnedState.errorServer = [
        respJs.error_description ?? "Failed to update user",
      ];

      return returnedState;
    }
  } catch (error) {
    returnedState.errorServer = ["Error update user: " + error];
  }

  revalidatePath(QuizAppRoutes.Users, "layout");
  redirect(QuizAppRoutes.Users);
};
