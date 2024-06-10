import type { CookiesOptions } from 'next-auth';

const DOMAIN = process.env.DOMAIN ?? process.env.NEXT_PUBLIC_DOMAIN;
const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL ?? 'https';
const ENVIRONMENT = process.env.NODE_ENV;

export const USE_SECURE_COOKIES = ENVIRONMENT !== 'development' || PROTOCOL === 'https';

export const SESSION_TOKEN_COOKIE_NAME = `${
  USE_SECURE_COOKIES ? '__Secure-' : ''
}next-auth.session-token`;

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: SESSION_TOKEN_COOKIE_NAME,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      domain: DOMAIN,
      secure: USE_SECURE_COOKIES,
    },
  },
};

export default cookies;
