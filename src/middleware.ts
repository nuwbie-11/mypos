import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname starts with one of our locales
  const pathLocale = pathname.split("/")[1];
  const isLocalePath = routing.locales.includes(pathLocale as any);

  // If the path doesn't start with a valid locale and it's not a static asset or API route
  if (
    !isLocalePath &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api")
  ) {
    // In a real app you might want to store user's preferred locale in a cookie
    // For now, we will redirect to default locale
    // But we should respect the locale that's in the user's session or last selection

    // Check for a locale preference in cookies
    const preferredLocale =
      request.cookies.get("NEXT_LOCALE")?.value || routing.defaultLocale;
    const locale = routing.locales.includes(preferredLocale as any)
      ? preferredLocale
      : routing.defaultLocale;

    // For root path, redirect to dashboard
    if (pathname === "/") {
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.url)
      );
    }

    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // Include the root route for locale redirect
    "/",
  ],
};
