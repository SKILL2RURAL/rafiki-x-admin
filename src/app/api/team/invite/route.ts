import { BACKEND_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated: You must be logged in to invite users." },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { email, firstName, lastName } = body;

  if (!email) {
    return NextResponse.json(
      { message: "Email is required to send an invitation." },
      { status: 400 }
    );
  }

  try {
    const inviteResponse = await fetch(`${BACKEND_API_URL}/api/admin/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, firstName, lastName }),
    });

    const responseData = await inviteResponse.json();

    if (!inviteResponse.ok) {
      return NextResponse.json(
        { message: responseData.message || "Failed to send invitation." },
        { status: inviteResponse.status }
      );
    }

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
