import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import { getCallbacks } from './callbacks';
import cookies from './cookies';
import jwt from './jwt';
import providers from './providers';

export const authOptions: NextAuthOptions = {
  cookies,
  debug: false,
  jwt,
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/login',
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user'
  },
  providers,
  secret: process.env.SECRET_KEY,
  // https://next-auth.js.org/configuration/options#session
  session: { strategy: 'jwt' },
  events: {
    async signOut({ token }) {
      // TODO
      console.log('🔑 signOut', { token });
    },
  },
};

const getAuthOptions = (req: NextApiRequest): NextAuthOptions => ({
  ...authOptions,
  callbacks: getCallbacks(req),
});

export const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.url === '/api/auth/signout') {
    res.setHeader('Set-Cookie', [
      'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
      // '__Host-next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure',
      // '__Secure-next-auth.callback-url=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure',
      'next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    ]);
  }
  return NextAuth(req, res, getAuthOptions(req));
};

export default authHandler;
