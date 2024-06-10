import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { FC } from 'react';
import { giftCardsListTableMessages as tableMessages } from '../../GiftCardsList/messages';

import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import useGiftCardUpdateDialogs from '../providers/GiftCardUpdateDialogsProvider/hooks/useGiftCardUpdateDialogs';
import GiftCardEnableDisableSection from './GiftCardEnableDisableSection';
import { updateGiftCardPageHeaderMessages as messages } from './messages';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import { sectionNames } from '@tempo/dashboard/oldSrc/intl';
import { giftCardsListPath } from '@tempo/dashboard/oldSrc/giftCards/urls';
import GiftCardStatusChip from '@tempo/dashboard/components/giftCards/GiftCardStatusChip/GiftCardStatusChip';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';

const GiftCardUpdatePageHeader: FC = () => {
  const { giftCard } = useGiftCardDetails();

  const { openResendCodeDialog } = useGiftCardUpdateDialogs();

  if (!giftCard) {
    return <PageHeader preview title={getStringOrPlaceholder(undefined)} />;
  }

  const { last4CodeChars, isExpired } = giftCard;

  const title = t(
    'dashboard_odeEndingWithLabel',
    tableMessages.codeEndingWithLabel.defaultMessage,
    {
      last4CodeChars,
    }
  );

  return (
    <>
      <Backlink href={giftCardsListPath}>
        {m.dashboard_giftCards() ?? sectionNames.giftCards.defaultMessage}
      </Backlink>
      <PageHeader
        preview
        inline
        title={
          <div className={styles.title ?? ''}>
            {title}
            <GiftCardStatusChip giftCard={giftCard} />
          </div>
        }
      >
        <GiftCardEnableDisableSection />

        {!isExpired && (
          <Button color="primary" onClick={openResendCodeDialog}>
            {m.dashboard_resendButtonLabel() ?? messages.resendButtonLabel.defaultMessage}
          </Button>
        )}
      </PageHeader>
    </>
  );
};

export default GiftCardUpdatePageHeader;
