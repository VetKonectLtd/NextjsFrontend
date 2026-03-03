import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authPages = ["/login", "/signup", "/reset-password", "/success"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ get token from cookies only
  const token = request.cookies.get("auth-token")?.value;

  // -------------------------
  // Protect dashboard routes
  // -------------------------
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // -------------------------
  // Prevent logged-in users
  // from visiting auth pages
  // -------------------------
  const isAuthPage = authPages.some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthPage && token) {
    return NextResponse.redirect(
      new URL("/dashboard/vet-vendor", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Run middleware on everything EXCEPT:
      - api routes
      - next static files
      - images
      - favicon
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};