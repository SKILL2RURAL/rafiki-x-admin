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
    const authServiceResponse = await fetch(
      `${BACKEND_API_URL}/api/admin/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!authServiceResponse.ok) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { data } = await authServiceResponse.json();

    // 3. Return the user data if the token is valid
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Me API route error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
