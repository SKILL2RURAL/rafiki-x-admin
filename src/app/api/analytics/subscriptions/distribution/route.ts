import { BACKEND_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const analyticsResponse = await fetch(
      `${BACKEND_API_URL}/api/admin/analytics/subscriptions/distribution`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!analyticsResponse.ok) {
      const errorData = await analyticsResponse.json();
      return NextResponse.json(
        {
          message:
            errorData.message || "Failed to fetch subscription distribution",
        },
        { status: analyticsResponse.status }
      );
    }

    const responseData = await analyticsResponse.json();
    return NextResponse.json(responseData.data, { status: 200 });
  } catch (error) {
    console.error("Subscription Distribution API route error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
