import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { getToken } from './jwt';

const _middleware = withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const authenticated = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
    if (isAuthPage) {
      return authenticated ? NextResponse.redirect(new URL('/dashboard', req.url)) : null;
    }
    if (!authenticated) {
      console.log('>>>>> middleware() redirecting to login page', { req, token });
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) from += req.nextUrl.search;
      return NextResponse.redirect(
        new URL(`/auth/login?next=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        console.log('>>>>>>> authorized() called');
        return true;
      },
    },
  }
);

export default _middleware;

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/auth/:path*',
  ],
};
