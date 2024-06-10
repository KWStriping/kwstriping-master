import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { splitDateTime } from '@tempo/utils/datetime';
import ChannelsAvailabilityCard from '@tempo/dashboard/components/cards/ChannelsAvailabilityCard';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import CountryList from '@tempo/dashboard/components/core/CountryList';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import { Tab, TabContainer } from '@tempo/dashboard/components/core/Tab';
import Form from '@tempo/dashboard/components/forms/Form';
import { VoucherType, DiscountValueType, PermissionCode } from '@tempo/api/generated/constants';
import {} from '@tempo/api/generated/graphql';
import type { DiscountErrorFragment, VoucherDetailsFragment } from '@tempo/api/generated/graphql';
import type { ChannelVoucherData } from '@tempo/dashboard/oldSrc/channels/utils';
import {
  createChannelsChangeHandler,
  createDiscountTypeChangeHandler,
  createVoucherUpdateHandler,
} from '@tempo/dashboard/oldSrc/discounts/handlers';
import { DiscountType, RequirementsPicker } from '@tempo/dashboard/oldSrc/discounts/types';
import type { ChannelProps, ListProps, TabListActions } from '@tempo/dashboard/oldSrc/types';
import { mapMetadataItemToInput } from '@tempo/dashboard/oldSrc/utils/maps';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FC } from 'react';

import DiscountCategories from './DiscountCategories';
import DiscountCollections from './DiscountCollections';
import DiscountDates from './DiscountDates';
import DiscountProducts from './DiscountProducts';
import VoucherInfo from './VoucherInfo';
import VoucherLimits from './VoucherLimits';
import VoucherRequirements from './VoucherRequirements';
import VoucherSummary from './VoucherSummary';
import VoucherTypes from './VoucherTypes';
import VoucherValue from './VoucherValue';

export enum VoucherDetailsPageTab {
  categories = 'categories',
  collections = 'collections',
  products = 'products',
}

export type VoucherTabItemsCount = Partial<Record<VoucherDetailsPageTab, number>>;

export interface VoucherDetailsPageFormData extends MetadataFormData {
  applyOncePerCustomer: boolean;
  applyOncePerOrder: boolean;
  onlyForStaff: boolean;
  channelListings: ChannelVoucherData[];
  code: string;
  discountType: DiscountType;
  endDate: string;
  endTime: string;
  hasEndDate: boolean;
  hasUsageLimit: boolean;
  minCheckoutItemsQuantity: string;
  requirementsPicker: RequirementsPicker;
  startDate: string;
  startTime: string;
  type: VoucherType;
  usageLimit: number;
  used: number;
}

export interface VoucherDetailsPageProps
  extends Pick<ListProps, Exclude<keyof ListProps, 'getRowHref'>>,
    TabListActions<'categoryListToolbar' | 'collectionListToolbar' | 'productListToolbar'>,
    ChannelProps {
  activeTab: VoucherDetailsPageTab;
  tabItemsCount: VoucherTabItemsCount;
  errors: DiscountErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  voucher: Maybe<VoucherDetailsFragment>;
  allChannelsCount: Maybe<number>;
  channelListings: ChannelVoucherData[];
  onCategoryAssign: () => void;
  onCategoryUnassign: (id: string) => void;
  onCollectionAssign: () => void;
  onCollectionUnassign: (id: string) => void;
  onCountryAssign: () => void;
  onCountryUnassign: (code: string) => void;
  onProductAssign: () => void;
  onProductUnassign: (id: string) => void;
  onRemove: () => void;
  onSubmit: (data: VoucherDetailsPageFormData) => void;
  onTabClick: (index: VoucherDetailsPageTab) => void;
  onChannelsChange: (data: ChannelVoucherData[]) => void;
  openChannelsModal: () => void;
}

const CategoriesTab = Tab(VoucherDetailsPageTab.categories);
const CollectionsTab = Tab(VoucherDetailsPageTab.collections);
const ProductsTab = Tab(VoucherDetailsPageTab.products);

const VoucherDetailsPage: FC<VoucherDetailsPageProps> = ({
  activeTab,
  tabItemsCount = {},
  allChannelsCount,
  channelListings = [],
  disabled,
  errors,
  saveButtonBarState,
  voucher,
  onCategoryAssign,
  onCategoryUnassign,
  onChannelsChange,
  onCountryAssign,
  onCountryUnassign,
  onCollectionAssign,
  onCollectionUnassign,
  onProductAssign,
  onProductUnassign,
  onTabClick,
  openChannelsModal,
  onRemove,
  onSubmit,
  toggle,
  toggleAll,
  selected,
  selectedChannelId,
  isChecked,
  categoryListToolbar,
  collectionListToolbar,
  productListToolbar,
}) => {
  const router = useRouter();

  const [localErrors, setLocalErrors] = useState<DiscountErrorFragment[]>([]);

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();
  const channel = voucher?.channelListings?.find(
    (listing) => listing.channel.id === selectedChannelId
  );
  let requirementsPickerInitValue;
  if (voucher?.minCheckoutItemsQuantity > 0) {
    requirementsPickerInitValue = RequirementsPicker.Item;
  } else if (channel?.minSpent?.amount > 0) {
    requirementsPickerInitValue = RequirementsPicker.Order;
  } else {
    requirementsPickerInitValue = RequirementsPicker.None;
  }

  const discountType =
    voucher?.type === VoucherType.Shipping
      ? DiscountType.Shipping
      : voucher?.discountValueType === DiscountValueType.Percentage
        ? DiscountType.ValuePercentage
        : DiscountType.ValueFixed;

  const initialForm: VoucherDetailsPageFormData = {
    applyOncePerCustomer: voucher?.applyOncePerCustomer || false,
    applyOncePerOrder: voucher?.applyOncePerOrder || false,
    onlyForStaff: voucher?.onlyForStaff || false,
    channelListings,
    code: voucher?.code || '',
    discountType,
    endDate: splitDateTime(voucher?.endDate ?? '').date,
    endTime: splitDateTime(voucher?.endDate ?? '').time,
    hasEndDate: !!voucher?.endDate,
    hasUsageLimit: !!voucher?.usageLimit,
    minCheckoutItemsQuantity: voucher?.minCheckoutItemsQuantity?.toString() ?? '0',
    requirementsPicker: requirementsPickerInitValue,
    startDate: splitDateTime(voucher?.startDate ?? '').date,
    startTime: splitDateTime(voucher?.startDate ?? '').time,
    type: voucher?.type ?? VoucherType.EntireOrder,
    usageLimit: voucher?.usageLimit ?? 1,
    used: voucher?.used ?? 0,
    metadata: voucher?.metadata?.map(mapMetadataItemToInput),
    privateMetadata: voucher?.privateMetadata?.map(mapMetadataItemToInput),
  };

  return (
    <Form confirmLeave initial={initialForm} onSubmit={onSubmit}>
      {({ change, data, submit, triggerChange, set }) => {
        const handleDiscountTypeChange = createDiscountTypeChangeHandler(change);
        const handleChannelChange = createChannelsChangeHandler(
          data?.channelListings,
          onChannelsChange,
          triggerChange
        );
        const changeMetadata = makeMetadataChangeHandler(change);

        const handleSubmit = createVoucherUpdateHandler(submit, setLocalErrors);

        const allErrors = [...localErrors, ...errors];

        return (
          <Container>
            <Backlink href={'/discounts/vouchers'}>
              {m.dashboard_vouchers() ?? 'Vouchers'}
            </Backlink>
            <PageHeader title={voucher?.code} />
            <Grid>
              <div>
                <VoucherInfo
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                  variant="update"
                />
                <CardSpacer />
                <VoucherTypes
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={(event) => handleDiscountTypeChange(data, event)}
                />
                <CardSpacer />
                {data?.discountType?.toString() !== 'SHIPPING' ? (
                  <VoucherValue
                    data={data}
                    disabled={disabled}
                    errors={allErrors}
                    onChange={change}
                    onChannelChange={handleChannelChange}
                    variant="update"
                  />
                ) : null}
                <CardSpacer />
                {data?.type === VoucherType.SpecificProduct &&
                data?.discountType?.toString() !== 'SHIPPING' ? (
                  <>
                    <TabContainer>
                      <CategoriesTab
                        isActive={activeTab === VoucherDetailsPageTab.categories}
                        changeTab={onTabClick}
                      >
                        {m.dashboard_categories({
                          quantity: tabItemsCount.categories?.toString() || '…',
                        }) ?? 'Categories ({{quantity}})'}
                      </CategoriesTab>
                      <CollectionsTab
                        isActive={activeTab === VoucherDetailsPageTab.collections}
                        changeTab={onTabClick}
                      >
                        {m.dashboard_collections({
                          quantity: tabItemsCount.collections?.toString() || '…',
                        }) ?? 'Collections ({{quantity}})'}
                      </CollectionsTab>
                      <ProductsTab
                        isActive={activeTab === VoucherDetailsPageTab.products}
                        changeTab={onTabClick}
                      >
                        {m.dashboard_products({
                          quantity: tabItemsCount.products?.toString() || '…',
                        }) ?? 'Specific products'}
                      </ProductsTab>
                    </TabContainer>
                    <CardSpacer />
                    {activeTab === VoucherDetailsPageTab.categories ? (
                      <DiscountCategories
                        disabled={disabled}
                        onCategoryAssign={onCategoryAssign}
                        onCategoryUnassign={onCategoryUnassign}
                        discount={voucher}
                        isChecked={isChecked}
                        selected={selected}
                        toggle={toggle}
                        toggleAll={toggleAll}
                        toolbar={categoryListToolbar}
                      />
                    ) : activeTab === VoucherDetailsPageTab.collections ? (
                      <DiscountCollections
                        disabled={disabled}
                        onCollectionAssign={onCollectionAssign}
                        onCollectionUnassign={onCollectionUnassign}
                        discount={voucher}
                        isChecked={isChecked}
                        selected={selected}
                        toggle={toggle}
                        toggleAll={toggleAll}
                        toolbar={collectionListToolbar}
                      />
                    ) : (
                      <DiscountProducts
                        disabled={disabled}
                        onProductAssign={onProductAssign}
                        onProductUnassign={onProductUnassign}
                        products={mapEdgesToItems(voucher?.products)}
                        isChecked={isChecked}
                        selected={selected}
                        toggle={toggle}
                        toggleAll={toggleAll}
                        toolbar={productListToolbar}
                      />
                    )}
                  </>
                ) : null}
                <CardSpacer />
                {data?.discountType?.toString() === 'SHIPPING' ? (
                  <CountryList
                    countries={voucher?.countries}
                    disabled={disabled}
                    emptyText={m.dashboard_d() / LWa ?? 'Voucher applies to all countries'}
                    title={
                      <>
                        {/* voucher country range */}

                        {m.dashboard_bnmEd() ?? 'Countries'}
                        <Typography variant="caption">
                          {m.dashboard_lT_fm() ?? 'Voucher is limited to these countries'}
                        </Typography>
                      </>
                    }
                    onCountryAssign={onCountryAssign}
                    onCountryUnassign={onCountryUnassign}
                  />
                ) : null}
                <CardSpacer />
                <VoucherRequirements
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                  onChannelChange={handleChannelChange}
                />
                <CardSpacer />
                <VoucherLimits
                  data={data}
                  initialUsageLimit={initialForm.usageLimit}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                  setData={set}
                  isNewVoucher={false}
                />
                <CardSpacer />
                <DiscountDates
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
              </div>
              <div>
                <VoucherSummary voucher={voucher} selectedChannelId={selectedChannelId} />
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
              onCancel={() => router.push('/discounts/vouchers')}
              disabled={disabled}
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
VoucherDetailsPage.displayName = 'VoucherDetailsPage';

export default VoucherDetailsPage;
