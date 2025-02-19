import type { SearchVariables } from '@tempo/api/hooks/useSearch';
import packageInfo from '../package.json';
import type { ListSettings, Pagination } from './types';
import { ListViews } from './types';

if (!process.env.NEXT_PUBLIC_API_URL) throw new Error('API_URL is not defined');

export const getAppDefaultMountPath = () => '/';
export const getAppMountPath = () => process.env.BASE_PATH || getAppDefaultMountPath();
export const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL as string;
export const SW_INTERVAL = parseInt(process.env.SW_INTERVAL ?? '300', 10);
export const IS_CLOUD_INSTANCE = process.env.IS_CLOUD_INSTANCE === 'true';
export const MARKETPLACE_URL = process.env.MARKETPLACE_URL;
export const MARKETPLACE_SALEOR_APPS_PAGE_PATH = process.env.SALEOR_APPS_PAGE_PATH;
export const MARKETPLACE_SALEOR_APPS_JSON_PATH = process.env.SALEOR_APPS_JSON_PATH;
export const MARKETPLACE_APP_TEMPLATE_GALLERY_PATH = process.env.APP_TEMPLATE_GALLERY_PATH;

export const DEFAULT_INITIAL_SEARCH_DATA: SearchVariables = {
  after: undefined,
  first: 20,
  query: '',
};

export const DEFAULT_INITIAL_PAGINATION_DATA: Pagination = {
  after: undefined,
  before: undefined,
};

export const PAGINATE_BY = 20;
export const VALUES_PAGINATE_BY = 10;

export type ProductListColumns = 'productKlass' | 'availability' | 'price' | 'date';

export type AppListViewSettings = Record<ListViews, ListSettings>;

export const defaultListSettings: AppListViewSettings = {
  [ListViews.AppsList]: {
    rowNumber: 100,
  },
  [ListViews.AttributeList]: {
    rowNumber: 10,
  },
  [ListViews.ValueList]: {
    rowNumber: 10,
  },
  [ListViews.CategoryList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.CollectionList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.CustomerList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.DraftList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.MediaList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.NavigationList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.OrderList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.PagesList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.PageKlassesList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.PluginsList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.ProductList]: {
    columns: ['availability', 'price', 'productKlass', 'date'],
    rowNumber: PAGINATE_BY,
  },
  [ListViews.ProductKlassList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.SalesList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.ShippingMethodsList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.StaffMembersList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.GroupList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.VoucherList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.WarehouseList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.WebhookList]: {
    rowNumber: PAGINATE_BY,
  },
  [ListViews.TranslationValueList]: {
    rowNumber: 10,
  },
  [ListViews.GiftCardList]: {
    rowNumber: PAGINATE_BY,
  },
};

export const APP_VERSION = packageInfo.version;

export const DEMO_MODE = process.env.DEMO_MODE === 'true';
export const GTM_ID = process.env.GTM_ID;

export const DEFAULT_NOTIFICATION_SHOW_TIME = 3000;
