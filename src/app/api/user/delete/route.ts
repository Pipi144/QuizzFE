import { baseAddress } from "@/baseAddress";
import QuizAppRoutes from "@/RoutePaths";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(rq: NextRequest) {
  try {
    const accessToken = await getValidCookieToken();
    if (!accessToken)
      return NextResponse.json(
        { message: "Missing access token" },
        { status: 400 }
      );
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    header.set("Content-Type", "application/json");
    // Extract userId from query params
    const body = await rq.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "Missing 'userId' query parameter." },
        { status: 400 }
      );
    }
    const resp = await fetch(`${baseAddress}/api/User/${userId}`, {
      method: "DELETE",
      headers: header,
    });
    // Simulate deletion logic
    if (!resp.ok) {
      console.log("DELETE NOT OK:", resp.status);
      const respJson = await resp.json();
      return NextResponse.json(
        { message: "Delete user failed from server:" + respJson.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Failed to delete user." },
      { status: 500 }
    );
  }
  revalidatePath(QuizAppRoutes.Users);
}
