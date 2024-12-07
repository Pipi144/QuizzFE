"use server";

import { COOKIES_KEYS } from "@/utils/cookies";
import { TTokenCookies } from "@/models/CookiesModels";
import dayjs from "dayjs";
import { cookies } from "next/headers";

export const getValidCookieToken = async (): Promise<
  TTokenCookies | undefined
> => {
  const cookiesStore = await cookies();
  // check access token in cookies if it is valid

  const cookieTokenString = cookiesStore.get(COOKIES_KEYS.AccessToken);
  const accessToken = cookieTokenString
    ? (JSON.parse(cookieTokenString.value) as TTokenCookies)
    : undefined;
  const currentTime = dayjs().unix() - 60; // make allowance for 1 minutes
  const isTokenValid = Boolean(
    accessToken && accessToken.expired > currentTime
  ); // if cookies has token and the token not expired
  if (!isTokenValid) {
    return;
  }

  return accessToken;
};
