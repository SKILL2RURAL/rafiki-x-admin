import { BACKEND_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

// ---------------- POST: SEND MESSAGE TO USER ----------------
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  // Try to get token
  const token =
    cookieStore.get("auth_token")?.value ||
    cookieStore.get("__session")?.value;

  const finalToken = token;

  try {
    const body = await request.json();

    const response = await fetch(
      `${BACKEND_API_URL}/api/admin/users/message`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${finalToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to send message" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Send message API route error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}