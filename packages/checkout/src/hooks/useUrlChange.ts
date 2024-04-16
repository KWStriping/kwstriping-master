import type { QueryParams } from '@core/utils';
import { useQueryParams } from '@core/utils/url';
import { useEffect } from 'react';

export const POPSTATE_EVENT = 'popstate';

export type UrlChangeHandlerArgs = { queryParams: QueryParams };

export const useUrlChange = (
  onLocationChange: ({ queryParams }: UrlChangeHandlerArgs) => void
) => {
  useEffect(() => {
    const handleChange = () => onLocationChange({ queryParams: useQueryParams() });

    window.addEventListener(POPSTATE_EVENT, handleChange);

    return () => {
      window.removeEventListener(POPSTATE_EVENT, handleChange);
    };
  }, [onLocationChange]);
};
