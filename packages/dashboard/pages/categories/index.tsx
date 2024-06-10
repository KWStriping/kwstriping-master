import { Trans, useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import { useQuery } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { CategoryListPage } from '@dashboard/components/categories/CategoryListPage';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DeleteFilterTabDialog from '@dashboard/components/dialogs/DeleteFilterTabDialog';
import SaveFilterTabDialog from '@dashboard/components/dialogs/SaveFilterTabDialog';
import type { SaveFilterTabDialogFormData } from '@dashboard/components/dialogs/SaveFilterTabDialog';
import type { CategoryBulkDeleteMutation } from '@core/api/graphql';
import { RootCategoriesDocument, CategoryBulkDeleteDocument } from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useListSettings from '@dashboard/hooks/useListSettings';
import { usePaginationReset } from '@dashboard/hooks/usePaginationReset';
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from '@dashboard/hooks/usePaginator';
import {
  deleteFilterTab,
  getActiveFilters,
  getFiltersCurrentTab,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab,
} from '@dashboard/oldSrc/categories/CategoryList/filter';
import { getSortQueryVariables } from '@dashboard/oldSrc/categories/sort';
import { categoryListUrl } from '@dashboard/oldSrc/categories/urls';
import type {
  CategoryListUrlDialog,
  CategoryListUrlFilters,
  CategoryListUrlQueryParams,
} from '@dashboard/oldSrc/categories/urls';
import { ListViews } from '@dashboard/oldSrc/types';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import useSortHandler from '@dashboard/oldSrc/utils/handlers/sortHandler';
import { getSortParams } from '@dashboard/oldSrc/utils/sort';

export const CategoryList = () => {
  const router = useRouter();
  const params = router.query;

  const { isSelected, listElements, toggle, toggleAll, reset } = useBulkActions(params.ids);
  const { updateListSettings, settings } = useListSettings(ListViews.CategoryList);

  usePaginationReset(categoryListUrl, params, settings.rowNumber);

  const { t } = useTranslation();

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [{ data, fetching: loading }, refetch] = useQuery(RootCategoriesDocument, {
    displayLoader: true,
    variables: queryVariables,
  });

  const tabs = getFilterTabs();

  const currentTab = getFiltersCurrentTab(params, tabs);

  const changeFilterField = (filter: CategoryListUrlFilters) => {
    reset();
    void router.push(
      categoryListUrl({
        ...getActiveFilters(params),
        ...filter,
        activeTab: undefined,
      })
    );
  };

  const [openModal, closeModal] = useDialogActionHandlers<
    CategoryListUrlDialog,
    CategoryListUrlQueryParams
  >(categoryListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    void router.push(
      categoryListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1]?.data,
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    void router.push('/categories');
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data?.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const paginationValues = usePaginator({
    pageInfo: data?.categories?.pageInfo,
    paginationState,
    queryString: params,
  });

  const handleCategoryBulkDelete = (data: CategoryBulkDeleteMutation) => {
    if (data?.deleteCategories?.errors?.length === 0) {
      void router.replace('/categories');
      refetch();
      reset();
    }
  };

  const [deleteCategories, deleteCategoriesOpts] = useMutation(CategoryBulkDeleteDocument, {
    onCompleted: handleCategoryBulkDelete,
  });

  const handleSort = useSortHandler(categoryListUrl, params);

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <CategoryListPage
        categories={mapEdgesToItems(data?.categories)}
        currentTab={currentTab}
        initialSearch={params.query || ''}
        onSearchChange={(query) => changeFilterField({ query })}
        onAll={() => router.push('/categories')}
        onTabChange={handleTabChange}
        onTabDelete={() => openModal('delete-search')}
        onTabSave={() => openModal('save-search')}
        tabs={tabs.map((tab) => tab.name)}
        settings={settings}
        sort={getSortParams(params)}
        onSort={handleSort}
        disabled={loading}
        onUpdateListSettings={updateListSettings}
        isChecked={isSelected}
        selected={listElements.length}
        toggle={toggle}
        toggleAll={toggleAll}
        toolbar={
          <IconButton
            color="secondary"
            data-test-id="delete-icon"
            onClick={() =>
              openModal('delete', {
                ids: listElements,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
      />
      <ActionDialog
        confirmButtonState={deleteCategoriesOpts.status}
        onClose={() =>
          void router.push(
            categoryListUrl({
              ...params,
              action: undefined,
              ids: undefined,
            })
          )
        }
        onConfirm={() =>
          deleteCategories({
            variables: {
              ids: params.ids,
            },
          })
        }
        open={params.action === 'delete'}
        title={t(
          'dashboard.G0w22',
          'Delete categories'
          // dialog title
        )}
        variant="delete"
      >
        <DialogContentText>
          <Trans
            id="Pp/7T7"
            defaultMessage="{count,plural,one{Are you sure you want to delete this category?} other{Are you sure you want to delete {displayQuantity} categories?}}"
            values={{
              count: params.ids?.length,
              displayQuantity: <strong>{params.ids?.length}</strong>,
            }}
          />
        </DialogContentText>
        <DialogContentText>
          <>
            {t(
              'dashboard.+L+q3',
              'Remember this will also delete all products assigned to this category.'
            )}
          </>
        </DialogContentText>
      </ActionDialog>
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
export default CategoryList;
