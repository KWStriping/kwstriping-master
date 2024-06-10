import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import type { MutationResultWithOpts } from '@core/urql/hooks/useMutation';
import { BulkDeleteGiftCardDocument } from '@core/api/graphql';
import type { BulkDeleteGiftCardMutation } from '@core/api/graphql';
import { useGiftCardList } from '@dashboard/oldSrc/giftCards/GiftCardsList/providers/GiftCardListProvider';

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
  const { t } = useTranslation();

  const { listElements, selectedItemsCount, reset: resetSelectedItems } = useGiftCardList();

  const [bulkDeleteGiftCard, bulkDeleteGiftCardOpts] = useMutation(BulkDeleteGiftCardDocument, {
    onCompleted: (data) => {
      const errors = data?.deleteGiftCards?.errors;

      if (!errors?.length) {
        notify(
          t(
            'dashboard.deleteSuccessAlertText',
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

      notify(t('dashboard.unknownError', 'Unknown error'), {
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
