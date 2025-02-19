import type { FC } from 'react';
import GiftCardDeleteDialogContent, { SINGLE } from './GiftCardDeleteDialogContent';
import useGiftCardBulkDelete from './useGiftCardBulkDelete';
import useGiftCardSingleDelete from './useGiftCardSingleDelete';
import type { ActionDialogProps } from '@tempo/dashboard/components/dialogs/ActionDialog';
import { useGiftCardListDialogs } from '@tempo/dashboard/oldSrc/giftCards/GiftCardsList/providers/GiftCardListDialogsProvider';
import { useGiftCardList } from '@tempo/dashboard/oldSrc/giftCards/GiftCardsList/providers/GiftCardListProvider';
import { GIFT_CARD_LIST_QUERY } from '@tempo/dashboard/oldSrc/giftCards/GiftCardsList/queries';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';

interface GiftCardDeleteDialogProps extends DialogProps {
  refetchQueries?: string[];
}

const GiftCardDeleteDialog: FC<GiftCardDeleteDialogProps> = ({
  open,
  onClose,
  refetchQueries = [],
}) => {
  const listProps = useGiftCardList();
  const { giftCards, loading, selectedItemsCount } = listProps;

  const { id } = useGiftCardListDialogs();

  const singleDeletion = !!id || selectedItemsCount === SINGLE;

  const { onDeleteGiftCard, deleteGiftCardOpts } = useGiftCardSingleDelete({
    id,
    onClose,
    refetchQueries: [GIFT_CARD_LIST_QUERY, ...refetchQueries],
  });

  const { onBulkDeleteGiftCards, bulkDeleteGiftCardOpts } = useGiftCardBulkDelete({
    onClose,
    refetchQueries: [GIFT_CARD_LIST_QUERY, ...refetchQueries],
  });

  const dialogProps: Pick<ActionDialogProps, 'onConfirm' | 'confirmButtonState'> = id
    ? {
        onConfirm: onDeleteGiftCard,
        confirmButtonState: deleteGiftCardOpts?.status,
      }
    : {
        onConfirm: onBulkDeleteGiftCards,
        confirmButtonState: bulkDeleteGiftCardOpts?.status,
      };

  return (
    <GiftCardDeleteDialogContent
      {...listProps}
      {...dialogProps}
      id={id}
      open={open}
      onClose={onClose}
      singleDeletion={singleDeletion}
      giftCards={giftCards}
      loading={loading}
    />
  );
};

export default GiftCardDeleteDialog;
