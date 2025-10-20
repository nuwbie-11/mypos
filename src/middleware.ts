import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // First, handle the internationalization
  const response = intlMiddleware(request);

  // Extract locale from pathname (e.g., /id, /en)
  const pathnameLocale = pathname.split("/")[1];
  const isValidLocale = routing.locales.includes(pathnameLocale as any);

  // If user is at root path with locale (e.g., /id or /en), redirect to dashboard
  if (isValidLocale && pathname === `/${pathnameLocale}`) {
    const url = request.nextUrl.clone();
    url.pathname = `/${pathnameLocale}/dashboard`;
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
