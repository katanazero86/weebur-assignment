import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('my-cookie');
  if (!cookie) {
    return NextResponse.redirect(new URL('/api/set-cookie', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
