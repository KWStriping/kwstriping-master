import type { FilterElement, FilterElementRegular } from '@dashboard/components/core/Filter';
import type { StaffListFilterOpts } from '@dashboard/components/staff/StaffListPage';
import { StaffFilterKeys } from '@dashboard/components/staff/StaffListPage';
import { StaffMemberStatus } from '@core/api/constants';
import type { UserInput } from '@core/api/graphql';
import { maybe } from '@dashboard/oldSrc/misc';
import { findValueInEnum } from '@core/utils/enums';

import type { StaffListUrlFilters, StaffListUrlQueryParams } from '@dashboard/oldSrc/staff/urls';
import { StaffListUrlFiltersEnum } from '@dashboard/oldSrc/staff/urls';
import {
  createFilterTabUtils,
  createFilterUtils,
  getSingleEnumValueQueryParam,
} from '@dashboard/oldSrc/utils/filters';

export const STAFF_FILTERS_KEY = 'staffFilters';

export function getFilterOpts(params: StaffListUrlFilters): StaffListFilterOpts {
  return {
    status: {
      active: maybe(() => params.status !== undefined, false),
      value: maybe(() => findValueInEnum(params.status, StaffMemberStatus)),
    },
  };
}

export function getFilterVariables(params: StaffListUrlFilters): UserInput {
  return {
    search: params.query,
    status: params.status ? findValueInEnum(params.status, StaffMemberStatus) : null,
  };
}

export function getFilterQueryParam(filter: FilterElement<StaffFilterKeys>): StaffListUrlFilters {
  const { name } = filter;

  switch (name) {
    case StaffFilterKeys.status:
      return getSingleEnumValueQueryParam(
        filter as FilterElementRegular<StaffFilterKeys.status>,
        StaffListUrlFiltersEnum.status,
        StaffMemberStatus
      );
  }
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<StaffListUrlFilters>(STAFF_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  StaffListUrlQueryParams,
  StaffListUrlFilters
>(StaffListUrlFiltersEnum);
