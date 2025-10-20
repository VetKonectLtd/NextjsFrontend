import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authPages = ["/login", "/signup", "/reset-password"];

export function middleware(request: NextRequest) {
	const token =
		request.cookies.get("auth-token")?.value ||
		request.headers.get("Authorization") ||
		null;

	const { pathname } = request.nextUrl;

	// if path starts with /dashboard
	if (
		protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
	) {
		if (!token) {
			// redirect to login page if no token
			const loginUrl = new URL("/login", request.url);
			return NextResponse.redirect(loginUrl);
		}
	}

	// 2. Block logged-in users from accessing login/signup
	 if (authPages.some((route) => pathname.startsWith(route))) {
    if (token) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }
	return NextResponse.next();
}

// tell Next.js which routes should be checked
export const config = {
	matcher: [
		"/dashboard/:path*", 
		"/login", 
		"/signup/:path*", 
		"/reset-password/:path*"
	],
};
