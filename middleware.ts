export { default as middleware } from '@tempo/api/auth/middleware';

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/auth/:path*'],
};
