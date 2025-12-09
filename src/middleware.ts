import createMiddleware from 'next-intl/middleware';

import { type NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';

const protectedRoutes = ['/checkout', '/cart', '/account'];
const authRoutes = ['/signin', '/signup'];

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname; // <-- only pathname, no query

  const AUTH_KEY = process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY || '';

  // Detect locale
  const locale = routing.locales.find((loc) => path.startsWith(`/${loc}`));
  const cleanPath = locale ? path.replace(`/${locale}`, '') : path;

  // Ignore query params for protected route check
  const basePath = cleanPath.split('?')[0]; // <-- remove ?id=1 or any query

  const isProtected = protectedRoutes.includes(basePath);
  const isAuthRoute = authRoutes.includes(basePath);

  const cookie = request.cookies.get(AUTH_KEY)?.value;
  const session = cookie;

  // NEW: get previous route from referer header

  if (isProtected && !session) {
    const redirectUrl = new URL(request.url);

    // Always send user to signin page
    redirectUrl.pathname = `/${locale ?? 'en'}`;

    redirectUrl.search = '';
    redirectUrl.searchParams.set('auth', 'signin');

    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)', '/', '/(en|km)/:path*'],
};
