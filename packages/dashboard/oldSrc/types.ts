import type { FilterElement, IFilter } from '@dashboard/components/core/Filter';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import type { UserPermissionFragment } from '@core/api/graphql';
import type { ReactNode } from 'react';

export interface UserError {
  field: Maybe<string>;
  message?: Maybe<string>;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export interface ListSettings<TColumn extends string = string> {
  columns?: TColumn[];
  rowNumber: number;
}

export enum ListViews {
  AppsList = 'APPS_LIST',
  AttributeList = 'ATTRIBUTE_LIST',
  ValueList = 'ATTRIBUTE_VALUE_LIST',
  CategoryList = 'CATEGORY_LIST',
  CollectionList = 'COLLECTION_LIST',
  CustomerList = 'CUSTOMER_LIST',
  DraftList = 'DRAFT_LIST',
  MediaList = 'MEDIA_LIST',
  NavigationList = 'NAVIGATION_LIST',
  OrderList = 'ORDER_LIST',
  PagesList = 'PAGES_LIST',
  PageKlassesList = 'PAGE_TYPES_LIST',
  PluginsList = 'PLUGIN_LIST',
  ProductList = 'PRODUCT_LIST',
  GroupList = 'PERMISSION_GROUP_LIST',
  ProductKlassList = 'PRODUCT_TYPE_LIST',
  SalesList = 'SALES_LIST',
  ShippingMethodsList = 'SHIPPING_METHODS_LIST',
  StaffMembersList = 'STAFF_MEMBERS_LIST',
  VoucherList = 'VOUCHER_LIST',
  WarehouseList = 'WAREHOUSE_LIST',
  WebhookList = 'WEBHOOK_LIST',
  TranslationValueList = 'TRANSLATION_ATTRIBUTE_VALUE_LIST',
  GiftCardList = 'GIFT_CARD_LIST',
}

export interface ListProps<TColumns extends string = string> {
  disabled: boolean;
  settings?: ListSettings<TColumns>;
  onUpdateListSettings?: <T extends keyof ListSettings<TColumns>>(
    key: T,
    value: ListSettings<TColumns>[T]
  ) => void;
  onListSettingsReset?: () => void;
  filterDependency?: FilterElement;
}

export interface PaginateListProps {
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  onNextPage: () => void;
  onPreviousPage: () => void;
}

export interface SortPage<TSortKey extends string> {
  sort: Sort<TSortKey>;
  onSort: (field: TSortKey, id?: string) => void;
}

/**
 * @param toggle Will be use to change status of item
 * @param isChecked Returns true for ids of chosen items
 * @param selected  Number of chosen items.
 */

export interface ListActionsWithoutToolbar {
  toggle: (id: string) => void;
  toggleAll: (items: Node[], selected: number) => void;
  isChecked: (id: string) => boolean;
  selected: number;
}
export type TabListActions<TToolbars extends string> = ListActionsWithoutToolbar &
  Record<TToolbars, ReactNode | ReactNode[]>;
export interface ListActions extends ListActionsWithoutToolbar {
  toolbar: ReactNode;
}
export interface PageListProps<TColumns extends string = string> extends ListProps<TColumns> {
  defaultSettings?: ListSettings<TColumns>;
}

export interface SearchProps {
  onSearchChange: (value: string) => void;
}
export interface SearchPageProps extends SearchProps {
  initialSearch: string;
}
export interface FilterPageProps<TKeys extends string, TOpts extends {}>
  extends FilterProps<TKeys>,
    SearchPageProps,
    TabPageProps {
  filterOpts: TOpts;
}

export interface FilterProps<TKeys extends string> {
  currencySymbol?: string;
  onFilterChange: (filter: IFilter<TKeys>) => void;
  onFilterAttributeFocus?: (id?: string) => void;
}

export interface TabPageProps {
  currentTab: number;
  tabs: string[];
  onAll: () => void;
  onTabChange: (tab: number) => void;
  onTabDelete: () => void;
  onTabSave: () => void;
}

export interface ChannelProps {
  selectedChannelId: string;
}

export interface Node {
  id: string;
}
export interface SlugNode {
  slug: string;
}

export interface TagNode {
  tag: string;
}

export type Pagination = Partial<{
  after: string;
  before: string;
}>;

export type Dialog<TDialog extends string> = Partial<{
  action: TDialog;
}>;
export type ActiveTab<TTab extends string = string> = Partial<{
  activeTab: TTab;
}>;
export type Filters<TFilters extends string> = Partial<Record<TFilters, string>>;
export type FiltersWithMultipleValues<TFilters extends string> = Partial<
  Record<TFilters, string[]>
>;
export type FiltersAsDictWithMultipleValues<TFilters extends string> = Partial<
  Record<TFilters, Record<string, string[]>>
>;
export type FiltersWithKeyValueValues<TFilters extends string> = Partial<
  Record<TFilters, KeyValue[]>
>;
export type Search = Partial<{
  query: string;
}>;
export type SingleAction<Key extends string = 'id'> = Partial<Record<Key, string>>;
export type Sort<TSort extends string = string> = Partial<{
  asc: boolean;
  sort: TSort;
}>;
export type BulkAction = Partial<{
  ids: string[];
}>;

export interface ReorderEvent {
  oldIndex: number;
  newIndex: number;
}
export type ReorderAction = (event: ReorderEvent) => void;

export interface FetchMoreProps {
  loading: boolean;
  hasMore: boolean;
  totalCount?: number;
  onFetchMore: () => void;
}

export type TabActionDialog = 'save-search' | 'delete-search';

export interface UserPermissionProps {
  userPermissions: UserPermissionFragment[];
}

export interface KeyValue {
  key: string;
  value?: string;
}

export type MinMax = Record<'min' | 'max', string>;

export interface FilterOpts<T> {
  active: boolean;
  value: T;
}

export interface AutocompleteFilterOpts
  extends Partial<FetchMoreProps>,
    Partial<SearchPageProps> {
  choices: MultiAutocompleteChoiceType[];
  displayValues: MultiAutocompleteChoiceType[];
}

export type Ids = string[];

export enum StatusType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export type RelayToFlat<T extends { edges: Array<{ node: unknown }> }> = Array<
  T['edges'][0]['node']
>;
