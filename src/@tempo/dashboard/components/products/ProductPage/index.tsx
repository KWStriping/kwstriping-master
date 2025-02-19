import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { ProductAttributeScope } from '@tempo/api/generated/constants';
import type {
  ProductChannelListingErrorFragment,
  ProductErrorWithAttributesFragment,
  ProductFragment,
  SearchValuesQuery,
  SearchPagesQuery,
  SearchProductsQuery,
  WarehouseFragment,
} from '@tempo/api/generated/graphql';
import type { ChannelPriceData } from '@tempo/dashboard/oldSrc/channels/utils';
import { productUrl } from '@tempo/dashboard/oldSrc/products/urls';
import { getSelectedMedia } from '@tempo/dashboard/oldSrc/products/utils/data';
import type { FetchMoreProps, RelayToFlat, ReorderAction } from '@tempo/dashboard/oldSrc/types';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FC } from 'react';

import ProductShipping from '../ProductShipping/ProductShipping';
import type { ProductStockInput } from '../ProductStocks';
import ProductStocks from '../ProductStocks';
import { useManageChannels } from '../ProductChannels/useManageChannels';
import { VariantChannelsDialog } from '../ProductChannels/VariantChannelsDialog';
import ProductCheckoutSettings from '../ProductCheckoutSettings';
import ProductEndPreorderDialog from '../ProductEndPreorderDialog';
import ProductMediaSelectDialog from '../ProductImageSelectDialog';
import ProductMedia from '../ProductMedia';
import ProductName from '../ProductName';
import ProductNavigation from '../ProductNavigation';
import ProductPrice from '../ProductPrice';
import ProductSetDefault from '../ProductSetDefault';
import type { ProductUpdateData, ProductUpdateHandlers, ProductUpdateSubmitData } from './form';
import ProductUpdateForm from './form';
import {
  getReferenceAttributeEntityTypeFromAttribute,
  mergeValues,
} from '@tempo/dashboard/oldSrc/attributes/utils/data';
import { VariantDetailsChannelsAvailabilityCard } from '@tempo/dashboard/components/products/ProductChannels/ChannelsAvailabilityCard';
import AssignValueDialog from '@tempo/dashboard/components/dialogs/AssignValueDialog';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import Attributes from '@tempo/dashboard/components/attributes/AttributesCard';
import type { AttributeInput } from '@tempo/dashboard/components/attributes/AttributesCard';

const messages = {
  nonSelectionAttributes: {
    id: 'f3B4tc',
    defaultMessage: 'Variant Attributes',
    description: 'attributes, section header',
  },
  selectionAttributesHeader: {
    id: 'o6260f',
    defaultMessage: 'Variant Selection Attributes',
    description: 'attributes, section header',
  },
};

export interface ProductPageFormData extends MetadataFormData {
  costPrice: string;
  price: string;
  sku: string;
  trackInventory: boolean;
  weight: string;
}

export interface ProductPageSubmitData extends ProductPageFormData {
  attributes: AttributeInput[];
  addStocks: ProductStockInput[];
  updateStocks: ProductStockInput[];
  removeStocks: string[];
}

function byAttributeScope(scope: ProductAttributeScope) {
  return (attribute: AttributeInput) => attribute.data?.variantAttributeScope === scope;
}

interface ProductPageProps {
  productId: string;
  assignReferencesAttributeId?: string;
  defaultVariantId?: string;
  defaultWeightUnit: string;
  errors: ProductErrorWithAttributesFragment[];
  header: string;
  channels: ChannelPriceData[];
  channelErrors: ProductChannelListingErrorFragment[];
  loading?: boolean;
  placeholderImage?: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  variant?: Maybe<ProductFragment>;
  warehouses: WarehouseFragment[];
  referencePages?: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
  referenceProducts?: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  values: RelayToFlat<SearchValuesQuery['attribute']['choices']>;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchMoreReferenceProducts?: FetchMoreProps;
  fetchMoreValues?: FetchMoreProps;
  fetchReferencePages?: (data: string) => void;
  fetchReferenceProducts?: (data: string) => void;
  fetchValues: (query: string, attributeId: string) => void;
  onAssignReferencesClick: (attribute: AttributeInput) => void;
  onCloseDialog: () => void;
  onVariantPreorderDeactivate: (id: string) => void;
  variantDeactivatePreoderButtonState: ConfirmButtonTransitionState;
  onVariantReorder: ReorderAction;
  onAttributeSelectBlur: () => void;
  onDelete();
  onSubmit(data: ProductUpdateSubmitData);
  onSetDefaultVariant();
  onWarehouseConfigure();
}

const ProductPage: FC<ProductPageProps> = ({
  productId,
  channels,
  channelErrors,
  defaultVariantId,
  defaultWeightUnit,
  errors: apiErrors,
  header,
  loading,
  placeholderImage,
  saveButtonBarState,
  variant,
  warehouses,
  referencePages = [],
  referenceProducts = [],
  values,
  onDelete,
  onSubmit,
  onVariantPreorderDeactivate,
  variantDeactivatePreoderButtonState,
  onVariantReorder,
  onSetDefaultVariant,
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
  const [isModalOpened, setModalStatus] = useState(false);
  const toggleModal = () => setModalStatus(!isModalOpened);

  const [isEndPreorderModalOpened, setIsEndPreorderModalOpened] = useState(false);

  const productMedia = [...(variant?.product?.media ?? [])]?.sort((prev, next) =>
    prev.sortOrder > next.sortOrder ? 1 : -1
  );

  const canOpenAssignReferencesAttributeDialog = !!assignReferencesAttributeId;

  const handleDeactivatePreorder = async () => {
    await onVariantPreorderDeactivate(variant.id);
    setIsEndPreorderModalOpened(false);
  };

  const handleAssignReferenceAttribute = (
    values: string[],
    data: ProductUpdateData,
    handlers: ProductUpdateHandlers
  ) => {
    handlers.selectAttributeReference(
      assignReferencesAttributeId,
      mergeValues(assignReferencesAttributeId, values, data?.attributes)
    );
    onCloseDialog();
  };

  return (
    <>
      <Container>
        <Backlink href={productUrl(productId)}>{variant?.product?.name}</Backlink>
        <PageHeader title={header}>
          {variant?.product?.defaultVariant?.id !== variant?.id && (
            <ProductSetDefault onSetDefaultVariant={onSetDefaultVariant} />
          )}
        </PageHeader>
        <ProductUpdateForm
          variant={variant}
          onSubmit={onSubmit}
          warehouses={warehouses}
          currentChannels={channels}
          referencePages={referencePages}
          referenceProducts={referenceProducts}
          fetchReferencePages={fetchReferencePages}
          fetchMoreReferencePages={fetchMoreReferencePages}
          fetchReferenceProducts={fetchReferenceProducts}
          fetchMoreReferenceProducts={fetchMoreReferenceProducts}
          assignReferencesAttributeId={assignReferencesAttributeId}
          loading={loading}
        >
          {({
            change,
            data,
            formErrors,
            validationErrors,
            isSaveDisabled,
            handlers,
            submit,
            attributeRichTextGetters,
          }) => {
            const nonSelectionAttributes = data?.attributes?.filter(
              byAttributeScope(ProductAttributeScope.NotVariantSelection)
            );
            const selectionAttributes = data?.attributes?.filter(
              byAttributeScope(ProductAttributeScope.VariantSelection)
            );
            const media = getSelectedMedia(productMedia, data?.media);

            const errors = [...apiErrors, ...validationErrors];

            return (
              <>
                <Grid variant="inverted">
                  <div>
                    <ProductNavigation
                      productId={productId}
                      current={variant?.id}
                      defaultVariantId={defaultVariantId}
                      fallbackThumbnail={variant?.product?.thumbnail?.url}
                      variants={variant?.product.variants}
                      onReorder={onVariantReorder}
                    />
                  </div>
                  <div>
                    <ProductName
                      value={data?.name}
                      onChange={change}
                      disabled={loading}
                      errors={errors}
                    />
                    <CardSpacer />
                    <VariantDetailsChannelsAvailabilityCard
                      variant={variant}
                      onManageClick={toggleManageChannels}
                    />
                    {!!nonSelectionAttributes?.length && (
                      <>
                        <Attributes
                          title={m.dashboard_onSelectionAttributes() ?? 'Variant Attributes'}
                          attributes={nonSelectionAttributes}
                          values={values}
                          loading={loading}
                          disabled={loading}
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
                      </>
                    )}
                    {!!selectionAttributes?.length && (
                      <>
                        <Attributes
                          title={
                            m.dashboard_selectionAttributesHeader() ??
                            'Variant Selection Attributes'
                          }
                          attributes={selectionAttributes}
                          values={values}
                          loading={loading}
                          disabled={loading}
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
                      </>
                    )}
                    <ProductMedia
                      disabled={loading}
                      media={media}
                      placeholderImage={placeholderImage}
                      onImageAdd={toggleModal}
                    />
                    <CardSpacer />
                    <ProductPrice
                      disabled={!variant}
                      ProductChannelListings={data?.channelListings?.map((channel) => ({
                        ...channel.data,
                        ...channel.value,
                      }))}
                      errors={channelErrors}
                      loading={loading}
                      onChange={handlers.changeChannels}
                    />
                    <CardSpacer />
                    <ProductCheckoutSettings
                      data={data}
                      disabled={loading}
                      errors={errors}
                      onChange={change}
                    />
                    <CardSpacer />

                    <ProductShipping
                      data={data}
                      disabled={loading}
                      errors={errors}
                      weightUnit={variant?.weight?.unit || defaultWeightUnit}
                      onChange={change}
                    />
                    <CardSpacer />
                    <ProductStocks
                      productVariantChannelListings={data?.channelListings?.map((channel) => ({
                        ...channel.data,
                        ...channel.value,
                      }))}
                      onVariantChannelListingChange={handlers.changeChannels}
                      data={data}
                      disabled={loading}
                      hasVariants={true}
                      errors={errors}
                      formErrors={formErrors}
                      stocks={data?.stocks}
                      warehouses={warehouses}
                      onChange={handlers.changeStock}
                      onFormDataChange={change}
                      onChangePreorderEndDate={handlers.changePreorderEndDate}
                      onEndPreorderTrigger={
                        variant?.preorder ? () => setIsEndPreorderModalOpened(true) : null
                      }
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
                  state={saveButtonBarState}
                  onCancel={() => router.push(productUrl(productId))}
                  onDelete={onDelete}
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
                {variant && (
                  <>
                    <VariantChannelsDialog
                      channelListings={variant.product.channelListings}
                      selectedChannelListings={data?.channelListings}
                      open={isManageChannelsModalOpen}
                      onClose={toggleManageChannels}
                      onConfirm={handlers.updateChannels}
                    />
                    <ProductMediaSelectDialog
                      onClose={toggleModal}
                      onConfirm={handlers.changeMedia}
                      open={isModalOpened}
                      media={productMedia}
                      selectedMedia={data?.media}
                    />
                  </>
                )}
              </>
            );
          }}
        </ProductUpdateForm>
      </Container>
      {!!variant?.preorder && (
        <ProductEndPreorderDialog
          confirmButtonState={variantDeactivatePreoderButtonState}
          onClose={() => setIsEndPreorderModalOpened(false)}
          onConfirm={handleDeactivatePreorder}
          open={isEndPreorderModalOpened}
          variantGlobalSoldUnits={variant?.preorder?.globalSoldUnits}
        />
      )}
    </>
  );
};
ProductPage.displayName = 'ProductPage';
export default ProductPage;
