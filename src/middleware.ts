import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value 
              || request.headers.get("Authorization")
              || null;

  // if path starts with /dashboard
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      // redirect to login page if no token
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// tell Next.js which routes should be checked
export const config = {
  matcher: ["/dashboard/:path*"],
};
