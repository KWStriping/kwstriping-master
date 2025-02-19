import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import { PermissionCode, SaleType as SaleType } from '@tempo/api/generated/constants';
import type { DiscountErrorFragment } from '@tempo/api/generated/graphql';
import DiscountDates from './DiscountDates';
import type { ChannelSaleFormData } from './SaleDetailsPage';
import SaleInfo from './SaleInfo';
import SaleValue from './SaleValue';
import ChannelsAvailabilityCard from '@tempo/dashboard/components/cards/ChannelsAvailabilityCard';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import Form from '@tempo/dashboard/components/forms/Form';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import { validateSalePrice } from '@tempo/dashboard/oldSrc/channels/utils';
import { createSaleChannelsChangeHandler } from '@tempo/dashboard/oldSrc/discounts/handlers';
import { SALE_CREATE_FORM_ID } from '@tempo/dashboard/oldSrc/discounts/SaleCreate/consts';
import useMetadataChangeTrigger from '@tempo/dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';

export interface FormData extends MetadataFormData {
  channelListings: ChannelSaleFormData[];
  endDate: string;
  endTime: string;
  hasEndDate: boolean;
  name: string;
  startDate: string;
  startTime: string;
  type: SaleType;
  value: string;
}

export interface SaleCreatePageProps {
  allChannelsCount: Maybe<number>;
  channelListings: ChannelSaleFormData[];
  disabled: boolean;
  errors: DiscountErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onChannelsChange: (data: ChannelSaleFormData[]) => void;
  openChannelsModal: () => void;
  onSubmit: (data: FormData) => SubmitPromise<any[]>;
}

const SaleCreatePage: FC<SaleCreatePageProps> = ({
  allChannelsCount,
  channelListings = [],
  disabled,
  errors,
  onChannelsChange,
  onSubmit,
  openChannelsModal,
  saveButtonBarState,
  onBack,
}) => {
  const { makeChangeHandler: makeMetadataChangeHandler } = useMetadataChangeTrigger();

  const initialForm: FormData = {
    channelListings,
    endDate: '',
    endTime: '',
    hasEndDate: false,
    name: '',
    startDate: '',
    startTime: '',
    type: SaleType.Fixed,
    value: '',
    metadata: [],
    privateMetadata: [],
  };

  const checkIfSaveIsDisabled = (data: FormData) =>
    data?.channelListings?.some((channel) => validateSalePrice(data, channel)) || disabled;

  return (
    <Form
      confirmLeave
      initial={initialForm}
      onSubmit={onSubmit}
      formId={SALE_CREATE_FORM_ID}
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

        return (
          <Container>
            <Backlink onClick={onBack}>{m.dashboard_sales() ?? 'Sales'}</Backlink>
            <PageHeader
              title={
                m.dashboard_E_xZ_() ?? 'Create Sale'
                // page header
              }
            />
            <Grid>
              <div>
                <SaleInfo data={data} disabled={disabled} errors={errors} onChange={change} />
                <CardSpacer />
                <SaleType data={data} disabled={disabled} onChange={change} />
                <CardSpacer />
                <SaleValue
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={handleChannelChange}
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
              onCancel={onBack}
              onSubmit={submit}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};
SaleCreatePage.displayName = 'SaleCreatePage';
export default SaleCreatePage;
