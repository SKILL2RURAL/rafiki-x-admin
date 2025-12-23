import { BACKEND_API_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period");
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const backendUrl = new URL(
    `${BACKEND_API_URL}/api/admin/analytics/subscriptions/revenue`
  );
  if (period) backendUrl.searchParams.append("period", period);
  if (year) backendUrl.searchParams.append("year", year);
  if (month) backendUrl.searchParams.append("month", month);

  try {
    const apiRes = await fetch(backendUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch revenue data" },
        { status: apiRes.status }
      );
    }

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
