import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
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
import type { DialogProps } from '@dashboard/oldSrc/types';
import useCurrentDate from '@dashboard/hooks/useCurrentDate';
import type { GiftCardCreationInput } from '@core/api/graphql';
import { ChannelCurrenciesDocument, GiftCardCreateDocument } from '@core/api/graphql';

interface GiftCardCreateDialogContentProps extends Pick<DialogProps, 'onClose'> {
  refetchQueries: string[];
  initialCustomer?: GiftCardCreateFormCustomer | null;
}

const GiftCardCreateDialogContent: FC<GiftCardCreateDialogContentProps> = ({
  onClose,
  refetchQueries,
  initialCustomer,
}) => {
  const { t } = useTranslation();
  const notify = useNotifier();

  const [{ fetching: loadingChannelCurrencies }] = useQuery(ChannelCurrenciesDocument, {});

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

  const [createGiftCard, createGiftCardOpts] = useMutation(GiftCardCreateDocument, {
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
      <DialogTitle>{t('dashboard.title', messages.title.defaultMessage)}</DialogTitle>
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
