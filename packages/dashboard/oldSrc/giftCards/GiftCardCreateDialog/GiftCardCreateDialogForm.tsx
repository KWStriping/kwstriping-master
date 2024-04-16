import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import type { FC } from 'react';

import type { GiftCardCreateCommonFormData } from '../GiftCardBulkCreateDialog/types';
import GiftCardCreateExpirySelect from './GiftCardCreateExpirySelect';
import GiftCardCreateMoneyInput from './GiftCardCreateMoneyInput';
import GiftCardCreateRequiresActivationSection from './GiftCardCreateRequiresActivationSection';
import { createGiftCardMessages as messages } from './messages';
// import { useGiftCardCreateFormStyles as useStyles } from "./styles";
import type { GiftCardCreateFormCommonProps, GiftCardCreateFormCustomer } from './types';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import useForm from '@dashboard/hooks/useForm';
import type { GiftCardErrorFragment } from '@core/api/graphql';
import {
  GiftCardSettingsExpiryType,
  TimePeriodType,
} from '@core/api/constants';
import Label from '@dashboard/components/orders/OrderHistory/Label';
import GiftCardTagInput from '@dashboard/components/giftCards/GiftCardTagInput';
import GiftCardSendToCustomer from '@dashboard/components/giftCards/GiftCardSendToCustomer';
import DialogButtons from '@dashboard/components/dialogs/ActionDialog/DialogButtons';
import CardSpacer from '@dashboard/components/core/CardSpacer';

export interface GiftCardCreateFormData extends GiftCardCreateCommonFormData {
  note: string;
  sendToCustomerSelected: boolean;
  selectedCustomer?: GiftCardCreateFormCustomer;
  channelSlug?: string;
}

export const initialData: GiftCardCreateFormData = {
  tags: [],
  balanceAmount: 1,
  balanceCurrency: null,
  note: '',
  sendToCustomerSelected: false,
  expirySelected: false,
  expiryType: 'EXPIRY_PERIOD',
  expiryDate: '',
  expiryPeriodType: TimePeriodType.Month,
  expiryPeriodAmount: 12,
  requiresActivation: true,
};
interface GiftCardCreateDialogFormProps {
  opts: { status: ConfirmButtonTransitionState };
  apiErrors: GiftCardErrorFragment[];
  onSubmit: (data: GiftCardCreateFormData) => void;
  onClose: () => void;
  initialCustomer?: GiftCardCreateFormCustomer | null;
}

const defaultInitialCustomer = { email: '', name: '' };

const GiftCardCreateDialogForm: FC<GiftCardCreateDialogFormProps> = ({
  onSubmit,
  opts,
  onClose,
  apiErrors,
  initialCustomer,
}) => {
  const { t } = useTranslation();

  const { data: settingsData, loading: loadingSettings } = useQuery(GiftCardSettingsDocument, {});

  const [selectedCustomer, setSelectedCustomer] = useState<GiftCardCreateFormCustomer>(
    initialCustomer || defaultInitialCustomer
  );

  const handleSubmit = (data: GiftCardCreateFormData) => onSubmit({ ...data, selectedCustomer });

  const getInitialExpirySettingsData = (): Partial<GiftCardCreateFormData> => {
    if (loadingSettings) {
      return {};
    }

    const { expiryType, expiryPeriod } = settingsData?.giftCardSettings;

    if (expiryType === GiftCardSettingsExpiryType.NeverExpire) {
      return {};
    }

    return {
      expiryType,
      expiryPeriodType: expiryPeriod?.type,
      expiryPeriodAmount: expiryPeriod?.amount,
    };
  };

  const { submit, change, toggleValue, data, set } = useForm(
    {
      ...initialData,
      ...getInitialExpirySettingsData(),
      balanceCurrency: '',
      channelSlug: '',
      sendToCustomerSelected: !!initialCustomer,
    },
    handleSubmit
  );

  const formErrors = getFormErrors(
    ['tags', 'expiryDate', 'customer', 'currency', 'amount', 'balance'],
    apiErrors
  );

  const {
    tags,
    sendToCustomerSelected,
    channelSlug,
    balanceAmount,
    expirySelected,
    expiryType,
    expiryDate,
    requiresActivation,
  } = data;

  const shouldEnableSubmitButton = () => {
    if (!balanceAmount) {
      return false;
    }

    if (expirySelected && expiryType === 'EXPIRY_DATE') {
      return !!expiryDate;
    }

    return true;
  };

  const commonFormProps: GiftCardCreateFormCommonProps = {
    data,
    errors: formErrors,
    toggleValue,
    change,
  };

  return (
    <>
      <DialogContent className={styles.dialogContent ?? ''}>
        <GiftCardCreateMoneyInput {...commonFormProps} set={set} />
        <CardSpacer />
        <GiftCardTagInput
          error={formErrors?.tags}
          name="tags"
          values={tags}
          toggleChange={toggleValue}
        />
        <CardSpacer />
        <Divider />
        <GiftCardSendToCustomer
          selectedChannelSlug={channelSlug}
          change={change}
          sendToCustomerSelected={sendToCustomerSelected}
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          disabled={!!initialCustomer}
        />
        <Divider />
        <GiftCardCreateExpirySelect {...commonFormProps} />
        <TextField
          name="note"
          onChange={change}
          multiline
          className={styles.noteField ?? ''}
          label={`${t('dashboard.noteLabel', messages.noteLabel.defaultMessage)} *${t(
            'optionalField',
            'Optional'
          )}`}
        />
        <Label text={t('dashboard.noteSubtitle', messages.noteSubtitle.defaultMessage)} />
        <GiftCardCreateRequiresActivationSection onChange={change} checked={requiresActivation} />
      </DialogContent>
      <DialogButtons
        disabled={!shouldEnableSubmitButton()}
        onConfirm={submit}
        confirmButtonLabel={t(
          'dashboard.issueButtonLabel',
          messages.issueButtonLabel.defaultMessage
        )}
        confirmButtonState={opts?.status}
        onClose={onClose}
      />
    </>
  );
};

export default GiftCardCreateDialogForm;
