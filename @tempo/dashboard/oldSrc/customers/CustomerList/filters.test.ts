import { createFilterStructure } from '@dashboard/components/customers/CustomerListPage';
import { CustomerListUrlFilters } from '@tempo/customers/urls';
import { date } from '@tempo/fixtures';
import { PermissionCode } from '@tempo/graphql';
import { getFilterQueryParams } from '@tempo/utils/filters';
import { stringifyQs } from '@tempo/utils/urls';
import { getExistingKeys, setFilterOptsStatus } from '@test/filters';
import { config } from '@test/intl';

import { getFilterQueryParam, getFilterVariables } from './filters';

describe('Filtering query params', () => {
  it('should be empty object if no params given', () => {
    const params: CustomerListUrlFilters = {};
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(0);
  });

  it('should not be empty object if params given', () => {
    const params: CustomerListUrlFilters = {
      joinedFrom: date.from,
      numberOfOrdersTo: '5',
    };
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(2);
  });
});

describe('Filtering URL params', () => {
  const intl = createIntl(config);

  const filters = createFilterStructure(
    {
      joined: {
        active: false,
        value: {
          max: date.to,
          min: date.from,
        },
      },
      numberOfOrders: {
        active: false,
        value: {
          max: '5',
          min: '1',
        },
      },
    },
    [
      {
        code: PermissionCode.ManageUsers,
        name: 'Manage customers.',
        __typename: 'UserPermission',
      },
      {
        code: PermissionCode.ManageOrders,
        name: 'Manage orders..',
        __typename: 'UserPermission',
      },
    ]
  );

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
