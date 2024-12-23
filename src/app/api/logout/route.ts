import { API_TAG } from "@/utils/apiTags";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(rq: NextRequest) {
  try {
    const cookiesStore = await cookies();
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
    revalidateTag(API_TAG.CurrentUserInfo);
    return NextResponse.json({ redirect: true });
  } catch (error) {
    return NextResponse.json({ message: "Failed to log out" }, { status: 400 });
  }
}
