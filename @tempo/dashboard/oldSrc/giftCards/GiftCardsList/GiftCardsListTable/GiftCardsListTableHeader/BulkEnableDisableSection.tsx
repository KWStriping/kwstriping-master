
import * as m from '@paraglide/messages';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useMutation } from '@tempo/api/hooks/useMutation';
import type { IMessage } from '@dashboard/components/messages';
import { getByIds } from '@tempo/dashboard/components/orders/OrderReturnPage/utils';
import {
  GiftCardBulkActivateDocument,
  GiftCardBulkDeactivateDocument,
} from '@tempo/api/generated/graphql';
import type { FC } from 'react';

import { useGiftCardList } from '../../providers/GiftCardListProvider';
import { GIFT_CARD_LIST_QUERY } from '../../queries';
import { bulkEnableDisableSectionMessages as messages } from './messages';

const BulkEnableDisableSection: FC = () => {
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
              'dashboard_errorActivateAlertText',
              messages.errorActivateAlertText.defaultMessage,
              {
                count,
              }
            ),
          }
        : {
            type: 'success',
            text: t(
              'dashboard_successActivateAlertText',
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
                'dashboard_errorDeactivateAlertText',
                messages.errorDeactivateAlertText.defaultMessage,
                {
                  count,
                }
              ),
            }
          : {
              type: 'success',
              text: t(
                'dashboard_successDeactivateAlertText',
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
          {(m.dashboard_enableLabel() ?? messages.enableLabel.defaultMessage)}
        </ConfirmButton>
      )}
      {(areAllSelectedCardsActive || isSelectionMixed) && (
        <ConfirmButton
          onClick={handleDeactivateGiftCards}
          color="secondary"
          transitionState={deactivateGiftCardsOpts?.status}
          data-test-id="deactivate-gift-cards"
        >
          {(m.dashboard_disableLabel() ?? messages.disableLabel.defaultMessage)}
        </ConfirmButton>
      )}
    </>
  );
};

export default BulkEnableDisableSection;
