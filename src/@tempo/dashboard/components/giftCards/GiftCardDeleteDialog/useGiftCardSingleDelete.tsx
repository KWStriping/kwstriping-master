import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import type { MutationResultWithOpts } from '@tempo/api/hooks/useMutation';
import { DeleteGiftCardDocument } from '@tempo/api/generated/graphql';
import type { DeleteGiftCardMutation } from '@tempo/api/generated/graphql';
import { getGiftCardErrorMessage } from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/messages';

interface UseGiftCardSingleDeleteProps {
  onDeleteGiftCard: () => void;
  deleteGiftCardOpts: MutationResultWithOpts<DeleteGiftCardMutation>;
}

const useGiftCardSingleDelete = ({
  id,
  onClose,
  refetchQueries,
  onSuccess,
}: {
  id: string;
  onClose: () => void;
  onSuccess?: () => void;
  refetchQueries?: string[];
}): UseGiftCardSingleDeleteProps => {
  const notify = useNotifier();

  const [deleteGiftCard, deleteGiftCardOpts] = useMutation(DeleteGiftCardDocument, {
    onCompleted: (data) => {
      const errors = data?.deleteGiftCard?.errors;

      if (!errors?.length) {
        notify(
          t(
            'dashboard_deleteSuccessAlertText',
            '[[selectedItemsCount,plural,one[[Successfully deleted gift card]] other[[Successfully deleted gift cards]]',
            {
              selectedItemsCount: 1,
            }
          ),
          {
            type: 'success',
          }
        );

        onClose();

        if (onSuccess) {
          onSuccess();
        }

        return;
      }

      errors.map((error) =>
        notify(getGiftCardErrorMessage(error, t), {
          type: 'error',
        })
      );
    },
    refetchQueries,
  });

  const onDeleteGiftCard = () => deleteGiftCard({ id });

  return {
    onDeleteGiftCard,
    deleteGiftCardOpts,
  };
};

export default useGiftCardSingleDelete;
