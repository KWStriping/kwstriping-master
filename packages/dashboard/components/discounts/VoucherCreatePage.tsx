import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import VoucherDates from './VoucherDates';
import type { VoucherDetailsPageFormData } from './VoucherDetailsPage';
import VoucherInfo from './VoucherInfo';
import VoucherLimits from './VoucherLimits';
import VoucherRequirements from './VoucherRequirements';
import VoucherTypes from './VoucherTypes';
import VoucherValue from './VoucherValue';
import ChannelsAvailabilityCard from '@dashboard/components/cards/ChannelsAvailabilityCard';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import Metadata from '@dashboard/components/core/Metadata';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import Form from '@dashboard/components/forms/Form';
import { PermissionCode, VoucherType } from '@core/api/constants';
import type { DiscountErrorFragment } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import type { ChannelVoucherData } from '@dashboard/oldSrc/channels/utils';
import {
  createChannelsChangeHandler,
  createDiscountTypeChangeHandler,
} from '@dashboard/oldSrc/discounts/handlers';
import { DiscountType, RequirementsPicker } from '@dashboard/oldSrc/discounts/types';
import { VOUCHER_CREATE_FORM_ID } from '@dashboard/oldSrc/discounts/VoucherCreate/types';
import { validatePrice } from '@dashboard/oldSrc/products/utils/validation';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';

export interface FormData extends VoucherDetailsPageFormData {
  value: number;
}

export interface VoucherCreatePageProps {
  allChannelsCount: Maybe<number>;
  channelListings: ChannelVoucherData[];
  disabled: boolean;
  errors: DiscountErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onChannelsChange: (data: ChannelVoucherData[]) => void;
  openChannelsModal: () => void;
  onSubmit: (data: FormData) => SubmitPromise;
}

const VoucherCreatePage: FC<VoucherCreatePageProps> = ({
  allChannelsCount,
  channelListings = [],
  disabled,
  errors,
  saveButtonBarState,
  onChannelsChange,
  onSubmit,
  openChannelsModal,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  const initialForm: FormData = {
    applyOncePerCustomer: false,
    applyOncePerOrder: false,
    onlyForStaff: false,
    channelListings,
    code: '',
    discountType: DiscountType.ValueFixed,
    endDate: '',
    endTime: '',
    hasEndDate: false,
    hasUsageLimit: false,
    minCheckoutItemsQuantity: '0',
    requirementsPicker: RequirementsPicker.None,
    startDate: '',
    startTime: '',
    type: VoucherType.EntireOrder,
    usageLimit: 1,
    used: 0,
    value: 0,
    metadata: [],
    privateMetadata: [],
  };

  const checkIfSaveIsDisabled = (data: FormData) =>
    (data?.discountType?.toString() !== 'SHIPPING' &&
      data?.channelListings?.some(
        (channel) =>
          validatePrice(channel.discountValue) ||
          (data?.requirementsPicker === RequirementsPicker.Order &&
            validatePrice(channel.minSpent))
      )) ||
    disabled;

  return (
    <Form
      confirmLeave
      initial={initialForm}
      onSubmit={onSubmit}
      formId={VOUCHER_CREATE_FORM_ID}
      checkIfSaveIsDisabled={checkIfSaveIsDisabled}
    >
      {({ change, data, submit, triggerChange, set }) => {
        const handleDiscountTypeChange = createDiscountTypeChangeHandler(change);
        const handleChannelChange = createChannelsChangeHandler(
          data?.channelListings,
          onChannelsChange,
          triggerChange
        );
        const changeMetadata = makeMetadataChangeHandler(change);

        return (
          <Container>
            <Backlink href={'/discounts/vouchers'}>
              {t('dashboard.vouchers', 'Vouchers')}
            </Backlink>
            <PageHeader
              title={t(
                'dashboard.sclSa',
                'Create Voucher'
                // page header
              )}
            />
            <Grid>
              <div>
                <VoucherInfo
                  data={data}
                  errors={errors}
                  disabled={disabled}
                  onChange={(event) => handleDiscountTypeChange(data, event)}
                  variant="create"
                />
                <CardSpacer />
                <VoucherTypes data={data} disabled={disabled} errors={errors} onChange={change} />
                {data?.discountType?.toString() !== 'SHIPPING' ? (
                  <>
                    <CardSpacer />
                    <VoucherValue
                      data={data}
                      disabled={disabled}
                      errors={errors}
                      onChannelChange={handleChannelChange}
                      onChange={change}
                      variant="create"
                    />
                  </>
                ) : null}
                <CardSpacer />
                <VoucherRequirements
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChannelChange={handleChannelChange}
                  onChange={change}
                />
                <CardSpacer />
                <VoucherLimits
                  data={data}
                  initialUsageLimit={initialForm.usageLimit}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                  setData={set}
                  isNewVoucher
                />
                <CardSpacer />
                <VoucherDates data={data} disabled={disabled} errors={errors} onChange={change} />
              </div>
              <div>
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
              onCancel={() => router.push('/discounts/vouchers')}
              onSubmit={submit}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};
VoucherCreatePage.displayName = 'VoucherCreatePage';
export default VoucherCreatePage;
