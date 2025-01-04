import { COOKIES_KEYS } from "@/utils/cookies";
import { cookies } from "next/headers";
import { ZodIssue } from "zod";

export const clearAllCookies = async () => {
  const cookiesStore = await cookies();

  // Get all cookies
  const allCookies = cookiesStore.getAll();

  // Delete each cookie
  allCookies.forEach((cookie) => {
    cookiesStore.set(cookie.name, cookie.value, {
      httpOnly: true, // Prevents access via JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Protects against CSRF
      maxAge: -1,
      path: "/",
    });
  });
};
export const getValidCookieToken = async (): Promise<string | undefined> => {
  try {
    const cookiesStore = await cookies();

    const accessToken = cookiesStore.get(COOKIES_KEYS.AccessToken);

    if (accessToken) return accessToken.value;
  } catch (error) {
    console.log("ERROR IN getValidCookieToken:", error);
  }

  clearAllCookies();
};

export const findErrors = async (fieldName: string, errors: ZodIssue[]) => {
  try {
    return (errors ?? [])
      .filter((item) => {
        return item.path.includes(fieldName);
      })
      .map((item) => item.message);
  } catch (error) {
    console.log("ERROR IN findErrors:", error);
  }
};
