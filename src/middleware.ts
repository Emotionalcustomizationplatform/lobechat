// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Example middleware that blocks access to /admin/* if no cookie "is-admin" set.
// Replace with robust auth logic (NextAuth).
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    const isAdmin = req.cookies.get("is-admin")?.value;
    if (!isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/auth/unauthorized"; // create a simple unauthorized page or redirect to login
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
