import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { PermissionCode } from '@tempo/api/generated/constants';
import type {
  ProductChannelListingErrorFragment,
  ProductErrorWithAttributesFragment,
  ProductKlassQuery,
  SearchValuesQuery,
  SearchCategoriesQuery,
  SearchCollectionsQuery,
  SearchPagesQuery,
  SearchProductsQuery,
  SearchProductKlassesQuery,
  SearchWarehousesQuery,
  TaxClassBaseFragment,
} from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import ProductDetailsForm from '../ProductDetailsForm';
import ProductOrganization from '../ProductOrganization';
import ProductShipping from '../ProductShipping/ProductShipping';
import ProductStocks from '../ProductStocks';
import type { AttributeInput } from '@tempo/dashboard/components/attributes/AttributesCard';
import Attributes from '@tempo/dashboard/components/attributes/AttributesCard';
import ChannelsAvailabilityCard from '@tempo/dashboard/components/cards/ChannelsAvailabilityCard';
import CannotDefineChannelsAvailabilityCard from '@tempo/dashboard/components/channels/CannotDefineChannelsAvailabilityCard/CannotDefineChannelsAvailabilityCard';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import AssignValueDialog from '@tempo/dashboard/components/dialogs/AssignValueDialog';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import SeoForm from '@tempo/dashboard/components/forms/SeoForm';
import ProductPrice from '@tempo/dashboard/components/products/ProductPrice';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import {
  getReferenceAttributeEntityTypeFromAttribute,
  mergeValues,
} from '@tempo/dashboard/oldSrc/attributes/utils/data';
import type { ChannelData } from '@tempo/dashboard/oldSrc/channels/utils';
import type { ProductCreateUrlQueryParams } from '@tempo/dashboard/oldSrc/products/urls';
import { getChoices } from '@tempo/dashboard/oldSrc/products/utils/data';

import type { FetchMoreProps, RelayToFlat } from '@tempo/dashboard/oldSrc/types';
import ProductTaxes from '../ProductTaxes';
import type { ProductCreateData, ProductCreateFormData, ProductCreateHandlers } from './form';
import ProductCreateForm from './form';

interface ProductCreatePageProps {
  errors: ProductErrorWithAttributesFragment[];
  channelsErrors: ProductChannelListingErrorFragment[];
  allChannelsCount: Maybe<number>;
  currentChannels: ChannelData[];
  collections: RelayToFlat<NonNullable<SearchCollectionsQuery['search']>>;
  categories: RelayToFlat<NonNullable<SearchCategoriesQuery['search']>>;
  values: RelayToFlat<SearchValuesQuery['attribute']['choices']>;
  loading: boolean;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreCollections: FetchMoreProps;
  fetchMoreProductKlasses: FetchMoreProps;
  fetchMoreValues?: FetchMoreProps;
  initial?: Partial<ProductCreateFormData>;
  productKlasses?: RelayToFlat<NonNullable<SearchProductKlassesQuery['search']>>;
  referencePages?: RelayToFlat<NonNullable<SearchPagesQuery['search']>>;
  referenceProducts?: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  header: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  weightUnit: string;
  warehouses: RelayToFlat<NonNullable<SearchWarehousesQuery['search']>>;
  taxClasses: TaxClassBaseFragment[];
  fetchMoreTaxClasses: FetchMoreProps;
  selectedProductKlass?: ProductKlassQuery['productKlass'];
  fetchCategories: (data: string) => void;
  fetchCollections: (data: string) => void;
  fetchProductKlasses: (data: string) => void;
  fetchValues: (query: string, attributeId: string) => void;
  onWarehouseConfigure: () => void;
  openChannelsModal: () => void;
  onChannelsChange: (data: ChannelData[]) => void;
  assignReferencesAttributeId?: string;
  onAssignReferencesClick: (attribute: AttributeInput) => void;
  fetchReferencePages?: (data: string) => void;
  fetchReferenceProducts?: (data: string) => void;
  fetchMoreReferencePages?: FetchMoreProps;
  fetchMoreReferenceProducts?: FetchMoreProps;
  onAttributeSelectBlur: () => void;
  onCloseDialog: (currentParams?: ProductCreateUrlQueryParams) => void;
  onSelectProductKlass: (klassId: string) => void;
  onSubmit?(data: ProductCreateData);
}

export const ProductCreatePage: FC<ProductCreatePageProps> = ({
  allChannelsCount,
  channelsErrors,
  currentChannels,
  loading,
  categories: categoryChoiceList,
  collections: collectionChoiceList,
  values,
  errors: apiErrors,
  fetchCategories,
  fetchCollections,
  fetchMoreCategories,
  fetchMoreCollections,
  fetchMoreProductKlasses,
  header,
  initial,
  productKlasses: productKlassChoiceList,
  referencePages = [],
  referenceProducts = [],
  saveButtonBarState,
  warehouses,
  taxClasses,
  fetchMoreTaxClasses,
  selectedProductKlass,
  fetchProductKlasses,
  weightUnit,
  onSubmit,
  onChannelsChange,
  onWarehouseConfigure,
  openChannelsModal,
  assignReferencesAttributeId,
  onAssignReferencesClick,
  fetchReferencePages,
  fetchMoreReferencePages,
  fetchReferenceProducts,
  fetchMoreReferenceProducts,
  fetchValues,
  fetchMoreValues,
  onCloseDialog,
  onSelectProductKlass,
  onAttributeSelectBlur,
}: ProductCreatePageProps) => {
  const router = useRouter();

  const closeDialog = () => {
    onCloseDialog({ 'product-type-id': selectedProductKlass.id });
  };

  // Display values
  const [selectedCategory, setSelectedCategory] = useStateFromProps(initial?.category || '');

  const [selectedCollections, setSelectedCollections] = useStateFromProps<
    MultiAutocompleteChoiceType[]
  >([]);

  const [selectedTaxClass, setSelectedTaxClass] = useStateFromProps(initial?.taxClassId ?? '');

  const categories = getChoices(categoryChoiceList);
  const collections = getChoices(collectionChoiceList);
  const productKlasses = getChoices(productKlassChoiceList);
  const taxClassChoices =
    taxClasses?.map((taxClass) => ({
      label: taxClass.name,
      value: taxClass.id,
    })) ?? [];

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

    closeDialog();
  };

  return (
    <ProductCreateForm
      onSubmit={onSubmit}
      initial={initial}
      selectedProductKlass={selectedProductKlass}
      onSelectProductKlass={onSelectProductKlass}
      categories={categories}
      collections={collections}
      productKlasses={productKlassChoiceList}
      referencePages={referencePages}
      referenceProducts={referenceProducts}
      selectedCollections={selectedCollections}
      setSelectedCategory={setSelectedCategory}
      setSelectedCollections={setSelectedCollections}
      setSelectedTaxClass={setSelectedTaxClass}
      setChannels={onChannelsChange}
      taxClasses={taxClassChoices}
      warehouses={warehouses}
      currentChannels={currentChannels}
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
        handlers,
        submit,
        isSaveDisabled,
        attributeRichTextGetters,
      }) => {
        // Comparing explicitly to false because `hasVariants` can be undefined
        const isSimpleProduct = data?.productKlass?.hasVariants === false;

        const errors = [...apiErrors, ...validationErrors];

        const entityType = getReferenceAttributeEntityTypeFromAttribute(
          assignReferencesAttributeId,
          data?.attributes
        );

        return (
          <Container>
            <Backlink href={'/products'}>{m.dashboard_products() ?? 'Products'}</Backlink>
            <PageHeader title={header} />
            <Grid>
              <div>
                <ProductDetailsForm
                  data={data}
                  disabled={loading}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                {!!data?.attributes?.length && (
                  <Attributes
                    attributes={data?.attributes}
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
                )}
                <CardSpacer />
                {isSimpleProduct && (
                  <>
                    <ProductShipping
                      data={data}
                      disabled={loading}
                      errors={errors}
                      weightUnit={weightUnit}
                      onChange={change}
                    />
                    <CardSpacer />
                    <ProductPrice
                      ProductChannelListings={data?.channelListings}
                      errors={channelsErrors}
                      loading={loading}
                      onChange={handlers.changeChannelPrice}
                    />
                    <CardSpacer />
                    <ProductStocks
                      data={data}
                      disabled={loading}
                      hasVariants={false}
                      onFormDataChange={change}
                      errors={errors}
                      formErrors={formErrors}
                      stocks={data?.stocks}
                      warehouses={warehouses}
                      onChange={handlers.changeStock}
                      onChangePreorderEndDate={handlers.changePreorderEndDate}
                      onWarehouseStockAdd={handlers.addStock}
                      onWarehouseStockDelete={handlers.deleteStock}
                      onWarehouseConfigure={onWarehouseConfigure}
                    />
                    <CardSpacer />
                  </>
                )}
                <SeoForm
                  allowEmptySlug={true}
                  helperText={
                    m.dashboard_KoIB_() ??
                    'Add search engine title and description to make this product easier to find'
                  }
                  title={data?.seoTitle}
                  slug={data?.slug}
                  slugPlaceholder={data?.name}
                  titlePlaceholder={data?.name}
                  description={data?.seoDescription}
                  descriptionPlaceholder={data?.seoTitle}
                  loading={loading}
                  onChange={change}
                />
                <CardSpacer />
                <Metadata data={data} onChange={handlers.changeMetadata} />
              </div>
              <div>
                <ProductOrganization
                  canChangeType={true}
                  categories={categories}
                  categoryInputDisplayValue={selectedCategory}
                  collections={collections}
                  data={data}
                  disabled={loading}
                  errors={[...errors, ...channelsErrors]}
                  fetchCategories={fetchCategories}
                  fetchCollections={fetchCollections}
                  fetchMoreCategories={fetchMoreCategories}
                  fetchMoreCollections={fetchMoreCollections}
                  fetchMoreProductKlasses={fetchMoreProductKlasses}
                  fetchProductKlasses={fetchProductKlasses}
                  productKlass={data?.productKlass}
                  productKlassInputDisplayValue={data?.productKlass?.name || ''}
                  productKlasses={productKlasses}
                  onCategoryChange={handlers.selectCategory}
                  onCollectionChange={handlers.selectCollection}
                  onProductKlassChange={handlers.selectProductKlass}
                  collectionsInputDisplayValue={selectedCollections}
                />
                <CardSpacer />
                {isSimpleProduct ? (
                  <ChannelsAvailabilityCard
                    managePermissions={[PermissionCode.ManageProducts]}
                    messages={{
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
                    }}
                    errors={channelsErrors}
                    allChannelsCount={allChannelsCount}
                    channels={data?.channelListings || []}
                    disabled={loading}
                    onChange={handlers.changeChannels}
                    openModal={openChannelsModal}
                  />
                ) : (
                  <CannotDefineChannelsAvailabilityCard />
                )}
                <CardSpacer />
                <ProductTaxes
                  value={data?.taxClassId}
                  disabled={loading}
                  onChange={handlers.selectTaxClass}
                  taxClassDisplayName={selectedTaxClass}
                  taxClasses={taxClasses}
                  onFetchMore={fetchMoreTaxClasses}
                />
              </div>
            </Grid>
            <SaveBar
              onCancel={() => router.push('/products')}
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
                onClose={closeDialog}
                onSubmit={(values) => handleAssignReferenceAttribute(values, data, handlers)}
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
