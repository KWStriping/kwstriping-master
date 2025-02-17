import type { Country, LanguageDisplay, UserPermission } from '@tempo/api/generated/graphql';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');

const keys = {
  // https://formidable.com/open-source/urql/docs/graphcache/normalized-caching/#custom-keys-and-non-keyable-entities
  // TODO: check if any of these actually want the id field so they can be normalized
  /* eslint-disable ts/naming-convention */
  Value: () => null,
  ChoiceValue: () => null, // TODO: check
  Country: (data: Country) => data?.code,
  GatewayConfigLine: () => null,
  Image: () => null,
  LanguageDisplay: (data: LanguageDisplay) => data?.code,
  LimitInfo: () => null,
  Limits: () => null,
  Money: () => null,
  Permission: (data: UserPermission) => data?.code,
  ProductMediaItem: () => null,
  ProductPricingInfo: () => null,
  Attribute: () => null,
  StockSettings: () => null,
  TaxedMoney: () => null,
  TaxedMoneyRange: () => null,
  UserPermission: (data: UserPermission) => data?.code, // TODO: dedup with following
  // Weight: () => null,
  /* eslint-enable ts/naming-convention */
};

// const resolvers: ResolverConfig = {
//   Value: {
//     slug(parent: Value, _: unknown, cache: Cache) {
//       const givenSlug = cache.resolve(parent, 'slug');
//       return givenSlug ?? cache.resolve(parent, 'name');
//     },
//   },
// };

// export const cacheExchange = (schema?: Maybe<IntrospectionData>): Exchange =>
//   baseCacheExchange<CacheExchangeOpts>({
//     keys,
//     resolvers,
//     // updates,
//     ...(schema ? { schema } : {}),
//   });
