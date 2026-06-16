import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  (req) => {
    const role = req.nextauth?.token?.role;
    const pathname = req.nextUrl.pathname;
    const token = getToken()
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!role) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/issue", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    '/issue/:path*',
    '/admin/:path*'
  ]
};