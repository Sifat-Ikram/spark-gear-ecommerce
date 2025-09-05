import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("accessToken")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );

  if (payload.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Apply only for admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
