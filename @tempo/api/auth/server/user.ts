import 'server-only';

import type { UserFragment } from '@tempo/api/generated/graphql';
import { UserDocument } from '@tempo/api/generated/graphql';
import { auth } from '@tempo/api/auth';
import { getClient } from '@tempo/api/server';

export async function getUser(): Promise<Maybe<UserFragment>> {
  const session = await auth();
  if (!session) return null;
  const response = await getClient().query({ query: UserDocument });
  const user = response.data?.me;
  return user;
}
