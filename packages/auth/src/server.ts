import { authOptions } from '@core/auth/handler';
import { getServerSession as _getServerSession } from 'next-auth/next';

// TODO
export interface GetServerSessionArgs {
  req: any;
  res: any;
}

export function getServerSession({ req, res }: GetServerSessionArgs) {
  return _getServerSession(req, res, authOptions);
}
