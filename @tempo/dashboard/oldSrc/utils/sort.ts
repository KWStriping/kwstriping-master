import { findValueInEnum } from '@tempo/utils/enums';
import { OrderingDirection } from '@tempo/api/generated/constants';
import type { Sort } from '../types';
import type { TableCellHeaderArrowDirection } from '@tempo/dashboard/components/tables/TableCellHeader';

export function getSortUrlVariables<TSortKey extends string>(
  field: TSortKey,
  params: Sort<TSortKey>
): Sort<TSortKey> {
  if (field === params.sort) {
    return {
      asc: !params.asc,
      sort: field,
    };
  }

  return {
    asc: true,
    sort: field,
  };
}

export function getOrderingDirection(asc: boolean): OrderingDirection {
  return asc ? OrderingDirection.Asc : OrderingDirection.Desc;
}

export function getArrowDirection(asc: boolean): TableCellHeaderArrowDirection {
  return asc ? 'asc' : 'desc';
}

// Extracts Sort object from the querystring
export function getSortParams<TParams extends Sort<TFields>, TFields extends string>(
  params: TParams
): Sort<TFields> {
  return {
    asc: params.asc,
    sort: params.sort,
  };
}

// Appends Sort object to the querystring params
export function asSortParams<
  TParams extends Record<unknown, string>,
  TFields extends Record<unknown, string>,
>(
  params: TParams,
  fields: TFields,
  defaultField?: keyof TFields,
  defaultOrder?: boolean
): TParams & Sort {
  return {
    ...params,
    asc: parseBoolean(params.asc, defaultOrder === undefined ? true : defaultOrder),
    sort: params.sort ? findValueInEnum(params.sort, fields) : defaultField?.toString() || 'name',
  };
}

interface OrderingInput<T extends string> {
  direction: OrderingDirection;
  field: T;
}
type GetSortQueryField<TUrlField extends string, TOrdering extends string> = (
  sort: TUrlField
) => TOrdering;
type GetSortQueryVariables<TOrdering extends string, TParams extends Record<unknown, unknown>> = (
  params: TParams
) => OrderingInput<TOrdering>;
export function createGetSortQueryVariables<
  TUrlField extends string,
  TOrdering extends string,
  TParams extends Record<unknown, unknown>,
>(
  getSortQueryField: GetSortQueryField<TUrlField, TOrdering>
): GetSortQueryVariables<TOrdering, TParams> {
  return (params: TParams) => {
    const field = getSortQueryField(params.sort);

    if (field) {
      return {
        direction: getOrderingDirection(params.asc),
        field,
      };
    }

    return undefined;
  };
}
