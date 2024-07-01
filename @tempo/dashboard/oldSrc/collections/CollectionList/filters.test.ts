import { createFilterStructure } from '@tempo/dashboard/components/collections/CollectionListPage';
import { CollectionListUrlFilters } from '@tempo/collections/urls';
import { CollectionPublished } from '@tempo/graphql';
import { getFilterQueryParams } from '@tempo/utils/filters';
import { stringifyQs } from '@tempo/utils/urls';
import { getExistingKeys, setFilterOptsStatus } from '@test/filters';
import { config } from '@test/intl';

import { getFilterQueryParam, getFilterVariables } from './filters';

describe('Filtering query params', () => {
  it('should be empty object if no params given', () => {
    const params: CollectionListUrlFilters = {};
    const filterVariables = getFilterVariables(params);

    expect(getExistingKeys(filterVariables)).toHaveLength(0);
  });

  it('should not be empty object if params given', () => {
    const params: CollectionListUrlFilters = {
      status: CollectionPublished.PUBLISHED,
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
      value: CollectionPublished.PUBLISHED,
    },
    channel: undefined,
  });

  it('should be empty if no active filters', () => {
    const filterQueryParams = getFilterQueryParams(filters, getFilterQueryParam);

    expect(getExistingKeys(filterQueryParams)).toHaveLength(0);
  });

  it('should not be empty if active filters are present', () => {
    const filters = createFilterStructure(t, {
      status: {
        active: true,
        value: CollectionPublished.PUBLISHED,
      },
      channel: undefined,
    });

    const filterQueryParams = getFilterQueryParams(
      setFilterOptsStatus(filters, true),
      getFilterQueryParam
    );

    expect(filterQueryParams).toMatchSnapshot();
    expect(stringifyQs(filterQueryParams)).toMatchSnapshot();
  });
});
