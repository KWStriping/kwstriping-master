import { createFilterStructure } from '@dashboard/components/discounts/VoucherListPage';
import { VoucherListUrlFilters } from '@tempo/discounts/urls';
import { date } from '@tempo/fixtures';
import { DiscountStatus, VoucherDiscountType } from '@tempo/graphql';
import { getFilterQueryParams } from '@tempo/utils/filters';
import { stringifyQs } from '@tempo/utils/urls';
import { getExistingKeys, setFilterOptsStatus } from '@test/filters';
import { config } from '@test/intl';

import { getFilterQueryParam, getFilterVariables } from './filters';

describe('Filtering query params', () => {
  it('should be empty object if no params given', () => {
    const params: VoucherListUrlFilters = {};
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(0);
  });

  it('should not be empty object if params given', () => {
    const params: VoucherListUrlFilters = {
      startedFrom: date.from,
      startedTo: date.to,
      status: [DiscountStatus.ACTIVE, DiscountStatus.EXPIRED],
      timesUsedFrom: date.from,
      timesUsedTo: date.to,
      type: [VoucherDiscountType.FIXED, VoucherDiscountType.SHIPPING],
    };
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(4);
  });
});

describe('Filtering URL params', () => {
  const intl = createIntl(config);

  const filters = createFilterStructure(t, {
    channel: {
      active: false,
      choices: [
        {
          value: 'default',
          label: 'Default channel',
        },
      ],
      value: 'default',
    },
    saleType: {
      active: false,
      value: [VoucherDiscountType.FIXED, VoucherDiscountType.SHIPPING],
    },
    started: {
      active: false,
      value: {
        max: date.to,
        min: date.from,
      },
    },
    status: {
      active: false,
      value: [DiscountStatus.ACTIVE, DiscountStatus.EXPIRED],
    },
    timesUsed: {
      active: false,
      value: {
        max: '6',
        min: '1',
      },
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
