import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of protected routes
const protectedRoutes = ["/dashboard", "/dashboard/fee-payment", "/dashboard/results"];

export function middleware(req: NextRequest) {
  // Retrieve the auth token from cookies
  const token = req.cookies.get("authToken")?.value;
  //console.log(token)

  // Check if the user is trying to access a protected route without authentication
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
