import type { FC } from 'react';
import GiftCardDeleteDialogContent from './GiftCardDeleteDialogContent';
import useGiftCardSingleDelete from './useGiftCardSingleDelete';
import { GIFT_CARD_LIST_QUERY } from '@tempo/dashboard/oldSrc/giftCards/GiftCardsList/queries';
import useGiftCardDetails from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';

type GiftCardUpdatePageDeleteDialogProps = DialogProps & {
  onDelete: () => void;
};

const GiftCardUpdatePageDeleteDialog: FC<GiftCardUpdatePageDeleteDialogProps> = ({
  onClose,
  open,
  onDelete,
}) => {
  const { giftCard } = useGiftCardDetails();

  const { onDeleteGiftCard, deleteGiftCardOpts } = useGiftCardSingleDelete({
    id: giftCard?.id,
    onClose,
    onSuccess: onDelete,
    refetchQueries: [GIFT_CARD_LIST_QUERY],
  });

  return (
    <GiftCardDeleteDialogContent
      singleDeletion
      giftCard={giftCard}
      open={open}
      onClose={onClose}
      onConfirm={onDeleteGiftCard}
      confirmButtonState={deleteGiftCardOpts?.status}
    />
  );
};

export default GiftCardUpdatePageDeleteDialog;
