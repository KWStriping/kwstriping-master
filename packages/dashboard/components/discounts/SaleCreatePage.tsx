import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import Container from '@mui/material/Container';
import type { FC } from 'react';
import DiscountDates from './DiscountDates';
import type { ChannelSaleFormData } from './SaleDetailsPage';
import SaleInfo from './SaleInfo';
import SaleValue from './SaleValue';
import ChannelsAvailabilityCard from '@dashboard/components/cards/ChannelsAvailabilityCard';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import type { MetadataFormData } from '@dashboard/components/core/Metadata';
import Metadata from '@dashboard/components/core/Metadata';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import Form from '@dashboard/components/forms/Form';
import { PermissionCode, SaleType as SaleType } from '@core/api/constants';
import type { DiscountErrorFragment } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { validateSalePrice } from '@dashboard/oldSrc/channels/utils';
import { createSaleChannelsChangeHandler } from '@dashboard/oldSrc/discounts/handlers';
import { SALE_CREATE_FORM_ID } from '@dashboard/oldSrc/discounts/SaleCreate/consts';
import useMetadataChangeTrigger from '@dashboard/oldSrc/utils/metadata/useMetadataChangeTrigger';

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
  const { t } = useTranslation();
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
            <Backlink onClick={onBack}>{t('dashboard.sales', 'Sales')}</Backlink>
            <PageHeader
              title={t(
                'dashboard.E1xZ0',
                'Create Sale'
                // page header
              )}
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
