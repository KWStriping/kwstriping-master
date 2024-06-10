// import type { MultiAutocompleteChoiceType } from '@/components/fields/MultiAutocompleteSelectField';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';

export type ClassNames<Keys extends string> = Partial<Record<Keys, string>>;

export type { EmotionCache } from '@emotion/cache';

export interface UserError {
  field: string | null;
  message?: string | null;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}

export interface ListSettings<TColumn extends string = string> {
  columns?: TColumn[];
  rowNumber: number;
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

export interface SearchProps {
  onSearchChange: (value: string) => void;
}
export interface SearchPageProps extends SearchProps {
  initialSearch: string;
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

export interface MutationResultAdditionalProps {
  status: ConfirmButtonTransitionState;
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

// export interface AutocompleteFilterOpts
//   extends Partial<FetchMoreProps>,
//     Partial<SearchPageProps> {
//   choices: MultiAutocompleteChoiceType[];
//   displayValues: MultiAutocompleteChoiceType[];
// }

export type Ids = string[];

export enum StatusType {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export type RelayToFlat<T extends { edges: Array<{ node: unknown }> }> = Array<
  T['edges'][0]['node']
>;
