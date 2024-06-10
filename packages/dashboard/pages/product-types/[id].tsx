import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation, useSearch } from '@core/urql/hooks';
import { useQuery } from '@core/urql/hooks/useQuery';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { assert } from 'tsafe/assert';
import NotFoundPage from '@dashboard/components/core/NotFoundPage';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import AssignAttributeDialog from '@dashboard/components/dialogs/AssignAttributeDialog';
import AttributeUnassignDialog from '@dashboard/components/dialogs/AttributeUnassignDialog';
import BulkAttributeUnassignDialog from '@dashboard/components/dialogs/BulkAttributeUnassignDialog';
import TypeDeleteWarningDialog from '@dashboard/components/dialogs/TypeDeleteWarningDialog';
import ProductKlassDetailsPage from '@dashboard/components/productKlasses/ProductKlassDetailsPage';
import type { ProductKlassForm } from '@dashboard/components/productKlasses/ProductKlassDetailsPage';
import { ProductAttributeType } from '@core/api/constants';
import {
  ProductKlassDetailsDocument,
  UpdatePrivateMetadataDocument,
  ProductKlassUpdateDocument,
  UpdateMetadataDocument,
  ProductAttributeAssignmentUpdateDocument,
  SearchAvailableProductAttributesDocument,
} from '@core/api/graphql';
import type {
  AssignProductAttributeMutation,
  ProductKlassAttributeReorderMutation,
  ProductKlassDeleteMutation,
  UnassignProductAttributeMutation,
} from '@core/api/graphql';
import useBulkActions from '@dashboard/hooks/useBulkActions';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import { getStringOrPlaceholder, maybe } from '@dashboard/oldSrc/misc';
import useProductKlassDelete from '@dashboard/oldSrc/productKlasses/hooks/useProductKlassDelete';
import useProductKlassOperations from '@dashboard/oldSrc/productKlasses/hooks/useProductKlassOperations';
import type { ProductKlassUrlQueryParams } from '@dashboard/oldSrc/productKlasses/urls';
import { productKlassUrl } from '@dashboard/oldSrc/productKlasses/urls';
import { useTaxClassFetchMore } from '@dashboard/oldSrc/taxes/utils/useTaxClassFetchMore';
import type { ReorderEvent } from '@dashboard/oldSrc/types';
import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';

interface ProductKlassUpdateProps {
  id: string;
  params: ProductKlassUrlQueryParams;
}

export const ProductKlassUpdate = () => {
  const router = useRouter();
  const { id = '', ...params } = router.query;
  assert(typeof id === 'string');
  const { type } = params as ProductKlassUrlQueryParams;
  const ids = typeof params.ids === 'string' ? params.ids.split(',') : [];
  const notify = useNotifier();
  const productAttributeListActions = useBulkActions();
  const variantAttributeListActions = useBulkActions();
  const { t } = useTranslation();
  const { loadMore, search, result } = useSearch(SearchAvailableProductAttributesDocument, {
    variables: {
      ...DEFAULT_INITIAL_SEARCH_DATA,
      id,
    },
  });
  const [errors, setErrors] = useState({
    addAttributeErrors: [],
    editAttributeErrors: [],
    formErrors: [],
  });

  const [updateProductKlass, updateProductKlassOpts] = useMutation(ProductKlassUpdateDocument, {
    onCompleted: (updateData) => {
      if (
        !updateData.updateProductKlass?.errors ||
        updateData.updateProductKlass.errors?.length === 0
      ) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      } else if (
        updateData.updateProductKlass.errors !== null &&
        updateData.updateProductKlass.errors?.length
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          formErrors: updateData?.updateProductKlass?.errors ?? [],
        }));
      }
    },
  });
  const [updateProductAttributes, updateProductAttributesOpts] = useMutation(
    ProductAttributeAssignmentUpdateDocument,
    {
      onCompleted: (updateData) => {
        if (updateData.updateProductAttributeAssignment?.errors?.length) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            formErrors: updateData?.updateProductAttributeAssignment?.errors ?? [],
          }));
        }
      },
    }
  );

  const [updateMetadata] = useMutation(UpdateMetadataDocument, {});
  const [updatePrivateMetadata] = useMutation(UpdatePrivateMetadataDocument, {});

  const [selectedVariantAttributes, setSelectedVariantAttributes] = useState<string[]>([]);

  const handleProductKlassUpdate = async (formData: ProductKlassForm) => {
    const operations = formData.variantAttributes.map((variantAttribute) => ({
      id: variantAttribute.value,
      variantSelection: selectedVariantAttributes.includes(variantAttribute.value),
    }));

    const productAttributeUpdateResult = await updateProductAttributes({
      klassId: id,
      operations,
    });

    const result = await updateProductKlass({
      id,
      input: {
        hasVariants: formData.hasVariants,
        isShippingRequired: formData.isShippingRequired,
        name: formData.name,
        kind: formData.kind,
        productAttributes: formData.productAttributes.map((choice) => choice.value),
        taxClass: formData.taxClassId,
        variantAttributes: formData.variantAttributes.map((choice) => choice.value),
        weight: formData.weight,
      },
    });

    return [
      ...(result.data?.updateProductKlass?.errors ?? []),
      ...(productAttributeUpdateResult.data?.updateProductAttributeAssignment?.errors ?? []),
    ];
  };

  const deleteProductKlassData = useProductKlassDelete({
    singleId: id,
    params,
  });

  const [{ data, fetching: dataLoading }] = useQuery(ProductKlassDetailsDocument, {
    displayLoader: true,
    variables: { id },
  });

  const { taxClasses, fetchMoreTaxClasses } = useTaxClassFetchMore();

  const productKlass = data?.productKlass;

  const closeModal = () => router.replace({ pathname: '/product-types/[id]', query: { id } });

  const handleAttributeAssignSuccess = (data: AssignProductAttributeMutation) => {
    if (data?.assignProductAttribute?.errors?.length === 0) {
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      });
      closeModal();
    } else if (
      data?.assignProductAttribute?.errors !== null &&
      data?.assignProductAttribute?.errors?.length
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        addAttributeErrors: data?.assignProductAttribute?.errors ?? [],
      }));
    }
  };
  const handleAttributeUnassignSuccess = (data: UnassignProductAttributeMutation) => {
    if (data?.unassignProductAttribute?.errors?.length === 0) {
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      });
      closeModal();
      productAttributeListActions.reset();
      variantAttributeListActions.reset();
    }
  };
  const handleProductKlassDeleteSuccess = (deleteData: ProductKlassDeleteMutation) => {
    if (deleteData.deleteProductKlass?.errors?.length === 0) {
      notify(t('dashboard.3Upht', 'Product type deleted'), {
        type: 'success',
      });
      void router.replace('/product-types');
    }
  };

  const handleAttributeReorderSuccess = (data: ProductKlassAttributeReorderMutation) => {
    if (data?.reorderProductKlassAttributes?.errors?.length === 0) {
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      });
    }
  };

  const { assignAttribute, deleteProductKlass, unassignAttribute, reorderAttribute } =
    useProductKlassOperations({
      onAssignAttribute: handleAttributeAssignSuccess,
      onProductKlassAttributeReorder: handleAttributeReorderSuccess,
      onProductKlassDelete: handleProductKlassDeleteSuccess,
      onUnassignAttribute: handleAttributeUnassignSuccess,
      productKlass,
    });

  const handleSubmit = createMetadataUpdateHandler(
    productKlass,
    handleProductKlassUpdate,
    (variables) => updateMetadata({ ...variables }),
    (variables) => updatePrivateMetadata({ ...variables })
  );

  const handleProductKlassDelete = () => deleteProductKlass.mutate({ id });
  const handleProductKlassVariantsToggle = (hasVariants: boolean) =>
    updateProductKlass({
      id,
      input: {
        hasVariants,
      },
    });
  const handleAssignAttribute = () => {
    console.log('handleAssignAttribute', id, type);
    assert(type);
    assignAttribute.mutate({
      id,
      operations: ids.map((_id) => ({
        id: _id,
        type,
      })),
    });
  };

  const handleAttributeUnassign = () =>
    unassignAttribute.mutate({
      id,
      ids,
    });

  const handleBulkAttributeUnassign = handleAttributeUnassign;

  const loading =
    updateProductKlassOpts.fetching || updateProductAttributesOpts.fetching || dataLoading;

  const handleAttributeReorder = (event: ReorderEvent, type: ProductAttributeType) => {
    assert(productKlass);
    const attributes =
      type === ProductAttributeType.Product
        ? productKlass.productAttributes
        : productKlass.variantAttributes;

    reorderAttribute.mutate({
      move: {
        id: attributes[event.oldIndex]?.id,
        sortOrder: event.newIndex - event.oldIndex,
      },
      klassId: id,
      type,
    });
  };

  if (productKlass === null) {
    return <NotFoundPage backHref={'/product-types'} />;
  } else if (!productKlass) return null;

  return (
    <>
      <WindowTitle title={data?.productKlass?.name} />
      <ProductKlassDetailsPage
        defaultWeightUnit={data?.shop?.defaultWeightUnit}
        disabled={loading}
        errors={errors.formErrors}
        pageTitle={productKlass.name}
        productKlass={productKlass}
        saveButtonBarState={updateProductKlassOpts.status || updateProductAttributesOpts.status}
        taxClasses={taxClasses ?? []}
        selectedVariantAttributes={selectedVariantAttributes}
        setSelectedVariantAttributes={setSelectedVariantAttributes}
        onAttributeAdd={(type) =>
          void router.push({
            pathname: '/product-types/[id]',
            query: { id, action: 'assign-attribute', type },
          })
        }
        onAttributeReorder={handleAttributeReorder}
        onAttributeUnassign={(attributeId) =>
          void router.push({
            pathname: '/product-types/[id]',
            query: { action: 'unassign-attribute', id: attributeId },
          })
        }
        onDelete={() =>
          void router.push({
            pathname: '/product-types/[id]',
            query: { action: 'remove' },
          })
        }
        onHasVariantsToggle={handleProductKlassVariantsToggle}
        onSubmit={handleSubmit}
        productAttributeList={{
          isChecked: productAttributeListActions.isSelected,
          selected: productAttributeListActions.listElements.length,
          toggle: productAttributeListActions.toggle,
          toggleAll: productAttributeListActions.toggleAll,
          toolbar: (
            <Button
              onClick={() =>
                void router.push(
                  productKlassUrl(id, {
                    action: 'unassign-attributes',
                    ids: productAttributeListActions.listElements,
                  })
                )
              }
            >
              <>
                {t(
                  'dashboard.7j+Wf',
                  'Unassign'
                  // unassign attribute from product type, button
                )}
              </>
            </Button>
          ),
        }}
        variantAttributeList={{
          isChecked: variantAttributeListActions.isSelected,
          selected: variantAttributeListActions.listElements.length,
          toggle: variantAttributeListActions.toggle,
          toggleAll: variantAttributeListActions.toggleAll,
          toolbar: (
            <Button
              onClick={() =>
                void router.push(
                  productKlassUrl(id, {
                    action: 'unassign-attributes',
                    ids: variantAttributeListActions.listElements,
                  })
                )
              }
            >
              <>
                {t(
                  'dashboard.7j+Wf',
                  'Unassign'
                  // unassign attribute from product type, button
                )}
              </>
            </Button>
          ),
        }}
        onFetchMoreTaxClasses={fetchMoreTaxClasses}
      />
      {!dataLoading && (
        <>
          {Object.keys(ProductAttributeType).map((key) => (
            <AssignAttributeDialog
              attributes={mapEdgesToItems(result?.data?.productKlass?.availableAttributes)}
              confirmButtonState={assignAttribute.opts.status}
              errors={
                assignAttribute.opts.data?.assignProductAttribute?.errors?.map(
                  (err) => err.message
                ) ?? []
              }
              loading={result.fetching}
              onClose={closeModal}
              onSubmit={handleAssignAttribute}
              onFetch={search}
              onFetchMore={loadMore}
              onOpen={result.refetch}
              hasMore={maybe(
                () => result.data?.productKlass?.availableAttributes?.pageInfo.hasNextPage,
                false
              )}
              open={params.action === 'assign-attribute' && type === ProductAttributeType[key]}
              selected={ids || []}
              onToggle={(attributeId) => {
                void router.push(
                  productKlassUrl(id, {
                    ...params,
                    ids: ids.includes(attributeId)
                      ? ids.filter((selectedId) => selectedId !== attributeId)
                      : [...ids, attributeId],
                  })
                );
              }}
              key={key}
            />
          ))}
          {productKlass && (
            <TypeDeleteWarningDialog
              {...deleteProductKlassData}
              typesData={[productKlass]}
              typesToDelete={[id]}
              onClose={closeModal}
              onDelete={handleProductKlassDelete}
              deleteButtonState={deleteProductKlass.opts.status}
            />
          )}
        </>
      )}

      <BulkAttributeUnassignDialog
        title={t(
          'dashboard.ulkAttributeUnassignDialogHeader',
          'Unassign Attribute from Product Type'
        )}
        attributeQuantity={ids.length}
        confirmButtonState={unassignAttribute.opts.status}
        onClose={closeModal}
        onConfirm={handleBulkAttributeUnassign}
        open={params.action === 'unassign-attributes'}
        itemTypeName={getStringOrPlaceholder(data?.productKlass.name)}
      />
      <AttributeUnassignDialog
        title={t(
          'dashboard.attributeUnassignDialogHeader',
          'Unassign Attribute From Product Type'
        )}
        attributeName={maybe(
          () =>
            [
              ...data?.productKlass?.productAttributes,
              ...data?.productKlass?.variantAttributes,
            ].find((attribute) => attribute.id === params.id).name,
          '...'
        )}
        confirmButtonState={unassignAttribute.opts.status}
        onClose={closeModal}
        onConfirm={handleAttributeUnassign}
        open={params.action === 'unassign-attribute'}
        itemTypeName={getStringOrPlaceholder(data?.productKlass.name)}
      />
    </>
  );
};
export default ProductKlassUpdate;
