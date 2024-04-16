import { findInEnum, findValueInEnum } from '@core/utils/enums';
import type {
  FilterElement,
  FilterElementKeyValue,
  FilterElementRegular,
} from '@dashboard/components/core/Filter';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import type { OrderListFilterOpts } from '@dashboard/components/orders/OrderListPage/filters';
import {
  OrderFilterGiftCard,
  OrderFilterKeys,
} from '@dashboard/components/orders/OrderListPage/filters';
import { OrderStatusFilter, ChargeStatus } from '@core/api/constants';
import type { OrderFilter } from '@core/api/graphql';

import type { OrderListUrlFilters, OrderListUrlQueryParams } from '@dashboard/oldSrc/orders/urls';
import {
  OrderListFitersWithKeyValueValues,
  OrderListUrlFiltersEnum,
  OrderListUrlFiltersWithMultipleValues,
} from '@dashboard/oldSrc/orders/urls';
import {
  createFilterTabUtils,
  createFilterUtils,
  dedupeFilter,
  getGteLteVariables,
  getKeyValueQueryParam,
  getMinMaxQueryParam,
  getMultipleEnumValueQueryParam,
  getMultipleValueQueryParam,
  getSingleValueQueryParam,
} from '@dashboard/oldSrc/utils/filters';

export const ORDER_FILTERS_KEY = 'orderFilters';

export function getFilterOpts(
  params: OrderListUrlFilters,
  channels: MultiAutocompleteChoiceType[]
): OrderListFilterOpts {
  return {
    clickAndCollect: {
      active: params.clickAndCollect !== undefined,
      value: params.clickAndCollect ?? true,
    },
    preorder: {
      active: params.preorder !== undefined,
      value: params.preorder ?? true,
    },
    channel: channels
      ? {
        active: params?.channel !== undefined,
        value: channels,
      }
      : null,
    created: {
      active: [params?.createdFrom, params?.createdTo].some((field) => field !== undefined),
      value: {
        max: params?.createdTo || '',
        min: params?.createdFrom || '',
      },
    },
    giftCard: {
      active: params?.giftCard !== undefined,
      value: params.giftCard?.length
        ? params.giftCard?.map((status) => findValueInEnum(status, OrderFilterGiftCard))
        : ([] as OrderFilterGiftCard[]),
    },
    customer: {
      active: !!params?.customer,
      value: params?.customer,
    },
    status: {
      active: params?.status !== undefined,
      value: dedupeFilter(
        params.status?.map((status) => findValueInEnum(status, OrderStatusFilter)) || []
      ),
    },
    paymentStatus: {
      active: params?.paymentStatus !== undefined,
      value: dedupeFilter(
        params.paymentStatus?.map((paymentStatus) =>
          findValueInEnum(paymentStatus, ChargeStatus)
        ) || []
      ),
    },
    metadata: {
      active: !!params?.metadata?.length,
      value: [
        ...(params?.metadata ? params.metadata?.filter((pair) => pair?.key !== undefined) : []),
      ],
    },
  };
}

export function getFilterVariables(params: OrderListUrlFilters): OrderFilter {
  return {
    channels: params.channel as unknown as string[],
    created: getGteLteVariables({
      gte: params.createdFrom,
      lte: params.createdTo,
    }),
    customer: params.customer,
    search: params.query,
    status: params?.status?.map((status) => findInEnum(status, OrderStatusFilter)),
    paymentStatus: params?.paymentStatus?.map((paymentStatus) =>
      findInEnum(paymentStatus, ChargeStatus)
    ),
    isClickAndCollect:
      params.clickAndCollect !== undefined ? !!params.clickAndCollect : undefined,
    isPreorder: params.preorder !== undefined ? !!params.preorder : undefined,
    giftCardBought:
      params?.giftCard?.some((param) => param === OrderFilterGiftCard.bought) || undefined,
    giftCardUsed:
      params?.giftCard?.some((param) => param === OrderFilterGiftCard.paid) || undefined,
    metadata: params?.metadata,
  };
}

export function getFilterQueryParam(filter: FilterElement<OrderFilterKeys>): OrderListUrlFilters {
  const { name } = filter;

  switch (name) {
    case OrderFilterKeys.clickAndCollect:
      return getSingleValueQueryParam(filter, OrderListUrlFiltersEnum.clickAndCollect);
    case OrderFilterKeys.preorder:
      return getSingleValueQueryParam(filter, OrderListUrlFiltersEnum.preorder);

    case OrderFilterKeys.created:
      return getMinMaxQueryParam(
        filter,
        OrderListUrlFiltersEnum.createdFrom,
        OrderListUrlFiltersEnum.createdTo
      );

    case OrderFilterKeys.status:
      return getMultipleEnumValueQueryParam(
        filter as FilterElementRegular<OrderFilterKeys.status>,
        OrderListUrlFiltersWithMultipleValues.status,
        OrderStatusFilter
      );

    case OrderFilterKeys.paymentStatus:
      return getMultipleEnumValueQueryParam(
        filter as FilterElementRegular<OrderFilterKeys.paymentStatus>,
        OrderListUrlFiltersWithMultipleValues.paymentStatus,
        ChargeStatus
      );

    case OrderFilterKeys.channel:
      return getMultipleValueQueryParam(filter, OrderListUrlFiltersWithMultipleValues.channel);

    case OrderFilterKeys.customer:
      return getSingleValueQueryParam(filter, OrderListUrlFiltersEnum.customer);

    case OrderFilterKeys.giftCard:
      return getMultipleEnumValueQueryParam(
        filter as FilterElementRegular<OrderFilterKeys.giftCard>,
        OrderListUrlFiltersWithMultipleValues.giftCard,
        OrderFilterGiftCard
      );

    case OrderFilterKeys.metadata:
      return getKeyValueQueryParam(
        filter as FilterElementKeyValue<OrderFilterKeys.metadata>,
        OrderListFitersWithKeyValueValues.metadata
      );
  }
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<OrderListUrlFilters>(ORDER_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  OrderListUrlQueryParams,
  OrderListUrlFilters
>({
  ...OrderListUrlFiltersEnum,
  ...OrderListUrlFiltersWithMultipleValues,
  ...OrderListFitersWithKeyValueValues,
});
