import urlJoin from 'url-join';
import type {
  BulkAction,
  Dialog,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog,
} from '@tempo/dashboard/oldSrc/types';
import { stringifyQs } from '@tempo/dashboard/oldSrc/utils/urls';

const groupSection = '/permission-groups/';

export const groupListPath = groupSection;

export type GroupListUrlDialog = 'remove' | TabActionDialog;
export enum GroupListUrlOrdering {
  name = 'name',
}
export type GroupListUrlSort = Sort<GroupListUrlOrdering>;
export type GroupListUrlQueryParams = Dialog<GroupListUrlDialog> &
  Pagination &
  GroupListUrlSort &
  SingleAction;
export const groupListUrl = (params?: GroupListUrlQueryParams) => ({
  pathname: groupListPath,
  query: params,
});

export const groupAddPath = urlJoin(groupSection, 'add');
export const groupAddUrl = groupAddPath;

export enum MembersListUrlOrdering {
  name = 'name',
  email = 'email',
}
export type MembersListUrlSort = Sort<MembersListUrlOrdering>;

export const groupDetailsPath = (id: string) => urlJoin(groupSection, id);
export type GroupDetailsUrlDialog = 'remove' | 'assign' | 'unassign' | 'unassignError';
export type GroupDetailsUrlQueryParams = BulkAction &
  Pagination &
  MembersListUrlSort &
  Dialog<GroupDetailsUrlDialog>;

export const groupDetailsUrl = (id: string, params?: GroupDetailsUrlQueryParams) =>
  groupDetailsPath(encodeURIComponent(id)) + '?' + stringifyQs(params);
