import { BACKEND_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string; }>; }) {
  const { id } = await params

  const cookieStore = await cookies();
  
  const token = cookieStore.get("auth_token")?.value || 
                cookieStore.get("__session")?.value;

  const BACKEND_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJhZG1pbkByYWZpa2l4Lm9yZyIsImlhdCI6MTc2NDQwMDg1OSwiZXhwIjoxNzY0NDg3MjU5fQ.VoI7mZWFLxcdVJ3wNvpnudvdaRXeRimUZQkGJ8c0i-7BVnlVawAkrRs8TvVNUxnECdG86Yejh_9HkMk1xw2_CQ";
  
  const finalToken = token || BACKEND_TOKEN;

  try {
    const response = await fetch(
      `${BACKEND_API_URL}/api/admin/users/${id}/deactivate`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${finalToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to deactivate user" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("User deactivate API route error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}