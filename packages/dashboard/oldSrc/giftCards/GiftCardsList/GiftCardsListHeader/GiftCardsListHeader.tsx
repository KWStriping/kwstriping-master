import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import type { CardMenuItem } from '@dashboard/components/core/CardMenu';
import CardMenu from '@dashboard/components/core/CardMenu';
import PageHeader from '@dashboard/components/core/PageHeader';
import { sectionNames } from '@dashboard/oldSrc/intl';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { giftCardSettingsUrl } from '../../urls';
import { giftCardsListHeaderMenuItemsMessages as messages } from '../messages';

import { useGiftCardListDialogs } from '../providers/GiftCardListDialogsProvider';
import GiftCardsListHeaderAlert from './GiftCardsListHeaderAlert';

const GiftCardsListHeader: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { openCreateDialog, openBulkCreateDialog, openExportDialog } = useGiftCardListDialogs();

  const openSettings = () => router.push(giftCardSettingsUrl);

  const menuItems: CardMenuItem[] = [
    {
      label: t('dashboard.ettings', messages.settings.defaultMessage),
      testId: 'settingsMenuItem',
      onSelect: openSettings,
    },
    {
      label: t('dashboard.ulkIssue', messages.bulkIssue.defaultMessage),
      testId: 'bulkIssueMenuItem',
      onSelect: openBulkCreateDialog,
    },
    {
      label: t('dashboard.exportCodes', messages.exportCodes.defaultMessage),
      testId: 'exportCodesMenuItem',
      onSelect: openExportDialog,
    },
  ];

  return (
    <>
      <PageHeader
        preview
        title={t('dashboard.giftCards', sectionNames.giftCards.defaultMessage)}
        cardMenu={<CardMenu menuItems={menuItems} data-test-id="menu" />}
      >
        <Button color="primary" onClick={openCreateDialog} data-test-id="issue-card-button">
          {t('dashboard.issueButtonLabel', messages.issueButtonLabel.defaultMessage)}
        </Button>
      </PageHeader>
      <GiftCardsListHeaderAlert />
    </>
  );
};

export default GiftCardsListHeader;
