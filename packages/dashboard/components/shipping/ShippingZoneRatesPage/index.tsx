import type { UrlObject } from 'url';
import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC, FormEventHandler } from 'react';
import { useMemo } from 'react';
import ShippingMethodTaxes from '../ShippingMethodTaxes';
import ShippingZonePostalCodes from '../ShippingZonePostalCodes';
import type { ShippingZoneRateUpdateFormData } from './types';
import ChannelsAvailabilityCard from '@dashboard/components/cards/ChannelsAvailabilityCard';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import Metadata from '@dashboard/components/core/Metadata';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import type { WithFormId } from '@dashboard/components/forms/Form/ExitFormDialogProvider';
import OrderValue from '@dashboard/components/shipping/OrderValue';
import OrderWeight from '@dashboard/components/shipping/OrderWeight';
import PricingCard from '@dashboard/components/shipping/PricingCard';
import ShippingMethodProducts from '@dashboard/components/shipping/ShippingMethodProducts';
import ShippingRateInfo from '@dashboard/components/shipping/ShippingRateInfo';
import { PermissionCode } from '@core/api/constants';
import type {
  PostalCodeRuleInclusionType,
  ShippingChannelsErrorFragment,
  ShippingErrorFragment,
  ShippingMethodFragment,
  ShippingZoneQuery,
  TaxClassBaseFragment,
} from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import useForm from '@dashboard/hooks/useForm';
import useHandleFormSubmit from '@dashboard/hooks/useHandleFormSubmit';
import { useStateUpdate } from '@dashboard/hooks/useStateUpdate';
import type { ChannelShippingData } from '@dashboard/oldSrc/channels/utils';
import { validatePrice } from '@dashboard/oldSrc/products/utils/validation';
import { handleTaxClassChange } from '@dashboard/oldSrc/productKlasses/handlers';
import { createChannelsChangeHandler } from '@dashboard/oldSrc/shipping/handlers';
import type { FetchMoreProps, ListActions, ListProps } from '@dashboard/oldSrc/types';
import { mapMetadataItemToInput } from '@dashboard/oldSrc/utils/maps';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';
import { RichTextContext } from '@dashboard/oldSrc/utils/richText/context';
import useRichText from '@dashboard/oldSrc/utils/richText/useRichText';

export interface ShippingZoneRatesPageProps
  extends Pick<ListProps, Exclude<keyof ListProps, 'getRowHref'>>,
    ListActions,
    WithFormId {
  allChannelsCount?: number;
  shippingChannels: ChannelShippingData[];
  disabled: boolean;
  rate: NonNullable<ShippingZoneQuery['shippingZone']>['shippingMethods'][0];
  channelErrors?: Maybe<ShippingChannelsErrorFragment[]>;
  errors?: Maybe<ShippingErrorFragment[]>;
  saveButtonBarState: ConfirmButtonTransitionState;
  postalCodeRules: NonNullable<
    ShippingZoneQuery['shippingZone']
  >['shippingMethods'][0]['postalCodeRules'];
  backHref: string | UrlObject;
  onDelete?: () => void;
  onSubmit: (data: ShippingZoneRateUpdateFormData) => SubmitPromise;
  onPostalCodeInclusionChange: (inclusion: PostalCodeRuleInclusionType) => void;
  onPostalCodeAssign: () => void;
  onPostalCodeUnassign: (code: ShippingMethodFragment['postalCodeRules'][0]) => void;
  onChannelsChange: (data: ChannelShippingData[]) => void;
  openChannelsModal: () => void;
  onProductAssign: () => void;
  onProductUnassign: (ids: string[]) => void;
  taxClasses: Maybe<TaxClassBaseFragment[]>;
  fetchMoreTaxClasses: FetchMoreProps;
}

export const ShippingZoneRatesPage: FC<ShippingZoneRatesPageProps> = ({
  allChannelsCount,
  shippingChannels,
  channelErrors,
  disabled,
  errors,
  backHref,
  onDelete,
  onSubmit,
  onPostalCodeInclusionChange,
  onChannelsChange,
  onPostalCodeAssign,
  onPostalCodeUnassign,
  onProductAssign,
  onProductUnassign,
  openChannelsModal,
  rate,
  saveButtonBarState,
  postalCodeRules,
  formId,
  taxClasses,
  fetchMoreTaxClasses,
  ...listProps
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const initialForm: Omit<ShippingZoneRateUpdateFormData, 'description'> = useMemo(
    () => ({
      channelListings: shippingChannels,
      maxDays: rate?.maximumDeliveryDays?.toString() || '',
      maxValue: rate?.maximumOrderWeight?.value.toString() || '',
      metadata: rate?.metadata?.map(mapMetadataItemToInput),
      minDays: rate?.minimumDeliveryDays?.toString() || '',
      minValue: rate?.minimumOrderWeight?.value.toString() || '',
      name: rate?.name || '',
      orderValueRestricted: !!rate?.channelListings.some(({ minValue }) => !!minValue),
      privateMetadata: rate?.privateMetadata?.map(mapMetadataItemToInput),
      type: rate?.type || null,
      taxClassId: rate?.taxClass?.id || '',
    }),
    [shippingChannels, rate]
  );

  const {
    change,
    data: formData,
    setIsSubmitDisabled,
    triggerChange,
  } = useForm(initialForm, undefined, { confirmLeave: true, formId });

  const [taxClassDisplayName, setTaxClassDisplayName] = useStateUpdate(
    rate?.taxClass?.name ?? ''
  );

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit,
  });

  const richText = useRichText({
    initial: rate?.description,
    loading: !rate,
    triggerChange,
  });

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  const data: ShippingZoneRateUpdateFormData = {
    ...formData,
    description: null,
  };

  // Prevents closing ref in submit functions
  const getData = async (): Promise<ShippingZoneRateUpdateFormData> => ({
    ...data,
    description: await richText.getValue(),
  });

  const handleFormElementSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    handleFormSubmit(await getData());
  };
  const handleSubmit = async () => handleFormSubmit(await getData());

  const handleChannelsChange = createChannelsChangeHandler(
    shippingChannels,
    onChannelsChange,
    triggerChange
  );

  const isValid = !formData.channelListings?.some((channel) => validatePrice(channel.price));

  const changeMetadata = makeMetadataChangeHandler(change);

  const isSaveDisabled = disabled || !isValid;

  setIsSubmitDisabled(isSaveDisabled);
  return (
    <RichTextContext.Provider value={richText}>
      <form onSubmit={handleFormElementSubmit}>
        <Container>
          <Backlink href={backHref}>{t('dashboard.shipping', 'Shipping')}</Backlink>
          <PageHeader title={rate?.name} />
          <Grid>
            <div>
              <ShippingRateInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <OrderValue
                channels={data?.channelListings}
                errors={channelErrors}
                orderValueRestricted={data?.orderValueRestricted}
                disabled={disabled}
                onChange={change}
                onChannelsChange={handleChannelsChange}
              />
              <CardSpacer />
              <OrderWeight
                orderValueRestricted={data?.orderValueRestricted}
                disabled={disabled}
                minValue={data?.minValue}
                maxValue={data?.maxValue}
                onChange={change}
                errors={errors}
              />
              <CardSpacer />
              <PricingCard
                channels={data?.channelListings}
                onChange={handleChannelsChange}
                disabled={disabled}
                errors={channelErrors}
              />
              <CardSpacer />
              <ShippingZonePostalCodes
                disabled={disabled}
                onPostalCodeDelete={onPostalCodeUnassign}
                onPostalCodeInclusionChange={onPostalCodeInclusionChange}
                onPostalCodeRangeAdd={onPostalCodeAssign}
                postalCodes={postalCodeRules}
              />
              <CardSpacer />
              <ShippingMethodProducts
                products={mapEdgesToItems(rate?.excludedProducts)}
                onProductAssign={onProductAssign}
                onProductUnassign={onProductUnassign}
                disabled={disabled}
                {...listProps}
              />
              <CardSpacer />
              <Metadata data={data} onChange={changeMetadata} />
            </div>
            <div>
              <ChannelsAvailabilityCard
                managePermissions={[PermissionCode.ManageShipping]}
                allChannelsCount={allChannelsCount ?? 0}
                channelsList={data?.channelListings?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                }))}
                openModal={openChannelsModal}
              />
              <CardSpacer />
              <ShippingMethodTaxes
                value={formData.taxClassId}
                taxClassDisplayName={taxClassDisplayName}
                taxClasses={taxClasses}
                disabled={false}
                onChange={(event) =>
                  handleTaxClassChange(event, taxClasses, change, setTaxClassDisplayName)
                }
                onFetchMore={fetchMoreTaxClasses}
              />
            </div>
          </Grid>
          <SaveBar
            disabled={isSaveDisabled}
            onCancel={() => router.push(backHref)}
            onDelete={onDelete}
            onSubmit={handleSubmit}
            state={saveButtonBarState}
          />
        </Container>
      </form>
    </RichTextContext.Provider>
  );
};

export default ShippingZoneRatesPage;
