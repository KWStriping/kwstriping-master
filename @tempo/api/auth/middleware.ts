import { NextResponse } from 'next/server';
import { auth } from '@tempo/api/auth';

export default auth((req) => {
  console.debug('Running middleware for', req.nextUrl.pathname);
  const isAuthenticated = !!req.auth;

  // const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
  const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');

  if (!isAuthenticated && isDashboardPage) {
    console.log('>>>>> middleware() redirecting to login page', { req });
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) from += req.nextUrl.search;
    return NextResponse.redirect(
      new URL(`/auth/login?next=${encodeURIComponent(from)}`, req.url)
    );
  }
  return NextResponse.next();
});

export const config = {
  // matcher: [''],
  matcher: ['/dashboard', '/dashboard/:path*', '/auth/:path*'],
};
