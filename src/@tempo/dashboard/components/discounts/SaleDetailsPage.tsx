import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { splitDateTime } from '@tempo/utils/datetime';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FC } from 'react';
import { PermissionCode, SaleType as SaleType } from '@tempo/api/generated/constants';
import type { DiscountErrorFragment, SaleDetailsFragment } from '@tempo/api/generated/graphql';
import DiscountCategories from './DiscountCategories';
import DiscountCollections from './DiscountCollections';
import DiscountDates from './DiscountDates';
import DiscountProducts from './DiscountProducts';
import DiscountVariants from './DiscountVariants';
import SaleInfo from './SaleInfo';
import SaleSummary from './SaleSummary';
import SaleTypeSelector from './SaleTypeSelector';
import SaleValue from './SaleValue';
import ChannelsAvailabilityCard from '@tempo/dashboard/components/cards/ChannelsAvailabilityCard';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import { Tab, TabContainer } from '@tempo/dashboard/components/core/Tab';
import Form from '@tempo/dashboard/components/forms/Form';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import { validateSalePrice } from '@tempo/dashboard/oldSrc/channels/utils';
import type { ChannelSaleData } from '@tempo/dashboard/oldSrc/channels/utils';
import {
  createSaleChannelsChangeHandler,
  createSaleUpdateHandler,
} from '@tempo/dashboard/oldSrc/discounts/handlers';
import { SALE_UPDATE_FORM_ID } from '@tempo/dashboard/oldSrc/discounts/SaleDetails/types';

import type { ChannelProps, ListProps, TabListActions } from '@tempo/dashboard/oldSrc/types';
import { mapMetadataItemToInput } from '@tempo/dashboard/oldSrc/utils/maps';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';

export interface ChannelSaleFormData extends ChannelSaleData {
  percentageValue: string;
  fixedValue: string;
}
export interface SaleDetailsPageFormData extends MetadataFormData {
  channelListings: ChannelSaleFormData[];
  endDate: string;
  endTime: string;
  hasEndDate: boolean;
  name: string;
  startDate: string;
  startTime: string;
  type: SaleType;
}

export enum SaleDetailsPageTab {
  categories = 'categories',
  collections = 'collections',
  products = 'products',
  variants = 'variants',
}

export type SaleTabItemsCount = Partial<Record<SaleDetailsPageTab, number>>;

export interface SaleDetailsPageProps
  extends Pick<ListProps, Exclude<keyof ListProps, 'getRowHref'>>,
    TabListActions<
      | 'categoryListToolbar'
      | 'collectionListToolbar'
      | 'productListToolbar'
      | 'variantListToolbar'
    >,
    ChannelProps {
  activeTab: SaleDetailsPageTab;
  tabItemsCount: SaleTabItemsCount;
  errors: DiscountErrorFragment[];
  sale: Maybe<SaleDetailsFragment>;
  allChannelsCount: Maybe<number>;
  channelListings: ChannelSaleFormData[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onCategoryAssign: () => void;
  onCategoryUnassign: (id: string) => void;
  onCollectionAssign: () => void;
  onCollectionUnassign: (id: string) => void;
  onProductAssign: () => void;
  onProductUnassign: (id: string) => void;
  onVariantAssign: () => void;
  onVariantUnassign: (id: string) => void;
  onRemove: () => void;
  onSubmit: (data: SaleDetailsPageFormData) => SubmitPromise<any[]>;
  onTabClick: (index: SaleDetailsPageTab) => void;
  onChannelsChange: (data: ChannelSaleFormData[]) => void;
  openChannelsModal: () => void;
}

const CategoriesTab = Tab(SaleDetailsPageTab.categories);
const CollectionsTab = Tab(SaleDetailsPageTab.collections);
const ProductsTab = Tab(SaleDetailsPageTab.products);
const VariantsTab = Tab(SaleDetailsPageTab.variants);

const SaleDetailsPage: FC<SaleDetailsPageProps> = ({
  activeTab,
  tabItemsCount = {},
  allChannelsCount,
  channelListings = [],
  disabled,
  errors,
  onRemove,
  onSubmit,
  onTabClick,
  openChannelsModal,
  sale,
  saveButtonBarState,
  onCategoryAssign,
  onCategoryUnassign,
  onChannelsChange,
  onCollectionAssign,
  onCollectionUnassign,
  onProductAssign,
  onProductUnassign,
  onVariantAssign,
  onVariantUnassign,
  categoryListToolbar,
  collectionListToolbar,
  productListToolbar,
  variantListToolbar,
  isChecked,
  selected,
  selectedChannelId,
  toggle,
  toggleAll,
}) => {
  const router = useRouter();

  const [localErrors, setLocalErrors] = useState<DiscountErrorFragment[]>([]);

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  const initialForm: SaleDetailsPageFormData = {
    channelListings,
    endDate: splitDateTime(sale?.endDate ?? '').date,
    endTime: splitDateTime(sale?.endDate ?? '').time,
    hasEndDate: !!sale?.endDate,
    name: sale?.name ?? '',
    startDate: splitDateTime(sale?.startDate ?? '').date,
    startTime: splitDateTime(sale?.startDate ?? '').time,
    type: sale?.type ?? SaleType.Fixed,
    metadata: sale?.metadata?.map(mapMetadataItemToInput),
    privateMetadata: sale?.privateMetadata?.map(mapMetadataItemToInput),
  };

  const checkIfSaveIsDisabled = (data: SaleDetailsPageFormData) =>
    data?.channelListings?.some((channel) => validateSalePrice(data, channel)) || disabled;

  return (
    <Form
      confirmLeave
      initial={initialForm}
      onSubmit={onSubmit}
      formId={SALE_UPDATE_FORM_ID}
      checkIfSaveIsDisabled={checkIfSaveIsDisabled}
    >
      {({ change, data, submit, triggerChange }) => {
        const handleChannelChange = createSaleChannelsChangeHandler(
          data?.channelListings,
          onChannelsChange,
          triggerChange,
          data?.type
        );
        const changeMetadata = makeMetadataChangeHandler(change);

        const handleSubmit = createSaleUpdateHandler(submit, setLocalErrors);

        const allErrors = [...localErrors, ...errors];

        return (
          <Container>
            <Backlink href={'/discounts/sales'}>{m.dashboard_sales() ?? 'Sales'}</Backlink>
            <PageHeader title={sale?.name} />
            <Grid>
              <div>
                <SaleInfo data={data} disabled={disabled} errors={errors} onChange={change} />
                <CardSpacer />
                <SaleTypeSelector data={data} disabled={disabled} onChange={change} />
                <CardSpacer />
                <SaleValue
                  data={data}
                  disabled={disabled}
                  errors={allErrors}
                  onChange={handleChannelChange}
                />
                <CardSpacer />
                <TabContainer>
                  <CategoriesTab
                    testId="categories-tab"
                    isActive={activeTab === SaleDetailsPageTab.categories}
                    changeTab={onTabClick}
                  >
                    {m.dashboard_categories({
                      quantity: tabItemsCount.categories?.toString() || '…',
                    }) ?? 'Categories ({{quantity}})'}
                  </CategoriesTab>
                  <CollectionsTab
                    testId="collections-tab"
                    isActive={activeTab === SaleDetailsPageTab.collections}
                    changeTab={onTabClick}
                  >
                    {m.dashboard_collections({
                      quantity: tabItemsCount.collections?.toString() || '…',
                    }) ?? 'Collections ({{quantity}})'}
                  </CollectionsTab>
                  <ProductsTab
                    testId="products-tab"
                    isActive={activeTab === SaleDetailsPageTab.products}
                    changeTab={onTabClick}
                  >
                    {m.dashboard_products({
                      quantity: tabItemsCount.products?.toString() || '…',
                    }) ?? 'Specific products'}
                  </ProductsTab>
                  <VariantsTab
                    testId="variants-tab"
                    isActive={activeTab === SaleDetailsPageTab.variants}
                    changeTab={onTabClick}
                  >
                    {m.dashboard_variants({
                      quantity: tabItemsCount.variants?.toString() || '…',
                    }) ?? 'Variants ({{quantity}})'}
                  </VariantsTab>
                </TabContainer>
                <CardSpacer />
                {activeTab === SaleDetailsPageTab.categories ? (
                  <DiscountCategories
                    disabled={disabled}
                    onCategoryAssign={onCategoryAssign}
                    onCategoryUnassign={onCategoryUnassign}
                    discount={sale}
                    isChecked={isChecked}
                    selected={selected}
                    toggle={toggle}
                    toggleAll={toggleAll}
                    toolbar={categoryListToolbar}
                  />
                ) : activeTab === SaleDetailsPageTab.collections ? (
                  <DiscountCollections
                    disabled={disabled}
                    onCollectionAssign={onCollectionAssign}
                    onCollectionUnassign={onCollectionUnassign}
                    discount={sale}
                    isChecked={isChecked}
                    selected={selected}
                    toggle={toggle}
                    toggleAll={toggleAll}
                    toolbar={collectionListToolbar}
                  />
                ) : activeTab === SaleDetailsPageTab.products ? (
                  <DiscountProducts
                    disabled={disabled}
                    onProductAssign={onProductAssign}
                    onProductUnassign={onProductUnassign}
                    products={mapEdgesToItems(sale?.products)}
                    isChecked={isChecked}
                    selected={selected}
                    toggle={toggle}
                    toggleAll={toggleAll}
                    toolbar={productListToolbar}
                  />
                ) : (
                  <DiscountVariants
                    disabled={disabled}
                    onVariantAssign={onVariantAssign}
                    onVariantUnassign={onVariantUnassign}
                    variants={mapEdgesToItems(sale?.variants)}
                    isChecked={isChecked}
                    selected={selected}
                    toggle={toggle}
                    toggleAll={toggleAll}
                    toolbar={variantListToolbar}
                  />
                )}
                <CardSpacer />
                <DiscountDates
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
              </div>
              <div>
                <SaleSummary selectedChannelId={selectedChannelId} sale={sale} />
                <CardSpacer />
                <ChannelsAvailabilityCard
                  managePermissions={[PermissionCode.ManageDiscounts]}
                  allChannelsCount={allChannelsCount}
                  channelsList={data?.channelListings?.map((channel) => ({
                    id: channel.id,
                    name: channel.name,
                  }))}
                  disabled={disabled}
                  openModal={openChannelsModal}
                />
              </div>
              <Metadata data={data} onChange={changeMetadata} />
            </Grid>
            <SaveBar
              disabled={disabled}
              onCancel={() => router.push('/discounts/sales')}
              onDelete={onRemove}
              onSubmit={() => handleSubmit(data)}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};
SaleDetailsPage.displayName = 'SaleDetailsPage';
export default SaleDetailsPage;
