
import type { GiftCardActivateMutation, GiftCardActivateMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';

import { GIFT_CARD_DETAILS_QUERY } from '../../queries';
import { giftCardEnableDisableSectionMessages as messages } from '../messages';
import {
  GiftCardActivateDocument,
  GiftCardDeactivateDocument,
} from '@tempo/api/generated/graphql';

interface useGiftCardActivateToggleProps {
  onActivateActionComplete?: () => void | undefined;
  onDeactivateActionComplete?: () => void | undefined;
  isActive?: boolean;
}

const useGiftCardActivateToggle = ({
  onActivateActionComplete,
  onDeactivateActionComplete,
  isActive,
}: useGiftCardActivateToggleProps) => {
  const notify = useNotifier();

  const [activateGiftCard, activateGiftCardOpts] = useMutation(GiftCardActivateDocument, {
    onCompleted: (data) => {
      const errors = data?.activateGiftCard?.errors;

      if (errors?.length) {
        notify((m.dashboard_unknownError() ?? 'Unknown error'), {
          type: 'error',
        });

        return;
      }

      notify(
        (m.dashboard_successfullyEnabledTitle({
          type: 'success',
        }) ?? messages.successfullyEnabledTitle.defaultMessage)
      );

      if (onActivateActionComplete) {
        onActivateActionComplete();
      }
    },
    refetchQueries: [GIFT_CARD_DETAILS_QUERY],
  });

  const [deactivateGiftCard, deactivateGiftCardOpts] = useMutation(GiftCardDeactivateDocument, {
    onCompleted: (data) => {
      const errors = data?.deactivateGiftCard?.errors;

      if (errors?.length) {
        notify((m.dashboard_unknownError() ?? 'Unknown error'), {
          type: 'error',
        });
        return;
      }

      notify(
        t(
          'dashboard_successfullyDisabledTitle',
          messages.successfullyDisabledTitle.defaultMessage
        ),
        {
          type: 'success',
        }
      );

      if (onDeactivateActionComplete) {
        onDeactivateActionComplete();
      }
    },
    refetchQueries: [GIFT_CARD_DETAILS_QUERY],
  });

  const currentOpts = isActive ? deactivateGiftCardOpts : activateGiftCardOpts;

  return {
    activateGiftCard,
    activateGiftCardOpts,
    deactivateGiftCard,
    deactivateGiftCardOpts,
    currentOpts,
  };
};

export default useGiftCardActivateToggle;
