import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import type { IMessage } from '@dashboard/components/messages';
import { getBySlug } from '@core/utils';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import { getGiftCardErrorMessage } from '../messages';
import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import { resendGiftCardCodeDialogMessages as messages } from './messages';
import { useDialogFormReset } from './utils';
import { mapSlugNodeToChoice } from '@dashboard/oldSrc/utils/maps';
import type { DialogProps } from '@dashboard/oldSrc/types';
import useForm from '@dashboard/hooks/useForm';
import { ChannelsDocument, GiftCardResendDocument } from '@core/api/graphql';
import { useGiftCardDeleteDialogContentStyles as useProgressStyles } from '@dashboard/components/giftCards/GiftCardDeleteDialog/styles';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import { useChannelsSearch } from '@dashboard/components/dialogs/ChannelsAvailabilityDialog/utils';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';

export interface GiftCardResendCodeFormData {
  email: string;
  channelSlug: string;
}

const GiftCardResendCodeDialog: FC<DialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const notify = useNotifier();
  const progressClasses = useProgressStyles();

  const {
    giftCard: { boughtInChannel: initialChannelSlug },
  } = useGiftCardDetails();

  const [consentSelected, setConsentSelected] = useState(false);

  const [{ data: channelsData, fetching: loadingChannels }] = useQuery(ChannelsDocument, {});

  const channels = channelsData?.channels;

  const activeChannels = channels?.filter(({ isActive }) => isActive);

  const { onQueryChange, filteredChannels } = useChannelsSearch(activeChannels);

  const initialFormData: GiftCardResendCodeFormData = {
    email: '',
    channelSlug: initialChannelSlug || '',
  };

  const {
    giftCard: { id },
  } = useGiftCardDetails();

  const handleSubmit = async ({ email, channelSlug }: GiftCardResendCodeFormData) => {
    const result = await resendGiftCardCode({
      input: {
        id,
        email: email ? email : null,
        channel: channelSlug,
      },
    });

    return result?.data?.resendGiftCard?.errors;
  };

  const { data, change, submit, reset } = useForm(initialFormData, handleSubmit);

  const [resendGiftCardCode, resendGiftCardCodeOpts] = useMutation(GiftCardResendDocument, {
    onCompleted: (data) => {
      const errors = data?.resendGiftCard?.errors;

      const notifierData: IMessage = errors?.length
        ? {
            type: 'error',
            text: t('dashboard.unknownError', 'Unknown error'),
          }
        : {
            type: 'success',
            text: t(
              'dashboard.successResendAlertText',
              messages.successResendAlertText.defaultMessage
            ),
          };

      notify(notifierData);

      if (!errors?.length) {
        onClose();
        reset();
      }
    },
  });

  const { loading, status, data: submitData } = resendGiftCardCodeOpts;

  const { formErrors } = useDialogFormReset({
    open,
    reset,
    apiErrors: submitData?.resendGiftCard?.errors,
    keys: ['email'],
  });

  useEffect(reset, [consentSelected]);

  return (
    <ActionDialog
      maxWidth="sm"
      open={open}
      onConfirm={submit}
      confirmButtonLabel={t(
        'dashboard.submitButtonLabel',
        messages.submitButtonLabel.defaultMessage
      )}
      onClose={onClose}
      title={t('dashboard.title', messages.title.defaultMessage)}
      confirmButtonState={status}
      disabled={loading}
    >
      {loadingChannels ? (
        <div className={progressClasses.progressContainer}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography>
            {t('dashboard.description', messages.description.defaultMessage)}
          </Typography>
          <SingleAutocompleteSelectField
            choices={mapSlugNodeToChoice(filteredChannels)}
            name="channelSlug"
            label={t(
              'dashboard.endToChannelSelectLabel',
              messages.sendToChannelSelectLabel.defaultMessage
            )}
            value={data?.channelSlug}
            onChange={change}
            displayValue={channels.find(getBySlug(data?.channelSlug))?.name}
            fetchChoices={onQueryChange}
          />
          <ControlledCheckbox
            name="differentMailConsent"
            label={t(
              'dashboard.onsentCheckboxLabel',
              messages.consentCheckboxLabel.defaultMessage
            )}
            checked={consentSelected}
            onChange={(event: ChangeEvent<unknown>) => setConsentSelected(event.target.value)}
          />
          <TextField
            disabled={!consentSelected}
            error={!!formErrors?.email}
            helperText={getGiftCardErrorMessage(formErrors?.email, t)}
            name="email"
            value={data?.email}
            onChange={change}
            className={styles.inputContainer ?? ''}
            label={t(
              'dashboard.emailInputPlaceholder',
              messages.emailInputPlaceholder.defaultMessage
            )}
          />
        </>
      )}
    </ActionDialog>
  );
};

export default GiftCardResendCodeDialog;
