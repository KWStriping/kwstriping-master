import { relayPagination } from '@urql/exchange-graphcache/extras';

type TypePolicies = Record<string, Record<string, any>>;

export const typePolicies: TypePolicies = {
  User: {
    fields: {
      orders: relayPagination(),
    },
  },
  Query: {
    fields: {
      products: relayPagination(), // ["filter", "sortBy"]),
    },
  },
};

export default typePolicies;
