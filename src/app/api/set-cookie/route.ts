import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/', request.url));

  const targetValue = Math.floor(Math.random() * 2);
  console.log(targetValue);
  const targetView = targetValue === 0 ? 'list' : 'grid';

  response.cookies.set('my-cookie', targetView, {
    path: '/',
    maxAge: 60 * 60 * 24,
    httpOnly: true,
    sameSite: 'lax',
  });

  return response;
}
