import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import type { CardMenuItem } from '@tempo/dashboard/components/core/CardMenu';
import CardMenu from '@tempo/dashboard/components/core/CardMenu';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import { sectionNames } from '@tempo/dashboard/oldSrc/intl';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { giftCardSettingsUrl } from '../../urls';
import { giftCardsListHeaderMenuItemsMessages as messages } from '../messages';

import { useGiftCardListDialogs } from '../providers/GiftCardListDialogsProvider';
import GiftCardsListHeaderAlert from './GiftCardsListHeaderAlert';

const GiftCardsListHeader: FC = () => {
  const router = useRouter();

  const { openCreateDialog, openBulkCreateDialog, openExportDialog } = useGiftCardListDialogs();

  const openSettings = () => router.push(giftCardSettingsUrl);

  const menuItems: CardMenuItem[] = [
    {
      label: t('dashboard_ettings', messages.settings.defaultMessage),
      testId: 'settingsMenuItem',
      onSelect: openSettings,
    },
    {
      label: t('dashboard_ulkIssue', messages.bulkIssue.defaultMessage),
      testId: 'bulkIssueMenuItem',
      onSelect: openBulkCreateDialog,
    },
    {
      label: t('dashboard_exportCodes', messages.exportCodes.defaultMessage),
      testId: 'exportCodesMenuItem',
      onSelect: openExportDialog,
    },
  ];

  return (
    <>
      <PageHeader
        preview
        title={m.dashboard_giftCards() ?? sectionNames.giftCards.defaultMessage}
        cardMenu={<CardMenu menuItems={menuItems} data-test-id="menu" />}
      >
        <Button color="primary" onClick={openCreateDialog} data-test-id="issue-card-button">
          {m.dashboard_issueButtonLabel() ?? messages.issueButtonLabel.defaultMessage}
        </Button>
      </PageHeader>
      <GiftCardsListHeaderAlert />
    </>
  );
};

export default GiftCardsListHeader;
