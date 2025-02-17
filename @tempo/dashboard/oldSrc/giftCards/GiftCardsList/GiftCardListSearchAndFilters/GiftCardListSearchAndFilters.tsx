import * as m from '@paraglide/messages';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { useSearch } from '@tempo/api/hooks';
import {
  GiftCardCurrenciesDocument,
  SearchCustomersDocument,
} from '@tempo/api/generated/graphql';
import compact from 'lodash-es/compact';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useGiftCardListDialogs } from '../providers/GiftCardListDialogsProvider';
import { useGiftCardList } from '../providers/GiftCardListProvider';
import { GiftCardListActionParamsEnum } from '../types';
import {
  useFilterStructure,
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFiltersCurrentTab,
  getFilterTabs,
  saveFilterTab,
} from './filters';
import {
  giftCardListFilterErrorMessages as errorMessages,
  giftCardListSearchAndFiltersMessages as messages,
} from './messages';
import FilterBar from '@tempo/dashboard/components/bars/FilterBar';
import DeleteFilterTabDialog from '@tempo/dashboard/components/dialogs/DeleteFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@tempo/dashboard/components/dialogs/SaveFilterTabDialog';
import SaveFilterTabDialog from '@tempo/dashboard/components/dialogs/SaveFilterTabDialog';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@tempo/dashboard/oldSrc/config';
import { giftCardListUrl } from '@tempo/dashboard/oldSrc/giftCards/urls';
import useGiftCardTagsSearch from '@tempo/dashboard/oldSrc/searches/useGiftCardTagsSearch';
import useProductSearch from '@tempo/dashboard/oldSrc/searches/useProductSearch';
import useFilterHandlers from '@tempo/dashboard/oldSrc/utils/handlers/filterHandlers';

const GiftCardListSearchAndFilters: FC = () => {
  const router = useRouter();

  const { reset, params } = useGiftCardList();

  const { onClose, openSearchDeleteDialog, openSearchSaveDialog } = useGiftCardListDialogs();

  const defaultSearchVariables = {
    variables: { ...DEFAULT_INITIAL_SEARCH_DATA, first: 5 },
  };

  const {
    loadMore: fetchMoreCustomers,
    search: searchCustomers,
    result: searchCustomersResult,
  } = useSearch(SearchCustomersDocument, defaultSearchVariables);

  const {
    loadMore: fetchMoreProducts,
    search: searchProducts,
    result: searchProductsResult,
  } = useProductSearch(defaultSearchVariables);

  const {
    loadMore: fetchMoreGiftCardTags,
    search: searchGiftCardTags,
    result: searchGiftCardTagsResult,
  } = useGiftCardTagsSearch(defaultSearchVariables);

  const { data: giftCardCurrenciesData, loading: loadingGiftCardCurrencies } = useQuery(
    GiftCardCurrenciesDocument,
    {}
  );

  const filterOpts = getFilterOpts({
    params,
    productSearchProps: {
      ...getSearchFetchMoreProps(searchProductsResult, fetchMoreProducts),
      onSearchChange: searchProducts,
    },
    products: mapEdgesToItems(searchProductsResult?.data?.search),
    currencies: giftCardCurrenciesData?.giftCardCurrencies,
    loadingCurrencies: loadingGiftCardCurrencies,
    customerSearchProps: {
      ...getSearchFetchMoreProps(searchCustomersResult, fetchMoreCustomers),
      onSearchChange: searchCustomers,
    },
    customers: mapEdgesToItems(searchCustomersResult?.data?.search),
    tagSearchProps: {
      ...getSearchFetchMoreProps(searchGiftCardTagsResult, fetchMoreGiftCardTags),
      onSearchChange: searchGiftCardTags,
    },
    tags: compact(
      mapEdgesToItems(searchGiftCardTagsResult?.data?.search)?.map(({ name }) => name)
    ),
  });

  const filterStructure = useFilterStructure(filterOpts);

  const tabs = getFilterTabs();
  const currentTab = getFiltersCurrentTab(params, tabs);

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    createUrl: giftCardListUrl,
    getFilterQueryParam,
    cleanupFn: reset,
  });

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      giftCardListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/gift-cards');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  return (
    <>
      <FilterBar
        errorMessages={{
          initialBalanceAmount: errorMessages.balanceAmount,
          initialBalanceCurrency: errorMessages.balanceCurrency,
          currentBalanceAmount: errorMessages.balanceAmount,
          currentBalanceCurrency: errorMessages.balanceCurrency,
        }}
        tabs={tabs.map((tab) => tab.name)}
        currentTab={currentTab}
        structure={filterStructure}
        initialSearch={params?.query || ''}
        onAll={resetFilters}
        onFilterChange={changeFilters}
        onSearchChange={handleSearchChange}
        onTabChange={handleTabChange}
        onTabDelete={openSearchDeleteDialog}
        onTabSave={openSearchSaveDialog}
        searchPlaceholder={
          m.dashboard_searchPlaceholder({
            exampleGiftCardCode: '21F1-39DY-V4U2',
          }) ?? messages.searchPlaceholder.defaultMessage
        }
        allTabLabel={m.dashboard_efaultTabLabel() ?? messages.defaultTabLabel.defaultMessage}
      />
      <SaveFilterTabDialog
        open={params.action === GiftCardListActionParamsEnum.SaveSearch}
        confirmButtonState="default"
        onClose={onClose}
        onSubmit={handleTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === GiftCardListActionParamsEnum.DeleteSearch}
        confirmButtonState="default"
        onClose={onClose}
        onSubmit={handleTabDelete}
        tabName={tabs[currentTab - 1]?.name ?? '...'}
      />
    </>
  );
};

export default GiftCardListSearchAndFilters;
