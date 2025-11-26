import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This is the URL for your actual backend service.
// You should move this to an environment variable (.env.local)
const BACKEND_API_URL = process.env.API_BASE_URL;

export async function GET() {
  // 1. Get the token from the httpOnly cookie
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    // 2. Forward the request to your actual backend, adding the token as a Bearer token.
    const analyticsResponse = await fetch(
      `${BACKEND_API_URL}/api/admin/analytics/overview`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!analyticsResponse.ok) {
      const errorData = await analyticsResponse.json();
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch analytics data" },
        { status: analyticsResponse.status }
      );
    }

    const { data } = await analyticsResponse.json();

    // 3. Return the analytics data to the client.
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Analytics Overview API route error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
