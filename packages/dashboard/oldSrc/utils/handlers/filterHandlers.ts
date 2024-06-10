import type { UrlObject } from 'url';
import type { IFilter } from '@dashboard/components/core/Filter';
import type { ActiveTab, Pagination, Search, Sort } from '@dashboard/oldSrc/types';
import { useRouter } from 'next/router';
import type { GetFilterQueryParam } from '../filters';
import { getFilterQueryParams } from '../filters';

type RequiredParams = ActiveTab & Search & Sort & Pagination;
type CreateUrl = (params: RequiredParams) => string | UrlObject;
type CreateFilterHandlers<TFilterKeys extends string> = [
  (filter: IFilter<TFilterKeys>) => void,
  () => void,
  (query: string) => void
];

function useFilterHandlers<TFilterKeys extends string, TFilters extends {}>(opts: {
  getFilterQueryParam: GetFilterQueryParam<TFilterKeys, TFilters>;
  createUrl: CreateUrl;
  cleanupFn?: () => void;
}): CreateFilterHandlers<TFilterKeys> {
  const router = useRouter();
  const { query: params } = router;
  const { getFilterQueryParam, createUrl, cleanupFn } = opts;

  const changeFilters = (filters: IFilter<TFilterKeys>) => {
    if (cleanupFn) {
      cleanupFn();
    }

    void router.push(
      createUrl({
        ...params,
        ...getFilterQueryParams(filters, getFilterQueryParam),
        activeTab: undefined,
      })
    );
  };

  const resetFilters = () => {
    if (cleanupFn) {
      cleanupFn();
    }

    void router.push(
      createUrl({
        asc: params.asc,
        sort: params.sort,
      })
    );
  };

  const handleSearchChange = (query: string) => {
    if (cleanupFn) {
      cleanupFn();
    }

    void router.push(
      createUrl({
        ...params,
        after: undefined,
        before: undefined,
        activeTab: undefined,
        query: query?.trim(),
      })
    );
  };

  return [changeFilters, resetFilters, handleSearchChange];
}

export default useFilterHandlers;
