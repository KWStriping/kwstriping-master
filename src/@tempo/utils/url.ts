import type { CountryCode } from '@tempo/api/generated/graphql';
import { useLocale } from '@tempo/ui/hooks/useLocale';
import queryString from 'query-string';
import type { Locale } from '@tempo/utils/regions';

type ParamBasicValue = string | undefined | null;

const queryParamsMap = {
  locale: 'locale',
  dummyPayment: 'dummyPayment',
  channel: 'channel',
  redirectUrl: 'redirectUrl',
  checkout: 'checkoutId',
  order: 'orderId',
  token: 'passwordResetToken',
  email: 'passwordResetEmail',
  tempoApiUrl: 'tempoApiUrl',
} as const;

type UnmappedQueryParam = keyof typeof queryParamsMap;

type QueryParam = (typeof queryParamsMap)[UnmappedQueryParam];

interface CustomTypedQueryParams {
  countryCode: CountryCode;
  locale: Locale;
  channel: string;
}

type RawQueryParams = Record<UnmappedQueryParam, ParamBasicValue> & CustomTypedQueryParams;

export type QueryParams = Record<QueryParam, ParamBasicValue> & CustomTypedQueryParams;

// this is intentional, we know what we'll get from the query but
// queryString has no way to type this in such a specific way
export const useRawQueryParams = () =>
  queryString.parse(location.search) as unknown as RawQueryParams;

export const useQueryParams = (): QueryParams => {
  const params = useRawQueryParams();
  const { locale } = useLocale();
  // TODO
  // if (locale !== params.locale) replaceUrl({ query: { locale } });
  return Object.entries({ ...params, locale }).reduce((result, entry) => {
    const [paramName, paramValue] = entry as [UnmappedQueryParam, ParamBasicValue];
    const mappedParamName = queryParamsMap[paramName];
    const mappedParamValue = paramValue; // TODO: map param value to default value here if needed?
    return {
      ...result,
      [mappedParamName]: mappedParamValue,
    };
  }, {}) as QueryParams;
};

export const getCurrentHref = () => location.href;
