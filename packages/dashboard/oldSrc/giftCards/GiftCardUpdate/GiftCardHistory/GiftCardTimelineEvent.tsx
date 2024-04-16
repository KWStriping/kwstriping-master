import { useTranslation } from '@core/i18n';
import type { TFunction } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { TimelineEvent } from '@dashboard/components/core/Timeline';
import { GiftCardEventsEnum } from '@core/api/constants';
import type { GiftCardEventFragment } from '@core/api/graphql';
import { appPath } from '@dashboard/oldSrc/apps/urls';
import { customerPath } from '@dashboard/oldSrc/customers/urls';
import { orderUrl } from '@dashboard/oldSrc/orders/urls';
import { staffMemberDetailsUrl } from '@dashboard/oldSrc/staff/urls';
import type { FC } from 'react';

import { giftCardHistoryTimelineMessages as timelineMessages } from './messages';

const getUserOrApp = (event: GiftCardEventFragment): string | null => {
  if (event.user) {
    const { firstName, lastName, email } = event.user;

    if (lastName === '' || firstName === '') {
      return email;
    }

    return `${firstName} ${lastName}`;
  }

  if (event.app) {
    return event.app.name;
  }

  return null;
};

const getUserOrAppUrl = (event: GiftCardEventFragment): string => {
  if (event.user) {
    return staffMemberDetailsUrl(event.user.id);
  }
  if (event.app) {
    return appPath(event.app.id);
  }
  return null;
};

const getEventMessage = (event: GiftCardEventFragment, t: TFunction) => {
  const user = getUserOrApp(event);
  const userUrl = getUserOrAppUrl(event);

  switch (event.type) {
    case GiftCardEventsEnum.Activated:
      return user
        ? t('dashboard.activated', timelineMessages.activated.defaultMessage, {
            activatedBy: <Link href={userUrl}>{user}</Link>,
          })
        : t('dashboard.activatedAnonymous', timelineMessages.activatedAnonymous.defaultMessage);
    case GiftCardEventsEnum.BalanceReset:
      return user
        ? t('dashboard.alanceReset', timelineMessages.balanceReset.defaultMessage, {
            resetBy: <Link href={userUrl}>{user}</Link>,
          })
        : t(
            'dashboard.alanceResetAnonymous',
            timelineMessages.balanceResetAnonymous.defaultMessage
          );
    case GiftCardEventsEnum.Bought:
      return t('dashboard.ought', timelineMessages.bought.defaultMessage, {
        orderNumber: <Link href={orderUrl(event.orderId)}>#{event.orderNumber}</Link>,
      });
    case GiftCardEventsEnum.Deactivated:
      return user
        ? t('dashboard.deactivated', timelineMessages.deactivated.defaultMessage, {
            deactivatedBy: <Link href={userUrl}>{user}</Link>,
          })
        : t(
            'dashboard.deactivatedAnonymous',
            timelineMessages.deactivatedAnonymous.defaultMessage
          );
    case GiftCardEventsEnum.ExpiryDateUpdated:
      return user
        ? t('dashboard.expiryDateUpdate', timelineMessages.expiryDateUpdate.defaultMessage, {
            expiryUpdatedBy: <Link href={userUrl}>{user}</Link>,
          })
        : t(
            'dashboard.expiryDateUpdateAnonymous',
            timelineMessages.expiryDateUpdateAnonymous.defaultMessage
          );
    case GiftCardEventsEnum.Issued:
      return user
        ? t('dashboard.issued', timelineMessages.issued.defaultMessage, {
            issuedBy: <Link href={userUrl}>{user}</Link>,
          })
        : t('dashboard.issuedAnonymous', timelineMessages.issuedAnonymous.defaultMessage);
    case GiftCardEventsEnum.Resent:
      return t('dashboard.esent', timelineMessages.resent.defaultMessage);
    case GiftCardEventsEnum.SentToCustomer:
      return t('dashboard.sentToCustomer', timelineMessages.sentToCustomer.defaultMessage);
    case GiftCardEventsEnum.TagsUpdated:
      return t('dashboard.agsUpdated', timelineMessages.tagsUpdated.defaultMessage);
    case GiftCardEventsEnum.Updated:
      return t('dashboard.agsUpdated', timelineMessages.tagsUpdated.defaultMessage);
    case GiftCardEventsEnum.UsedInOrder:
      return user
        ? t('dashboard.sedInOrder', timelineMessages.usedInOrder.defaultMessage, {
            orderLink: <Link href={orderUrl(event.orderId)}>#{event.orderNumber}</Link>,
            buyer: (content) =>
              !!user && (
                <Link
                  href={event.user ? customerPath(event.user.id) : appPath(event.app.id)}
                >{`${content} ${user}`}</Link>
              ),
          })
        : t(
            'dashboard.sedInOrderAnonymous',
            timelineMessages.usedInOrderAnonymous.defaultMessage,
            {
              orderLink: <Link href={orderUrl(event.orderId)}>#{event.orderNumber}</Link>,
            }
          );
  }
};

export interface GiftCardTimelineEventProps {
  date: string;
  event: GiftCardEventFragment;
}

const GiftCardTimelineEvent: FC<GiftCardTimelineEventProps> = ({ date, event }) => {
  const { t } = useTranslation();
  return <TimelineEvent date={date} title={getEventMessage(event, t)} />;
};

export default GiftCardTimelineEvent;
