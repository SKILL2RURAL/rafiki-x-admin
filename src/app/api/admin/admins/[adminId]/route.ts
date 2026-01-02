import { BACKEND_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ adminId: string }> }
) {
  const { adminId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const res = await fetch(`${BACKEND_API_URL}/api/admin/admins/${adminId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { message: errorData.message || "Failed to update admin profile" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    return NextResponse.json(
      { message: "Failed to update admin profile" },
      { status: 500 }
    );
  }
}

