import { useTranslation } from '@core/i18n';
import { getById } from '@core/utils';
import type { ActionDialogProps } from '@dashboard/components/dialogs/ActionDialog';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DeleteWarningDialogConsentContent from '@dashboard/components/dialogs/TypeDeleteWarningDialog/DeleteWarningDialogConsentContent';
import type { GiftCardDataFragment } from '@core/api/graphql';
import type { GiftCardsListConsumerProps } from '@dashboard/oldSrc/giftCards/GiftCardsList/providers/GiftCardListProvider';
import type { ExtendedGiftCard } from '@dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardDetailsProvider/types';
import { CircularProgress, DialogContentText } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

/// / import { useGiftCardDeleteDialogContentStyles as useStyles } from "./styles";

export const SINGLE = 1;

type DeleteDialogContentGiftCard = Pick<
  ExtendedGiftCard<GiftCardDataFragment>,
  'currentBalance' | 'id'
>;

export interface GiftCardDeleteDialogContentProps<TGiftCard extends DeleteDialogContentGiftCard>
  extends Pick<ActionDialogProps, 'open' | 'onClose' | 'onConfirm' | 'confirmButtonState'>,
    Partial<
      Pick<
        GiftCardsListConsumerProps,
        'listElements' | 'selectedItemsCount' | 'giftCards' | 'loading'
      >
    > {
  id?: string;
  giftCard?: TGiftCard;
  singleDeletion: boolean;
}

function GiftCardDeleteDialogContent<TGiftCard extends DeleteDialogContentGiftCard>({
  id,
  open,
  onClose,
  onConfirm,
  confirmButtonState,
  singleDeletion,
  selectedItemsCount: listSelectedItemsCount,
  listElements,
  giftCards,
  giftCard,
  loading,
}: GiftCardDeleteDialogContentProps<TGiftCard>) {
  const { t } = useTranslation();

  const [isConsentChecked, setConsentChecked] = useState(false);

  const selectedItemsCount = listSelectedItemsCount || SINGLE;

  useEffect(() => {
    if (!open) {
      setConsentChecked(false);
    }
  }, [open]);

  const hasSelectedAnyGiftCardsWithBalance = () => {
    if (!giftCards) {
      return false;
    }

    return listElements?.some(hasSelectedGiftCardBalance);
  };

  const hasSelectedGiftCardBalance = (id: string) => {
    const card = giftCards?.find(getById(id)) || giftCard;

    return card?.currentBalance?.amount > 0;
  };

  const deletingCardsWithBalance = singleDeletion
    ? hasSelectedGiftCardBalance(id)
    : hasSelectedAnyGiftCardsWithBalance();

  const submitEnabled = deletingCardsWithBalance ? isConsentChecked : true;

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      variant="delete"
      title={t(
        'dashboard.title',
        '[[selectedItemsCount,plural,one[[Delete Gift Card]] other[[Delete Gift Cards]]',
        { selectedItemsCount }
      )}
      onConfirm={onConfirm}
      confirmButtonState={confirmButtonState}
      disabled={!submitEnabled}
    >
      {loading ? (
        <div className={styles.progressContainer ?? ''}>
          <CircularProgress />
        </div>
      ) : deletingCardsWithBalance ? (
        <DeleteWarningDialogConsentContent
          isConsentChecked={isConsentChecked}
          onConsentChange={setConsentChecked}
          description={t(
            'dashboard.ithBalanceDescription',
            '[[selectedItemsCount,plural,one[[The gift card you are about to delete has available balance. By deleting this card you may remove balance available to your customer.]] other[[You are about to delete gift cards with available balance. Are you sure you want to do that?]]',
            {
              selectedItemsCount,
            }
          )}
          consentLabel={t(
            'dashboard.onsentLabel',
            '[[selectedItemsCount,plural,one[[I am aware that I am removing a gift card with balance]] other[[I am aware that I am removing gift cards with balance]]',
            {
              selectedItemsCount,
            }
          )}
        />
      ) : (
        <DialogContentText>
          <Typography>
            {t(
              'dashboard.efaultDescription',
              '[[selectedItemsCount,plural,one[[Are you sure you want to delete this gift card?]] other[[Are you sure you want to delete {{selectedItemsCount}} giftCards?]]',
              {
                selectedItemsCount,
              }
            )}
          </Typography>
        </DialogContentText>
      )}
    </ActionDialog>
  );
}

export default GiftCardDeleteDialogContent;
