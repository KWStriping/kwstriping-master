import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import type { FC } from 'react';
import { useState } from 'react';
import type { CardMenuItem } from '@tempo/dashboard/components/core/CardMenu';
import CardMenu from '@tempo/dashboard/components/core/CardMenu';
import type { CustomerGiftCardFragment } from '@tempo/api/generated/graphql';
import { giftCardsListTableMessages } from '@tempo/dashboard/oldSrc/giftCards/GiftCardsList/messages';
import useGiftCardActivateToggle from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/GiftCardUpdatePageHeader/hooks/useGiftCardActivateToggle';
import type { ExtendedGiftCard } from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardDetailsProvider/types';
import GiftCardStatusChip from '../GiftCardStatusChip/GiftCardStatusChip';
import useGiftCardSingleDelete from '../GiftCardDeleteDialog/useGiftCardSingleDelete';
import GiftCardDeleteDialogContent from '../GiftCardDeleteDialog/GiftCardDeleteDialogContent';
import { CUSTOMER_GIFT_CARD_LIST_QUERY } from './queries';

// import { useListWrapperStyles } from "./styles";

interface CustomerGiftCardsCardListItemProps {
  giftCard: ExtendedGiftCard<CustomerGiftCardFragment>;
}

const CustomerGiftCardsCardListItem: FC<CustomerGiftCardsCardListItemProps> = ({ giftCard }) => {
  // const styles = useListWrapperStyles();
  const styles = {};
  const [openDeleteGiftCard, setOpenDeleteGiftCard] = useState(false);
  const { isExpired, isActive, last4CodeChars } = giftCard;

  const onGiftCardDeleteDialogClose = () => setOpenDeleteGiftCard(false);

  const { activateGiftCard, deactivateGiftCard, activateGiftCardOpts, deactivateGiftCardOpts } =
    useGiftCardActivateToggle({
      isActive,
    });

  const handleGiftCardActivate = () => {
    activateGiftCard({
      id: giftCard.id,
    });
  };

  const handleGiftCardDeactivate = () => {
    deactivateGiftCard({
      id: giftCard.id,
    });
  };

  const handleGiftCardDelete = () => setOpenDeleteGiftCard(true);

  const getMenuItems = (): CardMenuItem[] => {
    const items = [
      {
        label: m.dashboard_deleteLabel() ?? 'Delete',
        onSelect: handleGiftCardDelete,
      },
    ];

    if (isExpired) {
      return items;
    }

    const statusButton = isActive
      ? {
          label: m.dashboard_disableLabel() ?? 'Deactivate',
          onSelect: handleGiftCardDeactivate,
          loading: deactivateGiftCardOpts.fetching,
          withLoading: true,
          hasError: !!deactivateGiftCardOpts.error,
        }
      : {
          label: m.dashboard_enableLabel() ?? 'Activate',
          onSelect: handleGiftCardActivate,
          loading: activateGiftCardOpts.fetching,
          withLoading: true,
          hasError: !!activateGiftCardOpts.error,
        };

    return [...items, statusButton];
  };

  const { onDeleteGiftCard, deleteGiftCardOpts } = useGiftCardSingleDelete({
    id: giftCard?.id,
    onClose: onGiftCardDeleteDialogClose,
    refetchQueries: [CUSTOMER_GIFT_CARD_LIST_QUERY],
  });

  return (
    <>
      <div className={styles.listingWrapper ?? ''}>
        <Trans
          values={{
            last4CodeChars,
          }}
          {...giftCardsListTableMessages.codeEndingWithLabel}
        />
        <GiftCardStatusChip giftCard={giftCard} />
        <CardMenu className={styles.listingMenu ?? ''} menuItems={getMenuItems()} />
      </div>
      <GiftCardDeleteDialogContent
        singleDeletion
        giftCard={giftCard}
        open={openDeleteGiftCard}
        onClose={onGiftCardDeleteDialogClose}
        onConfirm={onDeleteGiftCard}
        confirmButtonState={deleteGiftCardOpts?.status}
      />
    </>
  );
};

export default CustomerGiftCardsCardListItem;
