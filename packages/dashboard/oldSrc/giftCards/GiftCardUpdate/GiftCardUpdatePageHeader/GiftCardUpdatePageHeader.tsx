import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import type { FC } from 'react';
import { giftCardsListTableMessages as tableMessages } from '../../GiftCardsList/messages';

import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import useGiftCardUpdateDialogs from '../providers/GiftCardUpdateDialogsProvider/hooks/useGiftCardUpdateDialogs';
import GiftCardEnableDisableSection from './GiftCardEnableDisableSection';
import { updateGiftCardPageHeaderMessages as messages } from './messages';
import { getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import { sectionNames } from '@dashboard/oldSrc/intl';
import { giftCardsListPath } from '@dashboard/oldSrc/giftCards/urls';
import GiftCardStatusChip from '@dashboard/components/giftCards/GiftCardStatusChip/GiftCardStatusChip';
import PageHeader from '@dashboard/components/core/PageHeader';
//

const GiftCardUpdatePageHeader: FC = () => {
  const { t } = useTranslation();
  const { giftCard } = useGiftCardDetails();

  const { openResendCodeDialog } = useGiftCardUpdateDialogs();

  if (!giftCard) {
    return <PageHeader preview title={getStringOrPlaceholder(undefined)} />;
  }

  const { last4CodeChars, isExpired } = giftCard;

  const title = t(
    'dashboard.odeEndingWithLabel',
    tableMessages.codeEndingWithLabel.defaultMessage,
    {
      last4CodeChars,
    }
  );

  return (
    <>
      <Backlink href={giftCardsListPath}>
        {t('dashboard.giftCards', sectionNames.giftCards.defaultMessage)}
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
            {t('dashboard.resendButtonLabel', messages.resendButtonLabel.defaultMessage)}
          </Button>
        )}
      </PageHeader>
    </>
  );
};

export default GiftCardUpdatePageHeader;
