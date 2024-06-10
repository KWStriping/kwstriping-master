import { useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useQuery } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import TypeDeleteWarningDialog from '@dashboard/components/dialogs/TypeDeleteWarningDialog/TypeDeleteWarningDialog';
import ProductKlassListPage from '@dashboard/components/productKlasses/ProductKlassListPage';
import {
  ProductKlassBulkDeleteDocument,
  ProductKlassListDocument,
} from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import { getSortQueryVariables } from '@dashboard/oldSrc/products/sort';
import useProductKlassDelete from '@dashboard/oldSrc/productKlasses/hooks/useProductKlassDelete';
import {
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
} from '@dashboard/oldSrc/productKlasses/ProductKlassList/filters';
import type {
  ProductKlassListUrlDialog,
  ProductKlassListUrlQueryParams,
} from '@dashboard/oldSrc/productKlasses/urls';
import { productKlassListUrl } from '@dashboard/oldSrc/productKlasses/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useFilterHandlers from '@dashboard/oldSrc/utils/handlers/filterHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

interface ProductKlassListProps {
  params: ProductKlassListUrlQueryParams;
}

export const ProductKlassList = () => {
  const router = useRouter();
  const params = router.query;
  console.log(params);
  const notify = useNotifier();
  const {
    isSelected,
    listElements: selectedProductKlasses,
    reset,
    toggle,
    toggleAll,
  } = useBulkActions(params.ids);
  const { settings } = useListSettings(ListViews.ProductList);
  const { t } = useTranslation();

  usePaginationReset(productKlassListUrl, params, settings.rowNumber);

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber]
  );
  const [{ data, fetching: loading }, refetch] = useQuery(ProductKlassListDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const [changeFilters, resetFilters, handleSearchChange] = useFilterHandlers({
    cleanupFn: reset,
    createUrl: productKlassListUrl,
    getFilterQueryParam,
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    ProductKlassListUrlDialog,
    ProductKlassListUrlQueryParams
  >(productKlassListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      productKlassListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/product-types');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const paginationValues = usePaginator({
    pageInfo: data?.productKlasses?.pageInfo,
    paginationState,
    queryString: params,
  });

  const handleSort = useSortHandler(productKlassListUrl, params);

  const deleteProductKlassData = useProductKlassDelete({
    selectedTypes: selectedProductKlasses,
    params,
  });

  const productKlassesData = mapEdgesToItems(data?.productKlasses);

  const [deleteProductKlasses, deleteProductKlassesOpts] = useMutation(
    ProductKlassBulkDeleteDocument,
    {
      onCompleted: (data) => {
        if (data?.deleteProductKlasses?.errors?.length === 0) {
          notify(t('dashboard.savedChanges', 'Saved changes'), {
            type: 'success',
          });
          reset();
          refetch();
          void router.push(
            productKlassListUrl({
              ...params,
              action: undefined,
              ids: undefined,
            })
          );
        }
      },
    }
  );

  const onProductKlassBulkDelete = () =>
    deleteProductKlasses({
      variables: {
        ids: params.ids,
      },
    });

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <ProductKlassListPage
        currentTab={currentTab}
        filterOpts={getFilterOpts(params)}
        initialSearch={params.query || ''}
        onSearchChange={handleSearchChange}
        onFilterChange={changeFilters}
        onAll={resetFilters}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal('delete-search')}
        onTabSave={() => openModal('save-search')}
        tabs={tabs.map((tab) => tab.name)}
        disabled={loading}
        productKlasses={productKlassesData}
        onSort={handleSort}
        isChecked={isSelected}
        selected={selectedProductKlasses.length}
        sort={getSortParams(params)}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={
          <IconButton
            color="secondary"
            onClick={() =>
              openModal('remove', {
                ids: selectedProductKlasses,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
      />
      {productKlassesData && (
        <TypeDeleteWarningDialog
          {...deleteProductKlassData}
          typesData={productKlassesData}
          typesToDelete={selectedProductKlasses}
          onClose={closeModal}
          onDelete={onProductKlassBulkDelete}
          deleteButtonState={deleteProductKlassesOpts.status}
        />
      )}
      <SaveFilterTabDialog
        open={params.action === 'save-search'}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabSave}
      />
      <DeleteFilterTabDialog
        open={params.action === 'delete-search'}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={handleTabDelete}
        tabName={tabs[currentTab - 1]?.name ?? '...'}
      />
    </PaginatorContext.Provider>
  );
};
export default ProductKlassList;
