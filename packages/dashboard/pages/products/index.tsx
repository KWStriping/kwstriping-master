import { Trans, useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useSearch } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { assert } from 'tsafe';
import { useShopLimitsQuery } from '@dashboard/components/core/Shop/queries';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import ProductExportDialog from '@dashboard/components/products/ProductExportDialog';
import ProductListPage from '@dashboard/components/products/ProductListPage';
import {
  getAttributeIdFromColumnValue,
  isAttributeColumnValue,
} from '@dashboard/components/products/ProductListPage/utils';
import ProductKlassPickerDialog from '@dashboard/components/products/ProductKlassPickerDialog';
import { graphql as gql } from '@core/api/gql';
import {
  SearchValuesDocument,
  SearchAttributesDocument,
  WarehouseListDocument,
  ProductListDocument,
  ProductCountDocument,
  ProductExportDocument,
  InitialProductFilterAttributesDocument,
  InitialProductFilterProductKlassesDocument,
  InitialProductFilterCollectionsDocument,
  DeleteProductsDocument,
  InitialProductFilterCategoriesDocument,
  GridAttributesDocument,
} from '@core/api/graphql';
import useBackgroundTask from '@dashboard/hooks/useBackgroundTask';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import { useSortRedirects } from '@dashboard/hooks/useSortRedirects';
import { filterable } from '@dashboard/oldSrc/attributes/utils/data';
import {
  defaultListSettings,
  DEFAULT_INITIAL_PAGINATION_DATA,
  DEFAULT_INITIAL_SEARCH_DATA,
} from '@dashboard/oldSrc/config';
import type { ProductListColumns } from '@dashboard/oldSrc/config';
import { Task } from '@dashboard/oldSrc/containers/BackgroundTasks/types';
import {
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
} from '@dashboard/oldSrc/products/ProductList/filters';
import {
  getAvailableProductKinds,
  getProductKindOpts,
} from '@dashboard/oldSrc/products/ProductList/utils';
import {
  canBeSorted,
  DEFAULT_SORT_KEY,
  getSortQueryVariables,
} from '@dashboard/oldSrc/products/sort';
import type {
  ProductListUrlDialog,
  ProductListUrlQueryParams,
  ProductListUrlOrdering,
} from '@dashboard/oldSrc/products/urls';
import { productAddUrl, productListUrl } from '@dashboard/oldSrc/products/urls';
import useAvailableInGridAttributesSearch from '@dashboard/oldSrc/searches/useAvailableInGridAttributesSearch';
import useCategorySearch from '@dashboard/oldSrc/searches/useCategorySearch';
import useCollectionSearch from '@dashboard/oldSrc/searches/useCollectionSearch';
import useProductKlassSearch from '@dashboard/oldSrc/searches/useProductKlassSearch';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';
import { getSortUrlVariables } from '@dashboard/oldSrc/utils/sort';

export const searchValues = gql(`
  query SearchValues($id: ID, $after: String, $first: Int!, $query: String!) {
    attribute(id: $id) {
      id
      values(after: $after, first: $first, filters: { search: $query }) {
        edges {
          node {
            ...ValueDetails
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`);

export const searchAttributes = gql(`
  query SearchAttributes($after: String, $first: Int!, $query: String!) {
    search: attributes(after: $after, first: $first, filters: { search: $query }) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const productExportMutation = gql(`
  mutation ProductExport($input: ExportProductsInput!) {
    exportProducts(data: $input) {
      result {
        ...ExportFile
      }
      errors {
        ...Error
      }
    }
  }
`);

export const ProductList = () => {
  const router = useRouter();
  const params = router.query;
  const {
    ids = [],
    channel: channelFromQueryParams,
    categories,
    collections,
    productKlasses,
  } = params;
  assert(Array.isArray(ids));
  const notify = useNotifier();
  const { queue } = useBackgroundTask();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
  const { updateListSettings, settings } = useListSettings<ProductListColumns>(
    ListViews.ProductList
  );

  usePaginationReset(productListUrl, params, settings.rowNumber);

  const { t } = useTranslation();
  const [{ data: initialFilterAttributes }] = useQuery(InitialProductFilterAttributesDocument, {
    variables: {},
  });
  const [{ data: initialFilterCategories }] = useQuery(InitialProductFilterCategoriesDocument, {
    variables: { categories },
    pause: !categories?.length,
  });
  const [{ data: initialFilterCollections }] = useQuery(InitialProductFilterCollectionsDocument, {
    variables: { collections },
    pause: !collections?.length,
  });
  const [{ data: initialFilterProductKlasses }] = useQuery(
    InitialProductFilterProductKlassesDocument,
    {
      variables: { productKlasses },
      pause: !productKlasses?.length,
    }
  );
  const searchCategories = useCategorySearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5,
    },
  });
  const searchCollections = useCollectionSearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5,
    },
  });
  const searchProductKlasses = useProductKlassSearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5,
    },
  });
  const searchAttributes = useSearch(SearchAttributesDocument, {
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 10,
    },
  });
  const [focusedAttribute, setFocusedAttribute] = useState<string>();
  const searchValues = useSearch(SearchValuesDocument, {
    variables: {
      id: focusedAttribute,
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 10,
    },
    pause: !focusedAttribute,
  });
  const [warehouses] = useQuery(WarehouseListDocument, {
    variables: { first: 100 },
    pause: params.action !== 'export',
  });
  const availableProductKinds = getAvailableProductKinds();
  const { channel, availableChannels } = useAppChannel(false); // TODO: set initial query param to this channel if not set
  const limitOpts = useShopLimitsQuery({
    variables: { productVariants: true },
  });

  const selectedChannel = availableChannels.find(
    (c) => c.slug === (channelFromQueryParams || channel?.slug)
  );

  useSortRedirects<ProductListUrlOrdering>({
    params,
    defaultOrdering: DEFAULT_SORT_KEY,
    urlFunc: productListUrl,
    resetToDefault: !canBeSorted(params.sort, !!selectedChannel),
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    ProductListUrlDialog,
    ProductListUrlQueryParams
  >(productListUrl, params);

  const tabs = getFilterTabs();
  const currentTab = getFiltersCurrentTab(params, tabs);
  const [countAllProducts] = useQuery(ProductCountDocument, {
    pause: params.action !== 'export',
  });

  const [exportProducts, exportProductsOpts] = useMutation(ProductExportDocument, {
    onCompleted: (data) => {
      if (data?.exportProducts?.errors?.length === 0) {
        notify(
          t(
            'dashboard.PYqy0',
            'We are currently exporting your requested CSV. As soon as it is available it will be sent to your email address'
          ),
          {
            title: t('dashboard.exportingCSV', 'Exporting CSV'),
          }
        );
        queue(Task.Export, {
          id: data?.exportProducts?.exportFile?.id,
        });
        closeModal();
        reset();
      }
    },
  });

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    cleanupFn: reset,
    createUrl: productListUrl,
    getFilterQueryParam,
  });

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      productListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleFilterTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/products');
  };

  const handleFilterTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const handleSort = (field: ProductListUrlOrdering, attributeId?: string) =>
    void router.replace(
      productListUrl({
        ...params,
        ...getSortUrlVariables(field, params),
        attributeId,
        ...DEFAULT_INITIAL_PAGINATION_DATA,
      })
    );

  const kindOpts = getProductKindOpts(availableProductKinds, t);
  const paginationState = createPaginationState(settings.rowNumber, params);
  const channelOpts = availableChannels
    ? mapNodeToChoice(availableChannels, (channel) => channel.slug)
    : null;
  const filter = getFilterVariables(params, !!selectedChannel);
  const sort = getSortQueryVariables(params, !!selectedChannel);

  const filteredColumnIds =
    settings.columns?.filter(isAttributeColumnValue).map(getAttributeIdFromColumnValue) ?? [];

  const [{ data, fetching: loading }, refetch] = useQuery(ProductListDocument, {
    displayLoader: true,
    variables: {
      ...paginationState,
      filter,
      sort,
      channel: selectedChannel?.slug,
      hasChannel: !!selectedChannel,
      hasSelectedAttributes: !!filteredColumnIds?.length,
    },
    pause: !selectedChannel,
  });

  const availableInGridAttributesOpts = useAvailableInGridAttributesSearch({
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      first: 5,
    },
  });
  const [gridAttributes] = useQuery(GridAttributesDocument, {
    variables: { ids: filteredColumnIds },
    pause: filteredColumnIds.length === 0,
  });

  const [deleteProducts, deleteProductsOpts] = useMutation(DeleteProductsDocument, {
    onCompleted: (data) => {
      if (data?.deleteProducts?.errors?.length === 0) {
        closeModal();
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        reset();
        void refetch();
        void limitOpts.refetch();
      }
    },
  });

  const {
    loadMore: loadMoreDialogProductKlasses,
    search: searchDialogProductKlasses,
    result: searchDialogProductKlassesOpts,
  } = useProductKlassSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA,
  });

  const fetchMoreDialogProductKlasses = {
    hasMore: searchDialogProductKlassesOpts.data?.search?.pageInfo?.hasNextPage,
    loading: searchDialogProductKlassesOpts.fetching,
    onFetchMore: loadMoreDialogProductKlasses,
  };

  const filterOpts = getFilterOpts(
    params,
    (mapEdgesToItems(initialFilterAttributes?.attributes) || []).filter(filterable),
    searchValues,
    {
      initial: mapEdgesToItems(initialFilterCategories?.categories) || [],
      search: searchCategories,
    },
    {
      initial: mapEdgesToItems(initialFilterCollections?.collections) || [],
      search: searchCollections,
    },
    {
      initial: mapEdgesToItems(initialFilterProductKlasses?.productKlasses) || [],
      search: searchProductKlasses,
    },
    kindOpts,
    channelOpts
  );

  const paginationValues = usePaginator({
    pageInfo: data?.products?.pageInfo,
    paginationState,
    queryString: params,
  });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <ProductListPage
        activeAttributeSortId={params.attributeId}
        sort={{
          asc: params.asc,
          sort: params.sort,
        }}
        onSort={handleSort}
        availableInGridAttributes={
          mapEdgesToItems(availableInGridAttributesOpts.result?.data?.availableInGrid) || []
        }
        currencySymbol={selectedChannel?.currencyCode || ''}
        currentTab={currentTab}
        defaultSettings={defaultListSettings[ListViews.ProductList]}
        filterOpts={filterOpts}
        gridAttributes={mapEdgesToItems(gridAttributes?.data?.grid) || []}
        settings={settings}
        loading={availableInGridAttributesOpts.result.fetching || gridAttributes.fetching}
        hasMore={
          !!availableInGridAttributesOpts.result.data?.availableInGrid?.pageInfo.hasNextPage
        }
        disabled={loading}
        limits={limitOpts.data?.shop.limits}
        products={mapEdgesToItems(data?.products)}
        selectedProductIds={listElements}
        onColumnQueryChange={availableInGridAttributesOpts.search}
        onFetchMore={availableInGridAttributesOpts.loadMore}
        onUpdateListSettings={updateListSettings}
        onAdd={() => openModal('create-product')}
        onAll={resetFilters}
        toolbar={
          <IconButton
            color="secondary"
            onClick={() =>
              openModal('delete', {
                ids: listElements,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onFilterAttributeFocus={setFocusedAttribute}
        onTabSave={() => openModal('save-search')}
        onTabDelete={() => openModal('delete-search')}
        onTabChange={handleTabChange}
        initialSearch={params.query || ''}
        tabs={getFilterTabs().map((tab) => tab.name)}
        onExport={() => openModal('export')}
        selectedChannelId={selectedChannel?.id}
        columnQuery={availableInGridAttributesOpts.query}
      />
      <ActionDialog
        open={params.action === 'delete'}
        confirmButtonState={deleteProductsOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          deleteProducts({
            ids: ids,
          })
        }
        title={t('dashboard.deleteProductsDialogHeader', 'Delete Products')}
        variant="delete"
      >
        <DialogContentText>
          <Trans t={t} i18nKey={'yDkmX7'} count={ids.length}>
            {ids.length === 1
              ? 'Are you sure you want to delete this product?'
              : 'Are you sure you want to delete <strong>{{count}}</strong> products?'}
          </Trans>
        </DialogContentText>
      </ActionDialog>
      <ProductExportDialog
        attributes={mapEdgesToItems(searchAttributes?.result?.data?.search) || []}
        hasMore={!!searchAttributes.result.data?.search?.pageInfo.hasNextPage}
        loading={
          searchAttributes.result.fetching || countAllProducts.fetching || warehouses.fetching
        }
        onFetch={searchAttributes.search}
        onFetchMore={searchAttributes.loadMore}
        open={params.action === 'export'}
        confirmButtonState={exportProductsOpts.status}
        errors={exportProductsOpts.data?.exportProducts?.errors || []}
        productQuantity={{
          all: countAllProducts.data?.products?.totalCount,
          filter: data?.products?.totalCount,
        }}
        selectedProducts={listElements.length}
        warehouses={mapEdgesToItems(warehouses?.data?.warehouses) || []}
        channels={availableChannels}
        onClose={closeModal}
        onSubmit={(data) =>
          exportProducts({
            input: {
              ...data,
              filter,
              ids: listElements,
            },
          })
        }
      />
      <SaveFilterTabDialog
        open={params.action === 'save-search'}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleFilterTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === 'delete-search'}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleFilterTabDelete}
        tabName={tabs[currentTab - 1]?.name ?? '...'}
      />
      <ProductKlassPickerDialog
        confirmButtonState="success"
        open={params.action === 'create-product'}
        productKlasses={mapNodeToChoice(
          mapEdgesToItems(searchDialogProductKlassesOpts?.data?.search)
        )}
        fetchProductKlasses={searchDialogProductKlasses}
        fetchMoreProductKlasses={fetchMoreDialogProductKlasses}
        onClose={closeModal}
        onConfirm={(klassId) =>
          void router.push(
            productAddUrl({
              'product-type-id': klassId,
            })
          )
        }
      />
    </PaginatorContext.Provider>
  );
};

export default ProductList;
