import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import type { IMessage } from '@dashboard/components/messages';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

import ContentWithProgress from '../GiftCardCreateDialog/ContentWithProgress';
import GiftCardBulkCreateSuccessDialog from '../GiftCardCreateDialog/GiftCardBulkCreateSuccessDialog';
import {
  getGiftCardCreateOnCompletedMessage,
  getGiftCardExpiryInputData,
} from '../GiftCardCreateDialog/utils';
import { GIFT_CARD_LIST_QUERY } from '../GiftCardsList/queries';
import GiftCardBulkCreateDialogForm from './GiftCardBulkCreateDialogForm';
import { createGiftCardsDialogMessages as messages } from './messages';
import type { GiftCardBulkCreateFormData, GiftCardBulkCreateFormErrors } from './types';
import { createGiftCardsErrorKeys } from './types';
import { validateForm } from './utils';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import type { DialogProps } from '@dashboard/oldSrc/types';
import useCurrentDate from '@dashboard/hooks/useCurrentDate';
import type { GiftCardBulkCreationInput } from '@core/api/graphql';
import {
  ChannelCurrenciesDocument,
  GiftCardBulkCreateDocument,
} from '@core/api/graphql';

const GiftCardBulkCreateDialog: FC<DialogProps> = ({ onClose, open }) => {
  const { t } = useTranslation();
  const notify = useNotifier();
  const [formErrors, setFormErrors] = useState<GiftCardBulkCreateFormErrors>(null);
  const [issuedIds, setIssuedIds] = useState<string[] | null>(null);
  const [openIssueSuccessDialog, setOpenIssueSuccessDialog] = useState<boolean>(false);

  const onIssueSuccessDialogClose = () => setOpenIssueSuccessDialog(false);

  const [{ fetching: loadingChannelCurrencies }] = useQuery(ChannelCurrenciesDocument, {});

  const currentDate = useCurrentDate();

  const getParsedSubmitInputData = (
    formData: GiftCardBulkCreateFormData
  ): GiftCardBulkCreationInput => {
    const {
      balanceAmount,
      balanceCurrency,
      tags = [],
      requiresActivation,
      cardsAmount,
    } = formData;

    return {
      count: cardsAmount,
      tags,
      balance: {
        amount: balanceAmount,
        currency: balanceCurrency,
      },
      expiryDate: getGiftCardExpiryInputData(formData, currentDate),
      isActive: !requiresActivation,
    };
  };

  const [bulkCreateGiftCard, bulkCreateGiftCardOpts] = useMutation(GiftCardBulkCreateDocument, {
    onCompleted: (data) => {
      const errors = data?.createGiftCards?.errors;
      const cardsAmount = data?.createGiftCards?.giftCards?.length || 0;

      const giftCardsBulkIssueSuccessMessage: IMessage = {
        type: 'success',
        title: t(
          'dashboard.createdSuccessAlertTitle',
          messages.createdSuccessAlertTitle.defaultMessage
        ),
        text: t(
          'dashboard.createdSuccessAlertDescription',
          messages.createdSuccessAlertDescription.defaultMessage,
          {
            cardsAmount,
          }
        ),
      };

      notify(getGiftCardCreateOnCompletedMessage(errors, t, giftCardsBulkIssueSuccessMessage));

      setFormErrors(getFormErrors(createGiftCardsErrorKeys, errors));

      if (!errors?.length) {
        setIssuedIds(data?.createGiftCards?.giftCards?.map((giftCard) => giftCard.id));
        setOpenIssueSuccessDialog(true);
        onClose();
      }
    },
    refetchQueries: [GIFT_CARD_LIST_QUERY],
  });

  const handleSubmit = (data: GiftCardBulkCreateFormData) => {
    const formErrors = validateForm(data);

    if (Object.keys(formErrors).length) {
      setFormErrors(formErrors);
    } else {
      bulkCreateGiftCard({
        input: getParsedSubmitInputData(data),
      });
    }
  };

  const apiErrors = bulkCreateGiftCardOpts?.data?.createGiftCards?.errors;

  const handleSetSchemaErrors = () => {
    if (apiErrors?.length) {
      const formErrorsFromApi = getFormErrors(createGiftCardsErrorKeys, apiErrors);

      setFormErrors(formErrorsFromApi);
    }
  };

  useEffect(handleSetSchemaErrors, [apiErrors]);

  return (
    <>
      <Dialog open={open} maxWidth="sm" onClose={onClose}>
        <DialogTitle>{t('dashboard.title', messages.title.defaultMessage)}</DialogTitle>
        <ContentWithProgress>
          {!loadingChannelCurrencies && (
            <GiftCardBulkCreateDialogForm
              opts={bulkCreateGiftCardOpts}
              onClose={onClose}
              formErrors={formErrors}
              onSubmit={handleSubmit}
            />
          )}
        </ContentWithProgress>
      </Dialog>
      <GiftCardBulkCreateSuccessDialog
        onClose={onIssueSuccessDialogClose}
        open={openIssueSuccessDialog}
        idsToExport={issuedIds}
      />
    </>
  );
};

export default GiftCardBulkCreateDialog;
