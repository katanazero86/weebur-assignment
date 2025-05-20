import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'my-cookie';
const PROTECTED_ROUTES = ['/'];

export function middleware(request: NextRequest) {
  try {
    if (!PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    const cookie = request.cookies.get(COOKIE_NAME);

    if (cookie?.value) return NextResponse.next();

    const setCookieUrl = new URL('/api/set-cookie', request.url);
    setCookieUrl.searchParams.set('from', request.nextUrl.pathname);

    return NextResponse.redirect(setCookieUrl);
  } catch (error) {
    console.error('[Middleware Error]:', error);
    return NextResponse.next(); // TODO: error 페이지로 가도록 작업
  }
}

export const config = {
  matcher: PROTECTED_ROUTES,
};
