import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { FC } from 'react';
import { PermissionCode } from '@tempo/api/generated/constants';
import type {
  ChannelFragment,
  ProductChannelListingErrorFragment,
  ProductDetailsVariantFragment,
  ProductErrorFragment,
  ProductErrorWithAttributesFragment,
  ProductFragment,
  SearchValuesQuery,
  SearchCategoriesQuery,
  SearchCollectionsQuery,
  SearchPagesQuery,
  SearchProductsQuery,
  ShopLimitFragment,
  TaxClassBaseFragment,
  WarehouseFragment,
} from '@tempo/api/generated/graphql';
import ProductDetailsForm from '../ProductDetailsForm';
import ProductMedia from '../ProductMedia';
import ProductOrganization from '../ProductOrganization';
import ProductTaxes from '../ProductTaxes';
import Products from '../Products';
import ProductUpdateForm from './form';
import ProductChannelsListingsDialog from './ProductChannelsListingsDialog';
import type { ProductUpdateData, ProductUpdateHandlers, ProductUpdateSubmitData } from './types';
import type { AttributeInput } from '@tempo/dashboard/components/attributes/AttributesCard';
import Attributes from '@tempo/dashboard/components/attributes/AttributesCard';
import ChannelsAvailabilityCard from '@tempo/dashboard/components/cards/ChannelsAvailabilityCard';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import AssignValueDialog from '@tempo/dashboard/components/dialogs/AssignValueDialog';
import type { Choice } from '@tempo/dashboard/components/fields/SingleSelectField';
import SeoForm from '@tempo/dashboard/components/forms/SeoForm';
import ProductExternalMediaDialog from '@tempo/dashboard/components/products/ProductExternalMediaDialog';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import {
  getReferenceAttributeEntityTypeFromAttribute,
  mergeValues,
} from '@tempo/dashboard/oldSrc/attributes/utils/data';
import type { ChannelData } from '@tempo/dashboard/oldSrc/channels/utils';
import type { ProductListError } from '@tempo/dashboard/oldSrc/products/ProductUpdate/handlers/errors';
import type { UseProductUpdateHandlerError } from '@tempo/dashboard/oldSrc/products/ProductUpdate/handlers/useProductUpdateHandler';
import { productImageUrl } from '@tempo/dashboard/oldSrc/products/urls';
import { getChoices } from '@tempo/dashboard/oldSrc/products/utils/data';
import type { FetchMoreProps, RelayToFlat } from '@tempo/dashboard/oldSrc/types';

export interface ProductUpdatePageProps {
  channels: ChannelFragment[];
  productId: string;
  channelsErrors: ProductChannelListingErrorFragment[];
  variantListErrors: ProductListError[];
  errors: UseProductUpdateHandlerError[];
  placeholderImage: string;
  collections: RelayToFlat<NonNullable<SearchCollectionsQuery['search']>>;
  categories: RelayToFlat<NonNullable<SearchCategoriesQuery['search']>>;
  values: RelayToFlat<SearchValuesQuery['attribute']['choices']>;
  disabled: boolean;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  isMediaUrlModalVisible?: boolean;
  limits: Maybe<ShopLimitFragment['limits']>;
  variants: Maybe<ProductDetailsVariantFragment[]>;
  media: ProductFragment['media'];
  product: Maybe<ProductFragment>;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  warehouses: WarehouseFragment[];
  taxClasses: TaxClassBaseFragment[];
  fetchMoreTaxClasses: FetchMoreProps;
  referencePages?: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
  referenceProducts?: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  assignReferencesAttributeId?: string;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchMoreReferenceProducts?: FetchMoreProps;
  fetchMoreValues?: FetchMoreProps;
  isSimpleProduct: boolean;
  fetchCategories: (query: string) => void;
  fetchCollections: (query: string) => void;
  fetchReferencePages?: (data: string) => void;
  fetchReferenceProducts?: (data: string) => void;
  fetchValues: (query: string, attributeId: string) => void;
  refetch: () => void;
  onValuesSearch: (id: string, query: string) => Promise<Array<Choice<string, string>>>;
  onAssignReferencesClick: (attribute: AttributeInput) => void;
  onCloseDialog: () => void;
  onImageDelete: (id: string) => () => void;
  onSubmit: (data: ProductUpdateSubmitData) => SubmitPromise;
  onVariantShow: (id: string) => void;
  onAttributeSelectBlur: () => void;
  onDelete: () => void;
  onImageReorder?: (event: { oldIndex: number; newIndex: number }) => void;
  onImageUpload: (file: File) => void;
  onMediaUrlUpload: (mediaUrl: string) => void;
  onSeoClick?: () => void;
}

export const ProductUpdatePage: FC<ProductUpdatePageProps> = ({
  productId,
  disabled,
  categories: categoryChoiceList,
  channels,
  channelsErrors,
  variantListErrors,
  collections: collectionChoiceList,
  values,
  isSimpleProduct,
  errors,
  fetchCategories,
  fetchCollections,
  fetchMoreCategories,
  fetchMoreCollections,
  media,
  header,
  limits,
  placeholderImage,
  product,
  saveButtonBarState,
  variants,
  warehouses,
  taxClasses,
  fetchMoreTaxClasses,
  referencePages = [],
  referenceProducts = [],
  onDelete,
  onImageDelete,
  onImageReorder,
  onImageUpload,
  onMediaUrlUpload,
  onVariantShow,
  onSeoClick,
  onSubmit,
  isMediaUrlModalVisible,
  assignReferencesAttributeId,
  onValuesSearch,
  onAssignReferencesClick,
  fetchReferencePages,
  fetchMoreReferencePages,
  fetchReferenceProducts,
  fetchMoreReferenceProducts,
  fetchValues,
  fetchMoreValues,
  refetch,
  onCloseDialog,
  onAttributeSelectBlur,
}) => {
  const router = useRouter();
  const [channelPickerOpen, setChannelPickerOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useStateFromProps(
    product?.category?.name || ''
  );

  const [mediaUrlModalStatus, setMediaUrlModalStatus] = useStateFromProps(
    isMediaUrlModalVisible || false
  );

  const [selectedCollections, setSelectedCollections] = useStateFromProps(
    getChoices(product.collections ?? [])
  );

  const [selectedTaxClass, setSelectedTaxClass] = useStateFromProps(
    product?.taxClass?.name ?? ''
  );

  const categories = getChoices(categoryChoiceList);
  const collections = getChoices(collectionChoiceList);
  const hasVariants = product?.productKlass?.hasVariants;
  const taxClassesChoices =
    taxClasses?.map((taxClass) => ({
      label: taxClass.name,
      value: taxClass.id,
    })) || [];

  const canOpenAssignReferencesAttributeDialog = !!assignReferencesAttributeId;

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

  const productErrors = useMemo(
    () =>
      errors?.filter(
        (error) => error.__typename === 'ProductError'
      ) as ProductErrorWithAttributesFragment[],
    [errors]
  );

  const productOrganizationErrors = useMemo(
    () =>
      [...errors, ...channelsErrors].filter((err) =>
        ['ProductChannelListingError', 'ProductError'].includes(err.__typename)
      ) as Array<ProductErrorFragment | ProductChannelListingErrorFragment>,
    [errors, channelsErrors]
  );

  return (
    <ProductUpdateForm
      isSimpleProduct={isSimpleProduct}
      onSubmit={onSubmit}
      product={product}
      categories={categories}
      collections={collections}
      selectedCollections={selectedCollections}
      setSelectedCategory={setSelectedCategory}
      setSelectedCollections={setSelectedCollections}
      setSelectedTaxClass={setSelectedTaxClass}
      taxClasses={taxClassesChoices}
      warehouses={warehouses}
      hasVariants={hasVariants}
      referencePages={referencePages}
      referenceProducts={referenceProducts}
      fetchReferencePages={fetchReferencePages}
      fetchMoreReferencePages={fetchMoreReferencePages}
      fetchReferenceProducts={fetchReferenceProducts}
      fetchMoreReferenceProducts={fetchMoreReferenceProducts}
      assignReferencesAttributeId={assignReferencesAttributeId}
      disabled={disabled}
      refetch={refetch}
    >
      {({ change, data, handlers, submit, isSaveDisabled, attributeRichTextGetters }) => {
        const availabilityCommonProps = {
          managePermissions: [PermissionCode.ManageProducts],
          messages: {
            hiddenLabel: t(
              'dashboard_aKXY3',
              'Not published'
              // product label
            ),
            visibleLabel: t(
              'dashboard_Jedl0',
              'Published'
              // product label
            ),
          },
          errors: channelsErrors,
          allChannelsCount: channels?.length,
          disabled,
          onChange: handlers.changeChannels,
          openModal: () => setChannelPickerOpen(true),
        };

        const listings = data?.channels?.updateChannels?.map<ChannelData>((listing) => {
          const channel = channels?.find((ac) => ac.id === listing.channelId);
          return {
            id: listing.channelId,
            ...channel,
            ...listing,
            availableForPurchase: listing.availableForPurchaseDate,
            currency: channel?.currencyCode,
          };
        });

        const entityType = getReferenceAttributeEntityTypeFromAttribute(
          assignReferencesAttributeId,
          data?.attributes
        );

        return (
          <>
            <Container>
              <Backlink href={'/products'}>{m.dashboard_products() ?? 'Products'}</Backlink>
              <PageHeader title={header} />
              <Grid richText>
                <div>
                  <ProductDetailsForm
                    data={data}
                    disabled={disabled}
                    errors={productErrors}
                    onChange={change}
                  />
                  <CardSpacer />
                  <ProductMedia
                    media={media}
                    placeholderImage={placeholderImage}
                    onImageDelete={onImageDelete}
                    onImageReorder={onImageReorder}
                    onImageUpload={onImageUpload}
                    openMediaUrlModal={() => setMediaUrlModalStatus(true)}
                    getImageEditUrl={(imageId) => productImageUrl(productId, imageId)}
                  />
                  <CardSpacer />
                  {!!data?.attributes?.length && (
                    <Attributes
                      attributes={data?.attributes}
                      values={values}
                      errors={productErrors}
                      loading={disabled}
                      disabled={disabled}
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
                  )}
                  <CardSpacer />
                  <Products
                    productName={product?.name}
                    errors={variantListErrors}
                    channels={listings}
                    limits={limits}
                    variants={variants}
                    variantAttributes={product?.productKlass.variantAttributes}
                    warehouses={warehouses}
                    onValuesSearch={onValuesSearch}
                    onChange={handlers.changeVariants}
                    onRowClick={onVariantShow}
                  />
                  <CardSpacer />
                  <SeoForm
                    errors={productErrors}
                    title={data?.seoTitle}
                    titlePlaceholder={data?.name}
                    description={data?.seoDescription}
                    descriptionPlaceholder={''} // TODO: cast description to string
                    slug={data?.slug}
                    slugPlaceholder={data?.name}
                    loading={disabled}
                    onClick={onSeoClick}
                    onChange={change}
                    helperText={
                      m.dashboard_KoIB_() ??
                      'Add search engine title and description to make this product easier to find'
                    }
                  />
                  <CardSpacer />
                  <Metadata data={data} onChange={handlers.changeMetadata} />
                </div>
                <div>
                  <ProductOrganization
                    canChangeType={false}
                    categories={categories}
                    categoryInputDisplayValue={selectedCategory}
                    collections={collections}
                    collectionsInputDisplayValue={selectedCollections}
                    data={data}
                    disabled={disabled}
                    errors={productOrganizationErrors}
                    fetchCategories={fetchCategories}
                    fetchCollections={fetchCollections}
                    fetchMoreCategories={fetchMoreCategories}
                    fetchMoreCollections={fetchMoreCollections}
                    productKlass={product?.productKlass}
                    onCategoryChange={handlers.selectCategory}
                    onCollectionChange={handlers.selectCollection}
                  />
                  <CardSpacer />
                  <ChannelsAvailabilityCard {...availabilityCommonProps} channels={listings} />
                  <CardSpacer />
                  <ProductTaxes
                    value={data?.taxClassId}
                    disabled={disabled}
                    onChange={handlers.selectTaxClass}
                    taxClassDisplayName={selectedTaxClass}
                    taxClasses={taxClasses}
                    onFetchMore={fetchMoreTaxClasses}
                  />
                </div>
              </Grid>
              <SaveBar
                onCancel={() => router.push('/products')}
                onDelete={onDelete}
                onSubmit={submit}
                state={saveButtonBarState}
                disabled={isSaveDisabled}
              />
              {canOpenAssignReferencesAttributeDialog && entityType && (
                <AssignValueDialog
                  entityType={entityType}
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

              <ProductExternalMediaDialog
                product={product}
                onClose={() => setMediaUrlModalStatus(false)}
                open={mediaUrlModalStatus}
                onSubmit={onMediaUrlUpload}
              />
              <ProductChannelsListingsDialog
                channels={channels}
                data={data}
                onClose={() => setChannelPickerOpen(false)}
                open={channelPickerOpen}
                onConfirm={handlers.updateChannelList}
              />
            </Container>
          </>
        );
      }}
    </ProductUpdateForm>
  );
};
ProductUpdatePage.displayName = 'ProductUpdatePage';
export default ProductUpdatePage;
