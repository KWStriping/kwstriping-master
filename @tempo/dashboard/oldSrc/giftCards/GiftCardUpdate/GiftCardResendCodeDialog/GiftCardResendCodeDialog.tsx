import type { GiftCardResendMutation, GiftCardResendMutationVariables } from '@tempo/api/generated/graphql';
import type { ChannelsQuery, ChannelsQueryVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { useQuery } from '@tempo/api/hooks/useQuery';
import type { IMessage } from '@dashboard/components/messages';
import { getBySlug } from '@tempo/utils';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import { getGiftCardErrorMessage } from '../messages';
import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import { resendGiftCardCodeDialogMessages as messages } from './messages';
import { useDialogFormReset } from './utils';
import { mapSlugNodeToChoice } from '@tempo/dashboard/oldSrc/utils/maps';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';
import useForm from '@tempo/dashboard/hooks/useForm';
import { ChannelsDocument, GiftCardResendDocument } from '@tempo/api/generated/graphql';
import { useGiftCardDeleteDialogContentStyles as useProgressStyles } from '@tempo/dashboard/components/giftCards/GiftCardDeleteDialog/styles';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import { useChannelsSearch } from '@tempo/dashboard/components/dialogs/ChannelsAvailabilityDialog/utils';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';

export interface GiftCardResendCodeFormData {
  email: string;
  channelSlug: string;
}

const GiftCardResendCodeDialog: FC<DialogProps> = ({ open, onClose }) => {
  const notify = useNotifier();
  const progressClasses = useProgressStyles();

  const {
    giftCard: { boughtInChannel: initialChannelSlug },
  } = useGiftCardDetails();

  const [consentSelected, setConsentSelected] = useState(false);

  const [{ data: channelsData, fetching: loadingChannels }] = useQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, {});

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

  const [resendGiftCardCode, resendGiftCardCodeOpts] = useMutation<GiftCardResendMutation, GiftCardResendMutationVariables>(GiftCardResendDocument, {
    onCompleted: (data) => {
      const errors = data?.resendGiftCard?.errors;

      const notifierData: IMessage = errors?.length
        ? {
            type: 'error',
            text: m.dashboard_unknownError() ?? 'Unknown error',
          }
        : {
            type: 'success',
            text: t(
              'dashboard_successResendAlertText',
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
      confirmButtonLabel={
        m.dashboard_submitButtonLabel() ?? messages.submitButtonLabel.defaultMessage
      }
      onClose={onClose}
      title={m.dashboard_title() ?? messages.title.defaultMessage}
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
            {m.dashboard_description() ?? messages.description.defaultMessage}
          </Typography>
          <SingleAutocompleteSelectField
            choices={mapSlugNodeToChoice(filteredChannels)}
            name="channelSlug"
            label={
              m.dashboard_endToChannelSelectLabel() ??
              messages.sendToChannelSelectLabel.defaultMessage
            }
            value={data?.channelSlug}
            onChange={change}
            displayValue={channels.find(getBySlug(data?.channelSlug))?.name}
            fetchChoices={onQueryChange}
          />
          <ControlledCheckbox
            name="differentMailConsent"
            label={
              m.dashboard_onsentCheckboxLabel() ?? messages.consentCheckboxLabel.defaultMessage
            }
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
            label={
              m.dashboard_emailInputPlaceholder() ?? messages.emailInputPlaceholder.defaultMessage
            }
          />
        </>
      )}
    </ActionDialog>
  );
};

export default GiftCardResendCodeDialog;
