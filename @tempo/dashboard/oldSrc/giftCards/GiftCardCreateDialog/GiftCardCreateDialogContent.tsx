import type { GiftCardCreateMutation, GiftCardCreateMutationVariables } from '@tempo/api/generated/graphql';
import type { ChannelCurrenciesQuery, ChannelCurrenciesQueryVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { useQuery } from '@tempo/api/hooks/useQuery';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import type { FC } from 'react';

import ContentWithProgress from './ContentWithProgress';
import GiftCardCreateDialogCodeContent from './GiftCardCreateDialogCodeContent';
import type { GiftCardCreateFormData } from './GiftCardCreateDialogForm';
import GiftCardCreateDialogForm from './GiftCardCreateDialogForm';
import { createGiftCardMessages as messages } from './messages';
import type { GiftCardCreateFormCustomer } from './types';
import { getGiftCardCreateOnCompletedMessage, getGiftCardExpiryInputData } from './utils';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';
import useCurrentDate from '@tempo/dashboard/hooks/useCurrentDate';
import type { GiftCardCreationInput } from '@tempo/api/generated/graphql';
import { ChannelCurrenciesDocument, GiftCardCreateDocument } from '@tempo/api/generated/graphql';

interface GiftCardCreateDialogContentProps extends Pick<DialogProps, 'onClose'> {
  refetchQueries: string[];
  initialCustomer?: GiftCardCreateFormCustomer | null;
}

const GiftCardCreateDialogContent: FC<GiftCardCreateDialogContentProps> = ({
  onClose,
  refetchQueries,
  initialCustomer,
}) => {
  const notify = useNotifier();

  const [{ fetching: loadingChannelCurrencies }] = useQuery<ChannelCurrenciesQuery, ChannelCurrenciesQueryVariables>(ChannelCurrenciesDocument, {});

  const [cardCode, setCardCode] = useState(null);

  const currentDate = useCurrentDate();

  const getParsedSubmitInputData = (formData: GiftCardCreateFormData): GiftCardCreationInput => {
    const {
      balanceAmount,
      balanceCurrency,
      note,
      tags,
      sendToCustomerSelected,
      selectedCustomer,
      requiresActivation,
      channelSlug,
    } = formData;

    return {
      note: note || null,
      addTags: tags || null,
      userEmail: (sendToCustomerSelected && selectedCustomer.email) || null,
      channel: (sendToCustomerSelected && channelSlug) || null,
      balance: {
        amount: balanceAmount,
        currency: balanceCurrency,
      },
      expiryDate: getGiftCardExpiryInputData(formData, currentDate),
      isActive: !requiresActivation,
    };
  };

  const [createGiftCard, createGiftCardOpts] = useMutation<GiftCardCreateMutation, GiftCardCreateMutationVariables>(GiftCardCreateDocument, {
    onCompleted: (data) => {
      const errors = data?.createGiftCard?.errors;

      notify(getGiftCardCreateOnCompletedMessage(errors, t));

      if (!errors?.length) {
        setCardCode(data?.createGiftCard?.giftCard?.code);
      }
    },
    refetchQueries,
  });

  const handleSubmit = (data: GiftCardCreateFormData) => {
    createGiftCard({
      input: getParsedSubmitInputData(data),
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <DialogTitle>{m.dashboard_title() ?? messages.title.defaultMessage}</DialogTitle>
      <ContentWithProgress>
        {!loadingChannelCurrencies &&
          (cardCode ? (
            <GiftCardCreateDialogCodeContent cardCode={cardCode} onClose={handleClose} />
          ) : (
            <GiftCardCreateDialogForm
              opts={createGiftCardOpts}
              onClose={handleClose}
              apiErrors={createGiftCardOpts?.data?.createGiftCard?.errors}
              onSubmit={handleSubmit}
              initialCustomer={initialCustomer}
            />
          ))}
      </ContentWithProgress>
    </>
  );
};

export default GiftCardCreateDialogContent;
