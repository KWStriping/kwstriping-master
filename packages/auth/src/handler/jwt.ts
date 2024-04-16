import type { NextAuthOptions } from 'next-auth';

const jwt: NextAuthOptions['jwt'] = {
  // async encode(params: { token, secret, maxAge }): Promise<string> {
  //   // return a custom encoded JWT string
  //   return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  // },
  // async decode(params: { token: string; secret: string }): Promise<JWT | null> {
  //   // return a `JWT` object, or `null` if decoding failed
  //   return {};
  // },
};

export default jwt;
