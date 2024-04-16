import { StaffMemberStatus } from '@tempo/graphql';
import { createFilterStructure } from '@dashboard/components/staff/StaffListPage';
import { StaffListUrlFilters } from '@tempo/staff/urls';
import { getFilterQueryParams } from '@tempo/utils/filters';
import { stringifyQs } from '@tempo/utils/urls';
import { getExistingKeys, setFilterOptsStatus } from '@test/filters';
import { config } from '@test/intl';

import { getFilterQueryParam, getFilterVariables } from './filters';

describe('Filtering query params', () => {
  it('should be empty object if no params given', () => {
    const params: StaffListUrlFilters = {};
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(0);
  });

  it('should not be empty object if params given', () => {
    const params: StaffListUrlFilters = {
      status: StaffMemberStatus.ACTIVE,
    };
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(1);
  });
});

describe('Filtering URL params', () => {
  const intl = createIntl(config);

  const filters = createFilterStructure(t, {
    status: {
      active: false,
      value: StaffMemberStatus.ACTIVE,
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
