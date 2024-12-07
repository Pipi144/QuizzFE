import { NextResponse, type NextRequest } from "next/server";
import { COOKIES_KEYS } from "./utils/cookies";
import QuizAppRoutes, { AUTHORIZED_PREFIX } from "./RoutePaths";
import { TTokenCookies } from "./models/CookiesModels";
import dayjs from "dayjs";

export function middleware(rq: NextRequest) {
  if (rq.nextUrl.pathname === QuizAppRoutes.Home) return;
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
  if (rq.nextUrl.pathname.startsWith(AUTHORIZED_PREFIX) && !isTokenValid) {
    rq.cookies.clear();
    return NextResponse.redirect(new URL(QuizAppRoutes.Login, rq.url));
  }
  return NextResponse.next();
}
