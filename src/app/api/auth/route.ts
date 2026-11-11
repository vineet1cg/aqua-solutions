import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || "aquasolutions_admin_2026";

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: "ખોટો પાસવર્ડ (Invalid password)" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "પ્રવેશ સફળ (Logged in successfully)",
      token: expectedPassword,
    });

    response.cookies.set("admin_token", expectedPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const cookieToken = request.cookies.get("admin_token")?.value;
  const authHeader = request.headers.get("authorization");
  const expectedPassword = process.env.ADMIN_PASSWORD || "aquasolutions_admin_2026";

  const isAuth =
    (cookieToken && cookieToken === expectedPassword) ||
    (authHeader && authHeader.replace("Bearer ", "").trim() === expectedPassword);

  return NextResponse.json({ authenticated: !!isAuth });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return response;
}
