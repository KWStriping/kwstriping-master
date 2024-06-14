import * as m from '@paraglide/messages';
import type { LocalizeDate } from '@tempo/dashboard/hooks/useDateLocalize';
import type { ChannelData } from '@tempo/dashboard/oldSrc/channels/utils';

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
            ? m[publicationMessages.willBecomePublishedOn.id]({
              date: localizeDate(currVal.publishedAt),
            })
            : currVal.publishedAt
              ? m[publicationMessages.publishedSince.id]({
                date: localizeDate(currVal.publishedAt),
              })
              : currVal.isPublished
                ? (m.dashboard_published() ?? 'Published')
                : (m.dashboard_otPublished() ?? 'Not published'),
        availableLabel: (m.dashboard_vailableForPurchase() ?? 'Available for purchase'),
        availableSecondLabel: m[publicationMessages.willBecomeAvailableOn.id]({
          date: localizeDate(currVal.availableForPurchase),
        }),
        hiddenSecondLabel: m[publicationMessages.willBecomePublishedOn.id]({
          date: localizeDate(currVal.publishedAt),
        }),
        setAvailabilityDateLabel: (m.dashboard_etAvailabilityDate() ?? 'Set availability date'),
        unavailableLabel: (m.dashboard_navailableForPurchase() ?? 'Unavailable for purchase'),
      },
    }),
    {} as Messages
  );
