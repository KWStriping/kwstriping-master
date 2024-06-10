import { date } from '@tempo/fixtures';
import { OrderStatusFilter, ChargeStatus } from '@tempo/graphql';
import {
  createFilterStructure,
  OrderFilterGiftCard,
} from '@dashboard/components/orders/OrderListPage';
import { OrderListUrlFilters } from '@tempo/orders/urls';
import { getFilterQueryParams } from '@tempo/utils/filters';
import { stringifyQs } from '@tempo/utils/urls';
import { getExistingKeys, setFilterOptsStatus } from '@test/filters';
import { config } from '@test/intl';

import { getFilterQueryParam, getFilterVariables } from './filters';

describe('Filtering query params', () => {
  it('should be empty object if no params given', () => {
    const params: OrderListUrlFilters = {};
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(0);
  });

  it('should not be empty object if params given', () => {
    const params: OrderListUrlFilters = {
      createdFrom: date.from,
      createdTo: date.to,
      customer: 'email@example.com',
      status: [OrderStatusFilter.Fulfilled, OrderStatusFilter.PartiallyFulfilled],
    };
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(3);
  });
});

describe('Filtering URL params', () => {
  const intl = createIntl(config);

  const filters = createFilterStructure(t, {
    preorder: {
      active: false,
      value: false,
    },
    clickAndCollect: {
      active: false,
      value: false,
    },
    channel: {
      active: false,
      value: [
        {
          label: 'Channel PLN',
          value: 'channelId',
        },
      ],
    },
    created: {
      active: false,
      value: {
        max: date.to,
        min: date.from,
      },
    },
    customer: {
      active: false,
      value: 'email@example.com',
    },
    status: {
      active: false,
      value: [OrderStatusFilter.Fulfilled, OrderStatusFilter.PartiallyFulfilled],
    },
    paymentStatus: {
      active: false,
      value: [ChargeStatus.FullyCharged, ChargeStatus.PartiallyCharged],
    },
    giftCard: {
      active: false,
      value: [OrderFilterGiftCard.paid, OrderFilterGiftCard.bought],
    },
    metadata: {
      active: false,
      value: [
        {
          key: '',
          value: '',
        },
      ],
    },
  });

  it('should be empty if no active filters', () => {
    const filterQueryParams = getFilterQueryParams(filters, getFilterQueryParam);

    expect(getExistingKeys(filterQueryParams)).toHaveLength(0);
  });

  it('should not be empty if active filters are present', () => {
    const filterQueryParams = getFilterQueryParams(
      setFilterOptsStatus(filters, true),
      getFilterQueryParam
    );

    expect(filterQueryParams).toMatchSnapshot();
    expect(stringifyQs(filterQueryParams)).toMatchSnapshot();
  });
});
