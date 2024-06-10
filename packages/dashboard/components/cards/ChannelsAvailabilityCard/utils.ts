import type { TFunction } from '@core/i18n';
import type { LocalizeDate } from '@dashboard/hooks/useDateLocalize';
import type { ChannelData } from '@dashboard/oldSrc/channels/utils';

import { publicationMessages } from './messages';
import type { Messages } from './types';

export const getChannelsAvailabilityMessages = ({
  messages,
  channels = [],
  t,
  localizeDate,
}: {
  messages?: Messages;
  channels?: ChannelData[];
  t: TFunction;
  localizeDate: LocalizeDate;
}): Messages =>
  channels.reduce(
    (prevVal, currVal) => ({
      ...prevVal,
      [currVal.id]: {
        ...messages,
        availableDateText:
          currVal.publishedAt && !currVal.isPublished
            ? t(publicationMessages.willBecomePublishedOn.id, {
              date: localizeDate(currVal.publishedAt),
            })
            : currVal.publishedAt
              ? t(publicationMessages.publishedSince.id, {
                date: localizeDate(currVal.publishedAt),
              })
              : currVal.isPublished
                ? t('dashboard.published', 'Published')
                : t('dashboard.otPublished', 'Not published'),
        availableLabel: t('dashboard.vailableForPurchase', 'Available for purchase'),
        availableSecondLabel: t(publicationMessages.willBecomeAvailableOn.id, {
          date: localizeDate(currVal.availableForPurchase),
        }),
        hiddenSecondLabel: t(publicationMessages.willBecomePublishedOn.id, {
          date: localizeDate(currVal.publishedAt),
        }),
        setAvailabilityDateLabel: t('dashboard.etAvailabilityDate', 'Set availability date'),
        unavailableLabel: t('dashboard.navailableForPurchase', 'Unavailable for purchase'),
      },
    }),
    {} as Messages
  );
