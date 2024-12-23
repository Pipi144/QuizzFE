import { NextResponse, type NextRequest } from "next/server";
import { COOKIES_KEYS } from "./utils/cookies";
import QuizAppRoutes, { AUTHORIZED_PREFIX } from "./RoutePaths";
import { clearAllCookies } from "./utils/serverHelperFnc";

export function middleware(rq: NextRequest) {
  if (rq.nextUrl.pathname === QuizAppRoutes.Home) return;

  // check access token in cookies if it is valid
  const cookieToken = rq.cookies.get(COOKIES_KEYS.AccessToken);

  // redirect to login page if accessing authorized pages without access token
  if (rq.nextUrl.pathname.startsWith(AUTHORIZED_PREFIX) && !cookieToken) {
    clearAllCookies();

    return NextResponse.redirect(new URL(QuizAppRoutes.Login, rq.url));
  }
  return NextResponse.next();
}
