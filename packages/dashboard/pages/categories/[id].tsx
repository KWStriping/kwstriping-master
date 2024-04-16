import { Trans, useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useQuery } from '@core/urql/hooks';
import { useMutation } from '@core/urql/hooks/useMutation';
import { extractMutationErrors } from '@core/urql/utils';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContentText from '@mui/material/DialogContentText';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { assert } from 'tsafe/assert';
import {
  CategoryPageTab,
  CategoryUpdatePage,
} from '@dashboard/components/categories/CategoryUpdatePage';
import type { CategoryUpdateData } from '@dashboard/components/categories/CategoryUpdatePage/form';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import type {
  CategoryBulkDeleteMutation,
  CategoryDeleteMutation,
  CategoryInput,
  CategoryUpdateMutation,
} from '@core/api/graphql';
import {
  CategoryBulkDeleteDocument,
  CategoryDeleteDocument,
  CategoryUpdateDocument,
  UpdateMetadataDocument,
  UpdatePrivateMetadataDocument,
  CategoryDetailsDocument,
} from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import useLocalPaginator, {
  useSectionLocalPaginationState,
} from '@dashboard/hooks/useLocalPaginator';
import { PaginatorContext } from '@dashboard/hooks/usePaginator';
import type {
  CategoryUrlDialog,
  CategoryUrlQueryParams,
} from '@dashboard/oldSrc/categories/urls';
import { categoryUrl } from '@dashboard/oldSrc/categories/urls';
import { PAGINATE_BY } from '@dashboard/oldSrc/config';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { getParsedDataForJsonStringField } from '@dashboard/oldSrc/utils/richText/misc';
import { graphql as gql } from '@core/api/gql';

export interface CategoryDetailsProps {
  params: CategoryUrlQueryParams;
  id: string;
}

export function getActiveTab(tabName: string): CategoryPageTab {
  return tabName === CategoryPageTab.products
    ? CategoryPageTab.products
    : CategoryPageTab.categories;
}

export const deleteProductsMutation = gql(`
  mutation DeleteProducts($ids: [ID!]!) {
    deleteProducts(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);

export const CategoryDetails = () => {
  const router = useRouter();
  const { id, ids = [], ...params } = router.query;
  assert(typeof id === 'string');
  assert(Array.isArray(ids));
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(ids);
  const { t } = useTranslation();
  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [activeTab, setActiveTab] = useState<CategoryPageTab>(CategoryPageTab.categories);
  const [paginationState, setPaginationState] = useSectionLocalPaginationState(
    PAGINATE_BY,
    activeTab
  );
  const paginate = useLocalPaginator(setPaginationState);
  const changeTab = (tab: CategoryPageTab) => {
    reset();
    setActiveTab(tab);
  };

  const [{ data, fetching: loading }, refetch] = useQuery(CategoryDetailsDocument, {
    displayLoader: true,
    variables: { ...paginationState, id },
  });

  const category = data?.category;

  const handleCategoryDelete = (data: CategoryDeleteMutation) => {
    if (data?.deleteCategory?.errors?.length === 0) {
      notify(t('dashboard.vJPcU', 'Category deleted'), {
        type: 'success',
      });
      void router.push('/categories');
    }
  };

  const [deleteCategory, deleteResult] = useMutation(CategoryDeleteDocument, {
    onCompleted: handleCategoryDelete,
  });

  const handleCategoryUpdate = (data: CategoryUpdateMutation) => {
    if (data?.updateCategory?.errors?.length) {
      const backgroundImageError = data?.updateCategory?.errors.find(
        (error) => error.field === ('backgroundImage' as keyof CategoryInput)
      );
      if (backgroundImageError) {
        notify(
          t(
            'dashboard.imageUploadErrorText',
            "There was a problem with the file you uploaded as an image and it couldn't be used. Please try a different file."
          ),
          {
            type: 'error',
            title: t('dashboard.imageUploadErrorTitle', "Couldn't process image"),
          }
        );
      }
    } else {
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      });
    }
  };

  const [updateCategory, updateResult] = useMutation(CategoryUpdateDocument, {
    onCompleted: handleCategoryUpdate,
  });

  const handleBulkCategoryDelete = (data: CategoryBulkDeleteMutation) => {
    if (data?.deleteCategories?.errors?.length === 0) {
      closeModal();
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      });
      reset();
    }
  };

  const [deleteCategories, deleteCategoriesOpts] = useMutation(CategoryBulkDeleteDocument, {
    onCompleted: handleBulkCategoryDelete,
  });

  const [deleteProducts, deleteProductsOpts] = useMutation(DeleteProductsDocument, {
    onCompleted: (data) => {
      if (data?.deleteProducts?.errors?.length === 0) {
        closeModal();
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
        refetch();
        reset();
      }
    },
  });

  const [openModal, closeModal] = useDialogActionHandlers<
    CategoryUrlDialog,
    CategoryUrlQueryParams
  >((params) => categoryUrl(id, params), params);

  const { pageInfo, ...paginationFunctions } = paginate(
    activeTab === CategoryPageTab.categories
      ? data?.category?.children?.pageInfo
      : data?.category?.products?.pageInfo,
    paginationState
  );

  const handleUpdate = async (formData: CategoryUpdateData) =>
    extractMutationErrors(
      updateCategory({
        id,
        input: {
          backgroundImageAlt: formData.backgroundImageAlt,
          description: getParsedDataForJsonStringField(formData.description),
          name: formData.name,
          seo: {
            description: formData.seoDescription,
            title: formData.seoTitle,
          },
          slug: formData.slug,
        },
      })
    );

  const handleSubmit = createMetadataUpdateHandler(
    data?.category,
    handleUpdate,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  if (category === null) {
    return <NotFoundPage onBack={() => router.push('/categories')} />;
  }

  return (
    <PaginatorContext.Provider value={{ ...pageInfo, ...paginationFunctions }}>
      <WindowTitle title={data?.category?.name} />
      <CategoryUpdatePage
        categoryId={id}
        changeTab={changeTab}
        currentTab={activeTab}
        category={data?.category}
        disabled={loading}
        errors={updateResult.data?.updateCategory?.errors || []}
        addProductHref={'/products/add'}
        onDelete={() => openModal('delete')}
        onImageDelete={() =>
          updateCategory({
            id,
            input: {
              backgroundImage: null,
            },
          })
        }
        onImageUpload={(file) =>
          updateCategory({
            id,
            input: {
              backgroundImage: file,
            },
          })
        }
        onSubmit={handleSubmit}
        products={mapEdgesToItems(data?.category?.products)}
        saveButtonBarState={updateResult.status}
        subcategories={mapEdgesToItems(data?.category?.children)}
        subcategoryListToolbar={
          <IconButton
            data-test-id="delete-icon"
            color="secondary"
            onClick={() =>
              openModal('delete-categories', {
                ids: listElements,
              })
            }
          >
            <DeleteIcon />
          </IconButton>
        }
        productListToolbar={
          <IconButton
            data-test-id="delete-icon"
            color="primary"
            onClick={() =>
              openModal('delete-products', {
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
      />
      <ActionDialog
        confirmButtonState={deleteResult.status}
        onClose={closeModal}
        onConfirm={() => deleteCategory({ id })}
        open={params.action === 'delete'}
        title={t(
          'dashboard.o5UIb',
          'Delete category'
          // dialog title
        )}
        variant="delete"
      >
        <DialogContentText>
          <Trans
            id="xRkj2h"
            defaultMessage="Are you sure you want to delete {categoryName}?"
            values={{
              categoryName: <strong>{data?.category?.name ?? '...'}</strong>,
            }}
          />
        </DialogContentText>
        <DialogContentText>
          <>
            {t(
              'dashboard.DGvA/',
              'Remember this will also unpin all products assigned to this category, making them unavailable in storefront.'
            )}
          </>
        </DialogContentText>
      </ActionDialog>
      <ActionDialog
        open={params.action === 'delete-categories' && ids?.length}
        confirmButtonState={deleteCategoriesOpts.status}
        onClose={closeModal}
        onConfirm={() =>
          deleteCategories({
            ids: ids,
          }).then(() => refetch())
        }
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
              count: ids.length,
              displayQuantity: <strong>{ids.length}</strong>,
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
      <ActionDialog
        open={params.action === 'delete-products'}
        confirmButtonState={deleteProductsOpts.status}
        onClose={closeModal}
        onConfirm={() => deleteProducts({ ids }).then(() => refetch())}
        title={t(
          'dashboard.Cjd1o',
          'Delete products'
          // dialog title
        )}
        variant="delete"
      >
        <DialogContentText>
          <Trans
            id="7l5Bh9"
            defaultMessage="{count,plural,one{Are you sure you want to delete this product?} other{Are you sure you want to delete {displayQuantity} products?}}"
            values={{
              count: ids.length,
              displayQuantity: <strong>{ids.length}</strong>,
            }}
          />
        </DialogContentText>
      </ActionDialog>
    </PaginatorContext.Provider>
  );
};
export default CategoryDetails;
