import { NextResponse, type NextRequest } from "next/server";
import { COOKIES_KEYS } from "./utils/cookies";
import QuizAppRoutes, { AUTHORIZED_PREFIX } from "./RoutePaths";
import { revalidatePath } from "next/cache";

export function middleware(rq: NextRequest) {
  if (rq.nextUrl.pathname === QuizAppRoutes.Home) return;

  // check access token in cookies if it is valid
  const cookieToken = rq.cookies.get(COOKIES_KEYS.AccessToken);

  // redirect to login page if accessing authorized pages without access token
  if (rq.nextUrl.pathname.startsWith(AUTHORIZED_PREFIX) && !cookieToken) {
    //remove all cookies
    const allCookies = rq.cookies.getAll();
    const response = NextResponse.redirect(
      new URL(QuizAppRoutes.Login, rq.url)
    );
    allCookies.forEach((cookie) => {
      response.cookies.set(cookie.name, "", {
        maxAge: -1, // Expire the cookie immediately
        path: "/", // Ensure it's deleted from all paths
        httpOnly: true, // Explicitly set as HttpOnly
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      });
    });
    revalidatePath(QuizAppRoutes.Home);
    return response;
  }
  return NextResponse.next();
}
