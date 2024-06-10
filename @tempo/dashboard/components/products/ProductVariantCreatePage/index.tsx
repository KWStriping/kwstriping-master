import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { AttributeInput } from '@tempo/dashboard/components/attributes/AttributesCard';
import Attributes from '@tempo/dashboard/components/attributes/AttributesCard';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import Grid from '@tempo/ui/components/Grid';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import AssignValueDialog from '@tempo/dashboard/components/dialogs/AssignValueDialog';
import { ProductDetailsChannelsAvailabilityCard } from '@tempo/dashboard/components/products/ProductChannels/ChannelsAvailabilityCard';
import { ProductAttributeScope } from '@tempo/api/generated/constants';
import type {
  ProductErrorWithAttributesFragment,
  ProductCreateDataQuery,
  SearchValuesQuery,
  SearchPagesQuery,
  SearchProductsQuery,
  SearchWarehousesQuery,
} from '@tempo/api/generated/graphql';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import {
  getReferenceAttributeEntityTypeFromAttribute,
  mergeValues,
} from '@tempo/dashboard/oldSrc/attributes/utils/data';
import { productUrl } from '@tempo/dashboard/oldSrc/products/urls';
import type { FetchMoreProps, RelayToFlat, ReorderAction } from '@tempo/dashboard/oldSrc/types';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import ProductShipping from '../ProductShipping/ProductShipping';
import ProductStocks from '../ProductStocks';
import { useManageChannels } from '../ProductChannels/useManageChannels';
import { VariantChannelsDialog } from '../ProductChannels/VariantChannelsDialog';
import ProductCheckoutSettings from '../ProductCheckoutSettings';
import ProductName from '../ProductName';
import ProductNavigation from '../ProductNavigation';
import ProductPrice from '../ProductPrice';
import type { ProductCreateData, ProductCreateHandlers } from './form';
import ProductCreateForm from './form';

const messages = {
  attributesHeader: {
    id: 'f3B4tc',
    defaultMessage: 'Variant Attributes',
    description: 'attributes, section header',
  },
  attributesSelectionHeader: {
    id: 'o6260f',
    defaultMessage: 'Variant Selection Attributes',
    description: 'attributes, section header',
  },
  deleteVariant: {
    id: '7hNjaI',
    defaultMessage: 'Delete Variant',
  },
  saveVariant: {
    id: 'U9CIo7',
    defaultMessage: 'Save variant',
  },
  pricingCardSubtitle: {
    id: 'sw8Wl2',
    defaultMessage:
      'There is no channel to define prices for. You need to first add variant to channels to define prices.',
    description: 'variant pricing section subtitle',
  },
};

interface ProductCreatePageProps {
  productId: string;
  defaultVariantId?: string;
  disabled: boolean;
  errors: ProductErrorWithAttributesFragment[];
  header: string;
  product: ProductCreateDataQuery['product'];
  saveButtonBarState: ConfirmButtonTransitionState;
  warehouses: RelayToFlat<NonNullable<SearchWarehousesQuery['search']>>;
  weightUnit: string;
  referencePages?: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
  referenceProducts?: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  values: RelayToFlat<SearchValuesQuery['attribute']['choices']>;
  onSubmit: (data: ProductCreateData) => SubmitPromise;
  onVariantClick: (productId: string) => void;
  onVariantReorder: ReorderAction;
  onWarehouseConfigure: () => void;
  assignReferencesAttributeId?: string;
  onAssignReferencesClick: (attribute: AttributeInput) => void;
  fetchReferencePages?: (data: string) => void;
  fetchReferenceProducts?: (data: string) => void;
  fetchValues: (query: string, attributeId: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchMoreReferenceProducts?: FetchMoreProps;
  fetchMoreValues?: FetchMoreProps;
  onCloseDialog: () => void;
  onAttributeSelectBlur: () => void;
}

const ProductCreatePage: FC<ProductCreatePageProps> = ({
  productId,
  defaultVariantId,
  disabled,
  errors: apiErrors,
  header,
  product,
  saveButtonBarState,
  warehouses,
  weightUnit,
  referencePages = [],
  referenceProducts = [],
  values,
  onSubmit,
  onVariantReorder,
  onWarehouseConfigure,
  assignReferencesAttributeId,
  onAssignReferencesClick,
  fetchReferencePages,
  fetchReferenceProducts,
  fetchValues,
  fetchMoreReferencePages,
  fetchMoreReferenceProducts,
  fetchMoreValues,
  onCloseDialog,
  onAttributeSelectBlur,
}) => {
  const router = useRouter();
  const { isOpen: isManageChannelsModalOpen, toggle: toggleManageChannels } = useManageChannels();
  const canOpenAssignReferencesAttributeDialog = !!assignReferencesAttributeId;

  const handleAssignReferenceAttribute = (
    values: string[],
    data: ProductCreateData,
    handlers: ProductCreateHandlers
  ) => {
    handlers.selectAttributeReference(
      assignReferencesAttributeId,
      mergeValues(assignReferencesAttributeId, values, data?.attributes)
    );
    onCloseDialog();
  };

  return (
    <ProductCreateForm
      product={product}
      onSubmit={onSubmit}
      warehouses={warehouses}
      referencePages={referencePages}
      referenceProducts={referenceProducts}
      fetchReferencePages={fetchReferencePages}
      fetchMoreReferencePages={fetchMoreReferencePages}
      fetchReferenceProducts={fetchReferenceProducts}
      fetchMoreReferenceProducts={fetchMoreReferenceProducts}
      assignReferencesAttributeId={assignReferencesAttributeId}
      disabled={disabled}
    >
      {({
        change,
        data,
        formErrors,
        validationErrors,
        handlers,
        submit,
        isSaveDisabled,
        attributeRichTextGetters,
      }) => {
        const errors = [...apiErrors, ...validationErrors];

        return (
          <Container>
            <Backlink href={productUrl(productId)}>{product?.name}</Backlink>
            <PageHeader title={header} />
            <Grid variant="inverted">
              <div>
                <ProductNavigation
                  fallbackThumbnail={product?.thumbnail?.url}
                  variants={product?.variants}
                  productId={productId}
                  defaultVariantId={defaultVariantId}
                  onReorder={onVariantReorder}
                  isCreate={true}
                />
              </div>
              <div>
                <ProductName value={data?.name} onChange={change} errors={errors} />
                <CardSpacer />
                <ProductDetailsChannelsAvailabilityCard
                  product={product}
                  onManageClick={toggleManageChannels}
                />
                <Attributes
                  title={m.dashboard_attributesHeader() ?? 'Variant Attributes'}
                  attributes={data?.attributes?.filter(
                    (attribute) =>
                      attribute.data?.variantAttributeScope ===
                      ProductAttributeScope.NotVariantSelection
                  )}
                  values={values}
                  loading={disabled}
                  disabled={disabled}
                  errors={errors}
                  onChange={handlers.selectAttribute}
                  onMultiChange={handlers.selectAttributeMultiple}
                  onFileChange={handlers.selectAttributeFile}
                  onReferencesRemove={handlers.selectAttributeReference}
                  onReferencesAddClick={onAssignReferencesClick}
                  onReferencesReorder={handlers.reorderValue}
                  fetchValues={fetchValues}
                  fetchMoreValues={fetchMoreValues}
                  onAttributeSelectBlur={onAttributeSelectBlur}
                  richTextGetters={attributeRichTextGetters}
                />
                <CardSpacer />
                <Attributes
                  title={
                    m.dashboard_attributesSelectionHeader() ?? 'Variant Selection Attributes'
                  }
                  attributes={data?.attributes?.filter(
                    (attribute) =>
                      attribute.data?.variantAttributeScope ===
                      ProductAttributeScope.VariantSelection
                  )}
                  values={values}
                  loading={disabled}
                  disabled={disabled}
                  errors={errors}
                  onChange={handlers.selectAttribute}
                  onMultiChange={handlers.selectAttributeMultiple}
                  onFileChange={handlers.selectAttributeFile}
                  onReferencesRemove={handlers.selectAttributeReference}
                  onReferencesAddClick={onAssignReferencesClick}
                  onReferencesReorder={handlers.reorderValue}
                  fetchValues={fetchValues}
                  fetchMoreValues={fetchMoreValues}
                  onAttributeSelectBlur={onAttributeSelectBlur}
                  richTextGetters={attributeRichTextGetters}
                />
                <CardSpacer />
                <ProductCheckoutSettings
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <ProductShipping
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  weightUnit={weightUnit}
                  onChange={change}
                />
                <CardSpacer />
                <ProductPrice
                  disabled={!product}
                  ProductChannelListings={data?.channelListings?.map((channel) => ({
                    ...channel.data,
                    ...channel.value,
                  }))}
                  errors={[]}
                  loading={!product}
                  onChange={handlers.changeChannels}
                />
                <CardSpacer />
                <ProductStocks
                  data={data}
                  disabled={disabled}
                  hasVariants={true}
                  onFormDataChange={change}
                  formErrors={formErrors}
                  errors={errors}
                  stocks={data?.stocks}
                  warehouses={warehouses}
                  onChange={handlers.changeStock}
                  onChangePreorderEndDate={handlers.changePreorderEndDate}
                  onWarehouseStockAdd={handlers.addStock}
                  onWarehouseStockDelete={handlers.deleteStock}
                  onWarehouseConfigure={onWarehouseConfigure}
                />
                <CardSpacer />
                <Metadata data={data} onChange={handlers.changeMetadata} />
              </div>
            </Grid>
            <SaveBar
              disabled={isSaveDisabled}
              labels={{
                confirm: m.dashboard_saveVariant() ?? 'Save variant',
                delete: m.dashboard_deleteVariant() ?? 'Delete Variant',
              }}
              state={saveButtonBarState}
              onCancel={() => router.push(productUrl(productId))}
              onSubmit={submit}
            />
            {canOpenAssignReferencesAttributeDialog && (
              <AssignValueDialog
                entityType={getReferenceAttributeEntityTypeFromAttribute(
                  assignReferencesAttributeId,
                  data?.attributes
                )}
                confirmButtonState={'default'}
                products={referenceProducts}
                pages={referencePages}
                hasMore={handlers.fetchMoreReferences?.hasMore}
                open={canOpenAssignReferencesAttributeDialog}
                onFetch={handlers.fetchReferences}
                onFetchMore={handlers.fetchMoreReferences?.onFetchMore}
                loading={handlers.fetchMoreReferences?.fetching}
                onClose={onCloseDialog}
                onSubmit={(values) => handleAssignReferenceAttribute(values, data, handlers)}
              />
            )}
            {product && (
              <VariantChannelsDialog
                channelListings={product.channelListings}
                selectedChannelListings={data?.channelListings}
                open={isManageChannelsModalOpen}
                onClose={toggleManageChannels}
                onConfirm={handlers.updateChannels}
              />
            )}
          </Container>
        );
      }}
    </ProductCreateForm>
  );
};
ProductCreatePage.displayName = 'ProductCreatePage';
export default ProductCreatePage;
