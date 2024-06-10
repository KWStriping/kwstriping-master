import { createClient } from '@urql/core';
import { registerUrql } from '@urql/next/rsc';
import { cacheExchange, fetchExchange } from '@tempo/api/exchanges';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
if (!API_URL) throw new Error('API_URL is not set.');

const makeClient = () => {
  return createClient({
    url: API_URL,
    exchanges: [cacheExchange(), fetchExchange],
  });
};

export const { getClient } = registerUrql(makeClient);
