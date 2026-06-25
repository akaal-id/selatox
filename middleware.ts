import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

function isPublicAdminPath(pathname: string) {
  return pathname === "/admin/login";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAuthCallback = pathname.startsWith("/auth/callback");

  if (!isAdminPage && !isAdminApi && !isAuthCallback) {
    return NextResponse.next();
  }

  const { supabaseResponse, user } = await updateSession(request);

  if (isAuthCallback) {
    return supabaseResponse;
  }

  if (pathname === "/admin/login") {
    if (user) {
      const next = request.nextUrl.searchParams.get("next") || "/admin";
      return NextResponse.redirect(new URL(next, request.url));
    }
    return supabaseResponse;
  }

  if (isAdminPage && !isPublicAdminPath(pathname) && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminApi && !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/auth/callback"],
};
