import { baseAddress } from "@/baseAddress";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import { NextRequest, NextResponse } from "next/server";

// GET request handler for `/api/user/[id]`
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const accessToken = getValidCookieToken();
    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token is missing or invalid" },
        { status: 401 }
      );
    }
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    const response = await fetch(`${baseAddress}/api/User/${id}`, {
      method: "GET",
      headers: header,
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Error fetching user by ID:", errorMessage);
      return NextResponse.json(
        { message: errorMessage.message || "Failed to fetch user" },
        { status: response.status }
      );
    }

    const user = await response.json();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Server error while fetching user by ID:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
