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
  const returnedState: TUpdateUserState = {
    name,
    nickName,
  };
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
    const body = JSON.stringify({
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
    if (!resp.ok) {
      returnedState.errorServer = [
        respJs.error_description ?? "Failed to update user",
      ];

      return returnedState;
    }
  } catch (error) {
    console.error("Error update user:", error);
    returnedState.errorServer = ["Error update user: " + error];
    return returnedState;
  }

  revalidatePath(QuizAppRoutes.Users, "layout");
  redirect(QuizAppRoutes.Users);
};

type TResponseUserAPI = {
  errorMessage: string;
  errorTitle: string;
};
export async function deleteUser(
  userId: string
): Promise<TResponseUserAPI | undefined> {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken)
      return {
        errorMessage: "Missing access token",
        errorTitle: "Unauthorized",
      };
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    header.set("Content-Type", "application/json");
    const resp = await fetch(`${baseAddress}/api/User/${userId}`, {
      method: "DELETE",
      headers: header,
    });
    // Simulate deletion logic
    if (!resp.ok) {
      console.log("DELETE NOT OK:", resp.status);
      const respJson = await resp.json();
      return {
        errorMessage: "Delete user failed from server:" + respJson.message,
        errorTitle: "Failed Request",
      };
    } else revalidatePath(QuizAppRoutes.Users, "page");
  } catch (error) {
    console.error("Error delete user:", error);
    return {
      errorMessage: "Failed to delete user.",
      errorTitle: "Unexpected Error",
    };
  }
}
