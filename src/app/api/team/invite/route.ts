import { BACKEND_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // 1. Get the token from the httpOnly cookie to authenticate the user sending the invite
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated: You must be logged in to invite users." },
      { status: 401 }
    );
  }

  // 2. Get the email to invite from the request body
  const body = await request.json();
  const { email, firstName, lastName } = body;

  if (!email) {
    return NextResponse.json(
      { message: "Email is required to send an invitation." },
      { status: 400 }
    );
  }

  try {
    // 3. Forward the request to your actual backend, adding the sender's token for authorization.
    const inviteResponse = await fetch(`${BACKEND_API_URL}/api/admin/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, firstName, lastName }),
    });

    // 4. Proxy the response from the backend to the client.
    const responseData = await inviteResponse.json();

    if (!inviteResponse.ok) {
      return NextResponse.json(
        { message: responseData.message || "Failed to send invitation." },
        { status: inviteResponse.status }
      );
    }

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Invite User API route error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
