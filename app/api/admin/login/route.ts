import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "kalpkrafts_admin_token";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || "kalpkrafts2026!";

    if (password === expectedPassword) {
      const cookieStore = await cookies();
      cookieStore.set(ADMIN_COOKIE_NAME, "admin_authenticated_session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 Days
      });

      return NextResponse.json({ success: true, message: "Authentication successful." });
    } else {
      return NextResponse.json({ success: false, error: "Invalid admin password." }, { status: 401 });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME);
  const isAuthenticated = token?.value === "admin_authenticated_session";
  return NextResponse.json({ authenticated: isAuthenticated });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Logged out." });
}
