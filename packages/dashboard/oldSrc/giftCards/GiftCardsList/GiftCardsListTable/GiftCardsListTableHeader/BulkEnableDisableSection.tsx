import { useTranslation } from '@core/i18n';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import type { IMessage } from '@dashboard/components/messages';
import { getByIds } from '@dashboard/components/orders/OrderReturnPage/utils';
import {
  GiftCardBulkActivateDocument,
  GiftCardBulkDeactivateDocument,
} from '@core/api/graphql';
import type { FC } from 'react';

import { useGiftCardList } from '../../providers/GiftCardListProvider';
import { GIFT_CARD_LIST_QUERY } from '../../queries';
import { bulkEnableDisableSectionMessages as messages } from './messages';

const BulkEnableDisableSection: FC = () => {
  const { t } = useTranslation();
  const notify = useNotifier();

  const { listElements: ids, reset, giftCards } = useGiftCardList();

  const hasAnyEnabledCardsSelected = giftCards
    .filter(getByIds(ids))
    .some(({ isActive }) => isActive);

  const areAllSelectedCardsActive = giftCards
    .filter(getByIds(ids))
    .every(({ isActive }) => isActive);

  const hasAnyDisabledCardsSelected = giftCards
    .filter(getByIds(ids))
    .some(({ isActive }) => !isActive);

  const areAllSelectedCardsDisabled = giftCards
    .filter(getByIds(ids))
    .every(({ isActive }) => !isActive);

  const [activateGiftCards, activateGiftCardsOpts] = useMutation(GiftCardBulkActivateDocument, {
    onCompleted: (data) => {
      const { errors, count } = data?.activateGiftCards;

      const notifierData: IMessage = errors?.length
        ? {
            type: 'error'
            text: t(
              'dashboard.errorActivateAlertText',
              messages.errorActivateAlertText.defaultMessage,
              {
                count,
              }
            ),
          }
        : {
            type: 'success',
            text: t(
              'dashboard.successActivateAlertText',
              messages.successActivateAlertText.defaultMessage,
              {
                count,
              }
            ),
          };

      notify(notifierData);

      if (!errors?.length) {
        reset();
      }
    },
    refetchQueries: [GIFT_CARD_LIST_QUERY],
  });

  const [deactivateGiftCards, deactivateGiftCardsOpts] = useMutation(
    GiftCardBulkDeactivateDocument,
    {
      onCompleted: (data) => {
        const { errors, count } = data?.deactivateGiftCards;

        const notifierData: IMessage = errors?.length
          ? {
              type: 'error',
              text: t(
                'dashboard.errorDeactivateAlertText',
                messages.errorDeactivateAlertText.defaultMessage,
                {
                  count,
                }
              ),
            }
          : {
              type: 'success',
              text: t(
                'dashboard.successDeactivateAlertText',
                messages.successDeactivateAlertText.defaultMessage,
                {
                  count,
                }
              ),
            };

        notify(notifierData);

        if (!errors?.length) {
          reset();
        }
      },
      refetchQueries: [GIFT_CARD_LIST_QUERY],
    }
  );

  const handleActivateGiftCards = () => activateGiftCards({ ids });

  const handleDeactivateGiftCards = () => deactivateGiftCards({ ids });

  const isSelectionMixed = hasAnyEnabledCardsSelected && hasAnyDisabledCardsSelected;

  return (
    <>
      {(areAllSelectedCardsDisabled || isSelectionMixed) && (
        <ConfirmButton
          onClick={handleActivateGiftCards}
          color="secondary"
          transitionState={activateGiftCardsOpts?.status}
          data-test-id="activate-gift-cards"
        >
          {t('dashboard.enableLabel', messages.enableLabel.defaultMessage)}
        </ConfirmButton>
      )}
      {(areAllSelectedCardsActive || isSelectionMixed) && (
        <ConfirmButton
          onClick={handleDeactivateGiftCards}
          color="secondary"
          transitionState={deactivateGiftCardsOpts?.status}
          data-test-id="deactivate-gift-cards"
        >
          {t('dashboard.disableLabel', messages.disableLabel.defaultMessage)}
        </ConfirmButton>
      )}
    </>
  );
};

export default BulkEnableDisableSection;
