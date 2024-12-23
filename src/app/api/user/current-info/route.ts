import { baseAddress } from "@/baseAddress";
import { API_TAG } from "@/utils/apiTags";
import { getValidCookieToken } from "@/utils/serverHelperFnc";
import { NextRequest, NextResponse } from "next/server";

export async function GET(rq: NextRequest) {
  try {
    console.log("GET CURRENT USER INFO");
    const accessToken = await getValidCookieToken();
    if (!accessToken)
      return NextResponse.json(
        { message: "Missing access token" },
        { status: 400 }
      );
    const header = new Headers();
    header.set("Authorization", `Bearer ${accessToken}`);
    const resp = await fetch(`${baseAddress}/api/User/current-user-info`, {
      method: "GET",
      next: {
        tags: [API_TAG.CurrentUserInfo],
      },
      headers: header,
    });
    const respJson = await resp.json();
    if (!resp.ok) {
      return NextResponse.json({ message: respJson.message }, { status: 400 });
    }

    return NextResponse.json(respJson, { status: 200 });
  } catch (error) {
    console.log("ERROR :", error);
    return NextResponse.json(
      { message: "FAILED SERVER ROUTE GET CURRENT USER" },
      { status: 400 }
    );
  }
}
