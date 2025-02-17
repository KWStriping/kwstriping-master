import urlJoin from 'url-join';

import type {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  Sort,
  TabActionDialog,
} from '../types';
import { stringifyQs } from '@tempo/dashboard/oldSrc/utils/urls';

const staffSection = '/staff/';

export const staffListPath = staffSection;
export enum StaffListUrlFiltersEnum {
  status = 'status',
  query = 'query',
}
export type StaffListUrlFilters = Filters<StaffListUrlFiltersEnum>;
export type StaffListUrlDialog = 'add' | 'remove' | TabActionDialog;
export enum StaffListUrlOrdering {
  name = 'name',
  email = 'email',
}
export type StaffListUrlSort = Sort<StaffListUrlOrdering>;
export type StaffListUrlQueryParams = ActiveTab &
  BulkAction &
  Dialog<StaffListUrlDialog> &
  Pagination &
  StaffListUrlFilters &
  StaffListUrlSort;

export const staffMemberDetailsPath = (id: string) => urlJoin(staffSection, id);
export type StaffMemberDetailsUrlDialog = 'change-password' | 'remove' | 'remove-avatar';
export type StaffMemberDetailsUrlQueryParams = Dialog<StaffMemberDetailsUrlDialog>;

export const staffMemberDetailsUrl = (id: string, params?: StaffMemberDetailsUrlQueryParams) =>
  staffMemberDetailsPath(encodeURIComponent(id)) + '?' + stringifyQs(params);
