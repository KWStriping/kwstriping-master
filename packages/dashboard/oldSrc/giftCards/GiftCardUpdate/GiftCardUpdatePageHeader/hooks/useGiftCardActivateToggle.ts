import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';

import { GIFT_CARD_DETAILS_QUERY } from '../../queries';
import { giftCardEnableDisableSectionMessages as messages } from '../messages';
import {
  GiftCardActivateDocument,
  GiftCardDeactivateDocument,
} from '@core/api/graphql';

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
  const { t } = useTranslation();
  const notify = useNotifier();

  const [activateGiftCard, activateGiftCardOpts] = useMutation(GiftCardActivateDocument, {
    onCompleted: (data) => {
      const errors = data?.activateGiftCard?.errors;

      if (errors?.length) {
        notify(t('dashboard.unknownError', 'Unknown error'), {
          type: 'error',
        });

        return;
      }

      notify(
        t('dashboard.successfullyEnabledTitle', messages.successfullyEnabledTitle.defaultMessage),
        {
          type: 'success',
        }
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
        notify(t('dashboard.unknownError', 'Unknown error'), {
          type: 'error',
        });
        return;
      }

      notify(
        t(
          'dashboard.successfullyDisabledTitle',
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
