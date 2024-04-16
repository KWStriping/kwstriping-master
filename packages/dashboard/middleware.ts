export { default } from '@core/auth/middleware';

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
  ],
};
