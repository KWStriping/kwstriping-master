import * as m from '@paraglide/messages';
import { ConfirmButton } from '@tempo/ui/components/buttons/ConfirmButton';
import type { FC } from 'react';

import { bulkEnableDisableSectionMessages as buttonMessages } from '../../GiftCardsList/GiftCardsListTable/GiftCardsListTableHeader/messages';
import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import useGiftCardActivateToggle from './hooks/useGiftCardActivateToggle';

const GiftCardEnableDisableSection: FC = () => {
  const {
    giftCard: { id, isActive, isExpired },
  } = useGiftCardDetails();

  const { activateGiftCard, deactivateGiftCard, currentOpts } = useGiftCardActivateToggle({
    isActive,
  });

  const handleClick = () => (isActive ? deactivateGiftCard({ id }) : activateGiftCard({ id }));

  const buttonLabel = isActive ? buttonMessages.disableLabel : buttonMessages.enableLabel;

  if (isExpired) return null;

  return (
    <ConfirmButton
      data-test-id="enable-button"
      onClick={handleClick}
      transitionState={currentOpts?.status}
      labels={{
        confirm: m[buttonLabel],
        error: m.dashboard_error() ?? 'Error',
      }}
    />
  );
};

export default GiftCardEnableDisableSection;
