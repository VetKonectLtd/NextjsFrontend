import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authPages = ["/login", "/success", "/signup", "/reset-password"];

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


	// // Parse user role (you should ideally decode it from JWT or a cookie)
	// let userRole: string | null = null;
	// try {
	// 	const userData = JSON.parse(request.cookies.get("user-data")?.value || "{}");
	// 	userRole = userData?.role || "basic_user";
	// } catch (err) {
	// 	userRole = "basic_user";
	// }

	// // Enforce role-based access only for dashboard routes
	// if (pathname.startsWith("/dashboard")) {
	// 	const allowedIds = ROLE_NAV_ACCESS[userRole] || ROLE_NAV_ACCESS["basic_user"];
	// 	const allowedHrefs = navItems
	// 		.filter((item) => allowedIds.includes(item.id))
	// 		.map((item) => item.href);

	// 	// Check if the current path is within allowed hrefs
	// 	const isAllowed = allowedHrefs.some((href) => pathname.startsWith(href));

	// 	if (!isAllowed) {
	// 		console.warn(`⛔ Access denied for role "${userRole}" on ${pathname}`);
	// 		const redirectUrl = new URL("/dashboard", request.url);
	// 		return NextResponse.redirect(redirectUrl);
	// 	}
	// }

	return NextResponse.next();
}

// tell Next.js which routes should be checked
export const config = {
	matcher: [
		"/dashboard/:path*",
		"/login/:path",
		"/signup/:path*",
		"/reset-password/:path*",
	],
};
