import type { BulkDeleteGiftCardMutation, BulkDeleteGiftCardMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import type { MutationResultWithOpts } from '@tempo/api/hooks/useMutation';
import { BulkDeleteGiftCardDocument } from '@tempo/api/generated/graphql';
import type { BulkDeleteGiftCardMutation } from '@tempo/api/generated/graphql';
import { useGiftCardList } from '@tempo/dashboard/oldSrc/giftCards/GiftCardsList/providers/GiftCardListProvider';

interface UseGiftCardBulkDeleteProps {
  onBulkDeleteGiftCards: () => void;
  bulkDeleteGiftCardOpts: MutationResultWithOpts<BulkDeleteGiftCardMutation>;
}

const useGiftCardBulkDelete = ({
  onClose,
  refetchQueries,
}: {
  onClose: () => void;
  refetchQueries?: string[];
}): UseGiftCardBulkDeleteProps => {
  const notify = useNotifier();

  const { listElements, selectedItemsCount, reset: resetSelectedItems } = useGiftCardList();

  const [bulkDeleteGiftCard, bulkDeleteGiftCardOpts] = useMutation(BulkDeleteGiftCardDocument, {
    onCompleted: (data) => {
      const errors = data?.deleteGiftCards?.errors;

      if (!errors?.length) {
        notify(
          t(
            'dashboard_deleteSuccessAlertText',
            '[[selectedItemsCount,plural,one[[Successfully deleted gift card]] other[[Successfully deleted gift cards]]',
            {
              selectedItemsCount,
            }
          ),
          {
            type: 'success',
          }
        );

        onClose();
        resetSelectedItems();
        return;
      }

      notify(m.dashboard_unknownError() ?? 'Unknown error', {
        type: 'error',
      });
    },
    refetchQueries,
  });

  const onBulkDeleteGiftCards = () => bulkDeleteGiftCard({ ids: listElements });

  return {
    onBulkDeleteGiftCards,
    bulkDeleteGiftCardOpts,
  };
};

export default useGiftCardBulkDelete;
