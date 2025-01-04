import { API_TAG } from "@/utils/apiTags";
import { revalidateTag } from "next/cache";

import { NextRequest, NextResponse } from "next/server";

export async function POST(rq: NextRequest) {
  try {
    const allCookies = rq.cookies.getAll();
    const response = NextResponse.json({ redirect: true });

    // Delete each cookie
    allCookies.forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value, {
        httpOnly: true, // Prevents access via JavaScript
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // Protects against CSRF
        maxAge: -1,
        path: "/",
      });
    });
    revalidateTag(API_TAG.CurrentUserInfo);
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error ?? "Failed to log out" },
      { status: 400 }
    );
  }
}
