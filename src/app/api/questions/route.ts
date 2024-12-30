import { baseAddress } from "@/baseAddress";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import { NextRequest, NextResponse } from "next/server";

// GET request handler for `/api/user/[id]`
export async function POST(req: NextRequest) {
  try {
    const accessToken = getValidCookieToken();
    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token is missing or invalid" },
        { status: 401 }
      );
    }
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${baseAddress}/api/question/`, {
      method: "GET",
      headers: header,
      cache: "no-cache",
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Error fetching questions:", errorMessage);
      return NextResponse.json(
        { message: errorMessage.message || "Failed to fetch questions" },
        { status: response.status }
      );
    }

    const user = await response.json();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Server error while fetching questions:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
