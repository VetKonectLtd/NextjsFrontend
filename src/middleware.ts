import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authPages = ["/login", "/signup", "/reset-password", "/success"];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  
  // ✅ get token from cookies only
  const token = request.cookies.get("auth-token")?.value;

  // -------------------------
  // Protect dashboard routes
  // -------------------------
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    // Build the return URL with the full path including query parameters
    // DON'T encode it here - let Next.js handle the encoding
    const returnUrl = pathname + search;
    
    // Create login URL with returnUrl parameter
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnUrl", returnUrl);
    
    
    return NextResponse.redirect(loginUrl);
  }

  // -------------------------
  // Prevent logged-in users
  // from visiting auth pages
  // -------------------------
  const isAuthPage = authPages.some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthPage && token) {
    // Check if there's a returnUrl on the auth page
    const returnUrl = request.nextUrl.searchParams.get("returnUrl");
    
    if (returnUrl) {
      // Don't decode - it's already properly encoded by Next.js
      console.log(`✅ Authenticated user with returnUrl, redirecting to: ${returnUrl}`);
      return NextResponse.redirect(new URL(returnUrl, request.url));
    }
    
    // Otherwise go to default dashboard
    return NextResponse.redirect(new URL("/dashboard/vet-vendor", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};