import { NextResponse, type NextRequest } from "next/server";
import { COOKIES_KEYS } from "./utils/cookies";
import QuizAppRoutes, {
  AUTHORIZED_PREFIX,
  Authorized_Routes,
} from "./RoutePaths";
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
  if (rq.nextUrl.pathname.startsWith(AUTHORIZED_PREFIX) && !isTokenValid) {
    console.log("CLEAR");
    rq.cookies.clear();
    return NextResponse.redirect(new URL(QuizAppRoutes.Login, rq.url));
  }

  // Add headers to the request for authorized routes for api calls

  if (isTokenValid) {
    const modifiedHeaders = new Headers(rq.headers);
    modifiedHeaders.set("Authorization", `Bearer ${accessToken?.accessToken}`);
    console.log("SET HEADER:", rq.nextUrl.pathname);
    const response = NextResponse.next({
      headers: modifiedHeaders,
      request: {
        headers: modifiedHeaders,
      },
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-action" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
