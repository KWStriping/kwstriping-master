import type { GiftCardSettingsQuery, GiftCardSettingsQueryVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useQuery } from '@tempo/api/hooks';
import GiftCardCreateExpirySelect from '../GiftCardCreateDialog/GiftCardCreateExpirySelect';
import GiftCardCreateMoneyInput from '../GiftCardCreateDialog/GiftCardCreateMoneyInput';
import GiftCardCreateRequiresActivationSection from '../GiftCardCreateDialog/GiftCardCreateRequiresActivationSection';
import { createGiftCardMessages as messages } from '../GiftCardCreateDialog/messages';
import { getGiftCardErrorMessage } from '../GiftCardUpdate/messages';
import type {
  GiftCardBulkCreateFormCommonProps,
  GiftCardBulkCreateFormData,
  GiftCardBulkCreateFormErrors,
} from './types';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import DialogButtons from '@tempo/dashboard/components/dialogs/ActionDialog/DialogButtons';
import GiftCardTagInput from '@tempo/dashboard/components/giftCards/GiftCardTagInput';
import { GiftCardSettingsDocument } from '@tempo/api/generated/graphql';
import { TimePeriodType, GiftCardSettingsExpiryType } from '@tempo/api/generated/constants';
import useForm from '@tempo/dashboard/hooks/useForm';

export const initialData: GiftCardBulkCreateFormData = {
  tags: [],
  balanceAmount: 1,
  balanceCurrency: null,
  expirySelected: false,
  expiryType: 'EXPIRY_PERIOD',
  expiryDate: '',
  expiryPeriodType: TimePeriodType.Month,
  expiryPeriodAmount: 12,
  requiresActivation: true,
  cardsAmount: 100,
};

interface GiftCardBulkCreateDialogFormProps {
  opts: { status: ConfirmButtonTransitionState };
  formErrors: GiftCardBulkCreateFormErrors;
  onSubmit: (data: GiftCardBulkCreateFormData) => void;
  onClose: () => void;
}

const GiftCardBulkCreateDialogForm: FC<GiftCardBulkCreateDialogFormProps> = ({
  onSubmit,
  opts,
  onClose,
  formErrors = {},
}) => {
  const { data: settingsData, loading: loadingSettings } = useQuery(GiftCardSettingsDocument, {});

  const getInitialExpirySettingsData = (): Partial<GiftCardBulkCreateFormData> => {
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

  const { submit, toggleValue, change, data, set } = useForm(
    {
      ...initialData,
      ...getInitialExpirySettingsData(),
      balanceCurrency: '',
    },
    onSubmit
  );

  const { tags, requiresActivation, cardsAmount } = data;

  const commonFormProps: GiftCardBulkCreateFormCommonProps = {
    data,
    errors: formErrors,
    toggleValue,
    change,
  };

  return (
    <>
      <DialogContent className={styles.dialogContent ?? ''}>
        <TextField
          error={!!formErrors?.count}
          name="cardsAmount"
          onChange={change}
          className={styles.fullWidthContainer ?? ''}
          label={
            m.dashboard_giftCardsAmountLabel() ?? messages.giftCardsAmountLabel.defaultMessage
          }
          value={cardsAmount}
          helperText={getGiftCardErrorMessage(formErrors?.count, t)}
        />
        <GiftCardCreateMoneyInput {...commonFormProps} set={set} />
        <GiftCardTagInput
          optional={false}
          error={formErrors?.tags}
          name="tags"
          values={tags}
          toggleChange={toggleValue}
        />
        <CardSpacer />
        <Divider />
        <GiftCardCreateExpirySelect {...commonFormProps} />
        <Divider />
        <GiftCardCreateRequiresActivationSection onChange={change} checked={requiresActivation} />
        <Typography>
          {m.dashboard_ulkCreateExplanation() ?? messages.bulkCreateExplanation.defaultMessage}
        </Typography>
      </DialogContent>
      <DialogButtons
        onConfirm={submit}
        confirmButtonLabel={
          m.dashboard_issueButtonLabel() ?? messages.issueButtonLabel.defaultMessage
        }
        confirmButtonState={opts?.status}
        onClose={onClose}
      />
    </>
  );
};

export default GiftCardBulkCreateDialogForm;
