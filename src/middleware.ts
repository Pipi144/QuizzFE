import { NextResponse, type NextRequest } from "next/server";
import { COOKIES_KEYS } from "./cookies";
import QuizAppRoutes, { Authorized_Routes } from "./RoutePaths";
import { TTokenCookies } from "./models/CookiesModels";
import dayjs from "dayjs";

export function middleware(rq: NextRequest) {
  // check access token in cookies if it is valid
  const cookieTokenString = rq.cookies.get(COOKIES_KEYS.AccessToken);
  const accessToken = cookieTokenString
    ? (JSON.parse(cookieTokenString.value) as TTokenCookies)
    : undefined;
  const currentTime = dayjs().unix() - 60; // make allowance for 1 minutes
  const isTokenValid = Boolean(
    accessToken && accessToken.expired > currentTime
  ); // if cookies has token and the token not expired

  // redirect to login page if accessing authorized pages without access token
  if (Authorized_Routes.includes(rq.nextUrl.pathname) && !isTokenValid)
    return NextResponse.redirect(new URL(QuizAppRoutes.Login, rq.url));

  return NextResponse.next();
}
