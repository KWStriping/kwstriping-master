import type { GiftCardUpdateMutation, GiftCardUpdateMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import type { IMessage } from '@dashboard/components/messages';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { giftCardsListTableMessages as tableMessages } from '../../GiftCardsList/messages';
import { useDialogFormReset } from '../GiftCardResendCodeDialog/utils';
import { getGiftCardErrorMessage } from '../messages';
import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import { updateGiftCardBalanceDialogMessages as messages } from './messages';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';
import useForm from '@tempo/dashboard/hooks/useForm';
import { GiftCardUpdateDocument } from '@tempo/api/generated/graphql';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
// import { useUpdateBalanceDialogStyles as useStyles } from "./styles";

export interface GiftCardBalanceUpdateFormData {
  balanceAmount: number;
}

const GiftCardUpdateBalanceDialog: FC<DialogProps> = ({ open, onClose }) => {
  const notify = useNotifier();

  const {
    giftCard: {
      id,
      currentBalance: { amount, currency },
    },
  } = useGiftCardDetails();

  const initialFormData: GiftCardBalanceUpdateFormData = {
    balanceAmount: amount,
  };

  const [updateGiftCardBalance, updateGiftCardBalanceOpts] = useMutation<GiftCardUpdateMutation, GiftCardUpdateMutationVariables>(GiftCardUpdateDocument, {
    onCompleted: (data) => {
      const errors = data?.updateGiftCard?.errors;

      const notifierData: IMessage = errors?.length
        ? {
            type: 'error',
            text: m.dashboard_unknownError() ?? 'Unknown error',
          }
        : {
            type: 'success',
            text: t(
              'dashboard_updatedSuccessAlertTitle',
              messages.updatedSuccessAlertTitle.defaultMessage
            ),
          };

      notify(notifierData);

      if (!errors?.length) {
        onClose();
      }
    },
  });

  const handleSubmit = async ({ balanceAmount }: GiftCardBalanceUpdateFormData) => {
    const result = await updateGiftCardBalance({
      id,
      input: {
        balanceAmount,
      },
    });

    return result?.data?.updateGiftCard?.errors;
  };

  const { data, change, submit, reset } = useForm(initialFormData, handleSubmit);

  const { loading, status, data: submitData } = updateGiftCardBalanceOpts;

  const { formErrors } = useDialogFormReset({
    open,
    reset,
    keys: ['initialBalanceAmount'],
    apiErrors: submitData?.updateGiftCard?.errors,
  });

  return (
    <ActionDialog
      maxWidth="sm"
      open={open}
      onConfirm={submit}
      confirmButtonLabel={
        m.dashboard_hangeButtonLabel() ?? messages.changeButtonLabel.defaultMessage
      }
      onClose={onClose}
      title={m.dashboard_title() ?? messages.title.defaultMessage}
      confirmButtonState={status}
      disabled={loading}
    >
      <Typography>{m.dashboard_subtitle() ?? messages.subtitle.defaultMessage}</Typography>
      <CardSpacer />
      <TextField
        inputProps={{ min: 0 }}
        error={!!formErrors?.initialBalanceAmount}
        helperText={getGiftCardErrorMessage(formErrors?.initialBalanceAmount, t)}
        name="balanceAmount"
        value={data?.balanceAmount}
        onChange={change}
        className={styles.inputContainer ?? ''}
        label={
          m.dashboard_giftCardsTableColumnBalanceTitle() ??
          tableMessages.giftCardsTableColumnBalanceTitle.defaultMessage
        }
        type="float"
        InputProps={{
          startAdornment: (
            <div className={styles.currencyCodeContainer ?? ''}>
              <Typography variant="caption">{currency}</Typography>
            </div>
          ),
        }}
      />
    </ActionDialog>
  );
};

export default GiftCardUpdateBalanceDialog;
