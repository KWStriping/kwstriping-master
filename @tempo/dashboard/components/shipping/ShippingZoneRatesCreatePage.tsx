import * as m from '@paraglide/messages';
import type { UrlObject } from 'url';
// import { useTranslation } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FC, FormEventHandler } from 'react';
import ShippingMethodTaxes from './ShippingMethodTaxes';
import ShippingZonePostalCodes from './ShippingZonePostalCodes';
import type { ShippingZoneRateCommonFormData } from './ShippingZoneRatesPage/types';
import ChannelsAvailabilityCard from '@tempo/dashboard/components/cards/ChannelsAvailabilityCard';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import type { WithFormId } from '@tempo/dashboard/components/forms/Form/ExitFormDialogProvider';
import OrderValue from '@tempo/dashboard/components/shipping/OrderValue';
import OrderWeight from '@tempo/dashboard/components/shipping/OrderWeight';
import PricingCard from '@tempo/dashboard/components/shipping/PricingCard';
import ShippingRateInfo from '@tempo/dashboard/components/shipping/ShippingRateInfo';
import type { ShippingMethod } from '@tempo/api/generated/constants';
import { PermissionCode } from '@tempo/api/generated/constants';
import type {
  PostalCodeRuleInclusionType,
  ShippingChannelsErrorFragment,
  ShippingErrorFragment,
  ShippingMethodFragment,
  TaxClassBaseFragment,
} from '@tempo/api/generated/graphql';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useForm from '@tempo/dashboard/hooks/useForm';
import useHandleFormSubmit from '@tempo/dashboard/hooks/useHandleFormSubmit';
import type { ChannelShippingData } from '@tempo/dashboard/oldSrc/channels/utils';
import { validatePrice } from '@tempo/dashboard/oldSrc/products/utils/validation';
import { handleTaxClassChange } from '@tempo/dashboard/oldSrc/productKlasses/handlers';
import { createChannelsChangeHandler } from '@tempo/dashboard/oldSrc/shipping/handlers';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
import { RichTextContext } from '@tempo/dashboard/oldSrc/utils/richText/context';
import useRichText from '@tempo/dashboard/oldSrc/utils/richText/useRichText';

export interface ShippingZoneRatesCreatePageProps extends WithFormId {
  allChannelsCount?: number;
  shippingChannels: ChannelShippingData[];
  disabled: boolean;
  postalCodes?: ShippingMethodFragment['postalCodeRules'];
  channelErrors: ShippingChannelsErrorFragment[];
  errors: ShippingErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  backUrl: string | UrlObject;
  onDelete?: () => void;
  onSubmit: (data: ShippingZoneRateCommonFormData) => SubmitPromise;
  onPostalCodeInclusionChange: (inclusion: PostalCodeRuleInclusionType) => void;
  onPostalCodeAssign: () => void;
  onPostalCodeUnassign: (code: unknown) => void;
  onChannelsChange: (data: ChannelShippingData[]) => void;
  openChannelsModal: () => void;
  variant: ShippingMethod;
  taxClasses: TaxClassBaseFragment[];
  fetchMoreTaxClasses: FetchMoreProps;
}

export const ShippingZoneRatesCreatePage: FC<ShippingZoneRatesCreatePageProps> = ({
  allChannelsCount,
  shippingChannels,
  channelErrors,
  disabled,
  errors,
  backUrl,
  onDelete,
  onSubmit,
  onPostalCodeInclusionChange,
  onChannelsChange,
  onPostalCodeAssign,
  onPostalCodeUnassign,
  openChannelsModal,
  saveButtonBarState,
  postalCodes,
  formId,
  taxClasses,
  fetchMoreTaxClasses,
}) => {
  const router = useRouter();

  const isPriceVariant = true; // TODO: variant === ShippingMethod.Price;
  const initialForm: ShippingZoneRateCommonFormData = {
    channelListings: shippingChannels,
    maxDays: '',
    maxValue: '',
    minDays: '',
    minValue: '',
    name: '',
    description: null,
    orderValueRestricted: true,
    type: null,
    taxClassId: '',
  };

  const [taxClassDisplayName, setTaxClassDisplayName] = useState('');

  const {
    change,
    data: formData,
    setIsSubmitDisabled,
    triggerChange,
  } = useForm(initialForm, undefined, { confirmLeave: true, formId });

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit,
  });

  const richText = useRichText({
    initial: null,
    triggerChange,
  });

  const data: ShippingZoneRateCommonFormData = {
    ...formData,
    description: null,
  };

  const getData = async (): Promise<ShippingZoneRateCommonFormData> => ({
    ...formData,
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
  const isValid = !data?.channelListings?.some((channel) => validatePrice(channel.price));
  const isSaveDisabled = disabled || !isValid;
  setIsSubmitDisabled(isSaveDisabled);

  return (
    <RichTextContext.Provider value={richText}>
      <form onSubmit={handleFormElementSubmit}>
        <Container>
          <Backlink href={backUrl}>{m.dashboard_shipping() ?? 'Shipping'}</Backlink>
          <PageHeader title={m.dashboard_createShippingRate() ?? 'Create shipping rate'} />
          <Grid>
            <div>
              <ShippingRateInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              {isPriceVariant ? (
                <OrderValue
                  channels={data?.channelListings}
                  errors={channelErrors}
                  orderValueRestricted={data?.orderValueRestricted}
                  disabled={disabled}
                  onChange={change}
                  onChannelsChange={handleChannelsChange}
                />
              ) : (
                <OrderWeight
                  orderValueRestricted={data?.orderValueRestricted}
                  disabled={disabled}
                  minValue={data?.minValue}
                  maxValue={data?.maxValue}
                  onChange={change}
                  errors={errors}
                />
              )}
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
                postalCodes={postalCodes}
              />
            </div>
            <div>
              <ChannelsAvailabilityCard
                managePermissions={[PermissionCode.ManageShipping]}
                allChannelsCount={allChannelsCount}
                channelsList={data?.channelListings}
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
            onCancel={() => router.push(backUrl)}
            onDelete={onDelete}
            onSubmit={handleSubmit}
            state={saveButtonBarState}
          />
        </Container>
      </form>
    </RichTextContext.Provider>
  );
};

export default ShippingZoneRatesCreatePage;
