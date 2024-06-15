import * as m from '@paraglide/messages';
import { publicationMessages } from './messages';
import type { Messages } from './types';
import type { LocalizeDate } from '@tempo/dashboard/hooks/useDateLocalize';
import type { ChannelData } from '@tempo/dashboard/oldSrc/channels/utils';

export const getChannelsAvailabilityMessages = ({
  messages,
  channels = [],
  localizeDate,
}: {
  messages?: Messages;
  channels?: ChannelData[];
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
                ? m.dashboard_published() ?? 'Published'
                : m.dashboard_otPublished() ?? 'Not published',
        availableLabel: m.dashboard_vailableForPurchase() ?? 'Available for purchase',
        availableSecondLabel: m[publicationMessages.willBecomeAvailableOn.id]({
          date: localizeDate(currVal.availableForPurchase),
        }),
        hiddenSecondLabel: m[publicationMessages.willBecomePublishedOn.id]({
          date: localizeDate(currVal.publishedAt),
        }),
        setAvailabilityDateLabel: m.dashboard_etAvailabilityDate() ?? 'Set availability date',
        unavailableLabel: m.dashboard_navailableForPurchase() ?? 'Unavailable for purchase',
      },
    }),
    {} as Messages
  );
