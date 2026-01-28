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
    const res = await fetch(`${BACKEND_API_URL}/api/admin/admins`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch admins" },
        { status: 500 }
      );
    }
    const { data } = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("Error fetching admins", error);
    return NextResponse.json(
      { message: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}
