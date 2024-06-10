import type { GetTokenParams } from 'next-auth/jwt';
import { getToken as _getToken } from 'next-auth/jwt';
import { USE_SECURE_COOKIES, SESSION_TOKEN_COOKIE_NAME } from './handler/cookies';

const secret = process.env.NEXTAUTH_SECRET;

// TODO: make sure this is only used on server side...

export const getToken = (params: GetTokenParams) =>
  _getToken({
    secret,
    secureCookie: USE_SECURE_COOKIES,
    cookieName: SESSION_TOKEN_COOKIE_NAME,
    ...params,
  });
