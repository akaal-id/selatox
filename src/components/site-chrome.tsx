"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/Footer";

function isAdminLoginPath(pathname: string | null) {
  return pathname === "/admin/login" || pathname === "/admin/login/";
}

export function SiteNavbar() {
  const pathname = usePathname();

  if (isAdminLoginPath(pathname)) {
    return null;
  }

  return <Navbar />;
}

export function SiteFooter() {
  const pathname = usePathname();

  if (isAdminLoginPath(pathname)) {
    return null;
  }

  return <Footer />;
}
