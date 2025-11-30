import { BACKEND_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

// ---------------- GET USER BY ID ----------------
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const cookieStore = await cookies();

  // Try to get token
  const token =
    cookieStore.get("auth_token")?.value ||
    cookieStore.get("__session")?.value;

  // TEMPORARY fallback token
  const BACKEND_TOKEN =
    "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJhZG1pbkByYWZpa2l4Lm9yZyIsImlhdCI6MTc2NDQwMDg1OSwiZXhwIjoxNzY0NDg3MjU5fQ.VoI7mZWFLxcdVJ3wNvpnudvdaRXeRimUZQkGJ8c0i-7BVnlVawAkrRs8TvVNUxnECdG86Yejh_9HkMk1xw2_CQ";

  const finalToken = token || BACKEND_TOKEN;

  try {
    const response = await fetch(
      `${BACKEND_API_URL}/api/admin/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${finalToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch user" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("User details API route error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}

// ---------------- PATCH: ACTIVATE / DEACTIVATE ----------------
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const cookieStore = await cookies();
  const token =
    cookieStore.get("auth_token")?.value ||
    cookieStore.get("__session")?.value;

  const BACKEND_TOKEN =
    "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJhZG1pbkByYWZpa2l4Lm9yZyIsImlhdCI6MTc2NDQwMDg1OSwiZXhwIjoxNzY0NDg3MjU5fQ.VoI7mZWFLxcdVJ3wNvpnudvdaRXeRimUZQkGJ8c0i-7BVnlVawAkrRs8TvVNUxnECdG86Yejh_9HkMk1xw2_CQ";

  const finalToken = token || BACKEND_TOKEN;

  // Extract action from URL
  const url = new URL(request.url);
  const action = url.pathname.split("/").pop(); // 'activate' or 'deactivate'

  try {
    const response = await fetch(
      `${BACKEND_API_URL}/api/admin/users/${id}/${action}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${finalToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || `Failed to ${action} user` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(`User ${action} API route error:`, error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
