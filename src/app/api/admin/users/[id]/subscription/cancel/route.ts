import { BACKEND_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

// ---------------- CANCEL USER SUBSCRIPTION ----------------
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookieStore = await cookies();

  const token =
    cookieStore.get("auth_token")?.value || cookieStore.get("__session")?.value;

  const finalToken = token;

  if (!finalToken) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${BACKEND_API_URL}/api/admin/users/${id}/subscription/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${finalToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to cancel subscription" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Cancel subscription API route error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
