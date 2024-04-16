import type { GiftCardListUrlFilters } from './GiftCardListSearchAndFilters/types';
import type {
  ActiveTab,
  Dialog,
  Pagination,
  Search,
  SingleAction,
  Sort,
} from '@dashboard/oldSrc/types';

export type GiftCardListColummns = 'giftCardCode' | 'tag' | 'balance' | 'usedBy' | 'product';

export enum GiftCardUrlOrdering {
  usedBy = 'usedBy',
  balance = 'balance',
  product = 'product',
}

export type GiftCardUrlSort = Sort<GiftCardUrlOrdering>;

export enum GiftCardListActionParamsEnum {
  Create = 'gift-card-create',
  Delete = 'gift-card-delete',
  SaveSearch = 'save-search',
  DeleteSearch = 'delete-search',
  BulkCreate = 'gift-card-bulk-create',
  Export = 'gift-card-export',
}

export type GiftCardListUrlQueryParams = Pagination &
  Dialog<GiftCardListActionParamsEnum> &
  SingleAction &
  GiftCardListUrlFilters &
  GiftCardUrlSort &
  ActiveTab &
  Search;
