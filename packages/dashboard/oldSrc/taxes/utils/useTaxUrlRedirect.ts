import type { CountryWithCodeFragment } from '@core/api/graphql';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
/**
 * This is a url to the tax page: /taxes/channels/{taxConfigurationId}
 * However, when we load the page for the first time we don't know
 * the first taxConfigurationId, we need to query it first. So this hook
 * redirects from generic url (/taxes/channels/) to the one with id.
 * Its use is similar in countries and tax classes views.
 */

interface TaxEntityWithId {
  id: string;
}
interface TaxEntityWithCode {
  country: CountryWithCodeFragment;
}

type TaxEntity = TaxEntityWithId | TaxEntityWithCode;

interface UseTaxUrlRedirectOpts {
  id: string | undefined;
  data: TaxEntity[] | undefined;
  urlFunction: (id: string) => string;
}

export function useTaxUrlRedirect({ id, data, urlFunction }: UseTaxUrlRedirectOpts): void {
  const router = useRouter();
  useEffect(() => {
    if (id === 'undefined' && data?.length) {
      const defaultTaxEntity = data[0];
      if (defaultTaxEntity && 'id' in defaultTaxEntity) {
        void router.push(urlFunction(defaultTaxEntity.id));
      }
    }
  }, [id, data]);
}
