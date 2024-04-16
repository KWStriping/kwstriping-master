import { createFilterStructure } from '@dashboard/components/discounts/SaleListPage';
import { SaleListUrlFilters } from '@tempo/discounts/urls';
import { date } from '@tempo/fixtures';
import { DiscountStatus, DiscountValueType } from '@tempo/graphql';
import { getFilterQueryParams } from '@tempo/utils/filters';
import { stringifyQs } from '@tempo/utils/urls';
import { getExistingKeys, setFilterOptsStatus } from '@test/filters';
import { config } from '@test/intl';

import { getFilterQueryParam, getFilterVariables } from './filters';

describe('Filtering query params', () => {
  it('should be empty object if no params given', () => {
    const params: SaleListUrlFilters = {};
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(0);
  });

  it('should not be empty object if params given', () => {
    const params: SaleListUrlFilters = {
      startedFrom: date.from,
      startedTo: date.to,
      status: [DiscountStatus.ACTIVE, DiscountStatus.EXPIRED],
      type: DiscountValueType.FIXED,
    };
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(3);
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
      value: DiscountValueType.FIXED,
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
