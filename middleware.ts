import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * PT. Selatox Bio Pharma — Middleware.
 * Routes use current folder structure: app/page.tsx, app/home/hero/, etc.
 */
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|assets).*)"],
};
