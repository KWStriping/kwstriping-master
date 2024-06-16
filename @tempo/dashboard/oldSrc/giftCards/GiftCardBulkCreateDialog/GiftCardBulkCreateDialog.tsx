import type { GiftCardBulkCreateMutation, GiftCardBulkCreateMutationVariables } from '@tempo/api/generated/graphql';
import type { ChannelCurrenciesQuery, ChannelCurrenciesQueryVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { useQuery } from '@tempo/api/hooks/useQuery';
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
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';
import useCurrentDate from '@tempo/dashboard/hooks/useCurrentDate';
import type { GiftCardBulkCreationInput } from '@tempo/api/generated/graphql';
import {
  ChannelCurrenciesDocument,
  GiftCardBulkCreateDocument,
} from '@tempo/api/generated/graphql';

const GiftCardBulkCreateDialog: FC<DialogProps> = ({ onClose, open }) => {
  const notify = useNotifier();
  const [formErrors, setFormErrors] = useState<GiftCardBulkCreateFormErrors>(null);
  const [issuedIds, setIssuedIds] = useState<string[] | null>(null);
  const [openIssueSuccessDialog, setOpenIssueSuccessDialog] = useState<boolean>(false);

  const onIssueSuccessDialogClose = () => setOpenIssueSuccessDialog(false);

  const [{ fetching: loadingChannelCurrencies }] = useQuery<ChannelCurrenciesQuery, ChannelCurrenciesQueryVariables>(ChannelCurrenciesDocument, {});

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

  const [bulkCreateGiftCard, bulkCreateGiftCardOpts] = useMutation<GiftCardBulkCreateMutation, GiftCardBulkCreateMutationVariables>(GiftCardBulkCreateDocument, {
    onCompleted: (data) => {
      const errors = data?.createGiftCards?.errors;
      const cardsAmount = data?.createGiftCards?.giftCards?.length || 0;

      const giftCardsBulkIssueSuccessMessage: IMessage = {
        type: 'success',
        title: t(
          'dashboard_createdSuccessAlertTitle',
          messages.createdSuccessAlertTitle.defaultMessage
        ),
        text: t(
          'dashboard_createdSuccessAlertDescription',
          messages.createdSuccessAlertDescription.defaultMessage,
          {
            cardsAmount,
          }
        ),
      };

      notify(getGiftCardCreateOnCompletedMessage(errors, giftCardsBulkIssueSuccessMessage));

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
        <DialogTitle>{m.dashboard_title() ?? messages.title.defaultMessage}</DialogTitle>
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
