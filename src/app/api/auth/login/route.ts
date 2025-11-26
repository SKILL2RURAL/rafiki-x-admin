import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    // -------------------------------------------------------------------
    // Step 1: Forward credentials to your actual authentication backend
    // -------------------------------------------------------------------
    // IMPORTANT: Replace this URL with your real authentication service endpoint
    const authServiceResponse = await fetch(
      "http://ec2-51-21-61-45.eu-north-1.compute.amazonaws.com:8080/api/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!authServiceResponse.ok) {
      const errorData = await authServiceResponse.json();
      // Forward the error from the auth service to the client
      return NextResponse.json(
        { message: errorData.message || "Authentication failed" },
        { status: authServiceResponse.status }
      );
    }

    const res = await authServiceResponse.json();
    if (!res.data.token) {
      return NextResponse.json(
        { message: "Token not provided by auth service" },
        { status: 500 }
      );
    }

    // -------------------------------------------------------------------
    // Step 2: Set the token in a secure, httpOnly cookie
    // -------------------------------------------------------------------
    const cookie = serialize("auth_token", res.data.token, {
      httpOnly: true, // The cookie is not accessible via client-side JavaScript
      secure: process.env.NODE_ENV !== "development", // Use 'secure' in production
      sameSite: "strict", // Strictly same-site policy
      maxAge: 60 * 60 * 24 * 7, // Expires in 1 week
      path: "/", // The cookie is available for all paths
    });

    // -------------------------------------------------------------------
    // Step 3: Send back a success response with the cookie
    // -------------------------------------------------------------------
    return NextResponse.json(
      { message: "Login successful" },
      {
        status: 200,
        headers: { "Set-Cookie": cookie },
      }
    );
  } catch (error) {
    console.error("Login API route error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
