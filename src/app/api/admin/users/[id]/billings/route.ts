import { BACKEND_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

// ---------------- GET USER BILLINGS ----------------
export async function GET(
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

  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "10";

  const backendUrl = new URL(`${BACKEND_API_URL}/api/admin/users/${id}/billings`);
  backendUrl.searchParams.append("page", page);
  backendUrl.searchParams.append("size", size);

  try {
    const response = await fetch(backendUrl.toString(), {
      headers: {
        Authorization: `Bearer ${finalToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch user billings" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    console.error("User billings API route error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
