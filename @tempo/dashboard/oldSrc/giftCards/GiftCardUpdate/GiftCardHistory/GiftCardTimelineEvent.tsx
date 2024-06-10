import * as m from '@paraglide/messages';
import type { TFunction } from '@tempo/next/i18n';
import Link from '@tempo/ui/components/Link';
import { TimelineEvent } from '@tempo/dashboard/components/core/Timeline';
import { GiftCardEventsEnum } from '@tempo/api/generated/constants';
import type { GiftCardEventFragment } from '@tempo/api/generated/graphql';
import { appPath } from '@dashboard/oldSrc/apps/urls';
import { customerPath } from '@tempo/dashboard/oldSrc/customers/urls';
import { orderUrl } from '@tempo/dashboard/oldSrc/orders/urls';
import { staffMemberDetailsUrl } from '@tempo/dashboard/oldSrc/staff/urls';
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
        ? m.dashboard_activated({
            activatedBy: <Link href={userUrl}>{user}</Link>,
          }) ?? timelineMessages.activated.defaultMessage
        : t('dashboard_activatedAnonymous', timelineMessages.activatedAnonymous.defaultMessage);
    case GiftCardEventsEnum.BalanceReset:
      return user
        ? m.dashboard_alanceReset({
            resetBy: <Link href={userUrl}>{user}</Link>,
          }) ?? timelineMessages.balanceReset.defaultMessage
        : t(
            'dashboard_alanceResetAnonymous',
            timelineMessages.balanceResetAnonymous.defaultMessage
          );
    case GiftCardEventsEnum.Bought:
      return (
        m.dashboard_ought({
          orderNumber: <Link href={orderUrl(event.orderId)}>#{event.orderNumber}</Link>,
        }) ?? timelineMessages.bought.defaultMessage
      );
    case GiftCardEventsEnum.Deactivated:
      return user
        ? m.dashboard_deactivated({
            deactivatedBy: <Link href={userUrl}>{user}</Link>,
          }) ?? timelineMessages.deactivated.defaultMessage
        : t(
            'dashboard_deactivatedAnonymous',
            timelineMessages.deactivatedAnonymous.defaultMessage
          );
    case GiftCardEventsEnum.ExpiryDateUpdated:
      return user
        ? m.dashboard_expiryDateUpdate({
            expiryUpdatedBy: <Link href={userUrl}>{user}</Link>,
          }) ?? timelineMessages.expiryDateUpdate.defaultMessage
        : t(
            'dashboard_expiryDateUpdateAnonymous',
            timelineMessages.expiryDateUpdateAnonymous.defaultMessage
          );
    case GiftCardEventsEnum.Issued:
      return user
        ? m.dashboard_issued({
            issuedBy: <Link href={userUrl}>{user}</Link>,
          }) ?? timelineMessages.issued.defaultMessage
        : t('dashboard_issuedAnonymous', timelineMessages.issuedAnonymous.defaultMessage);
    case GiftCardEventsEnum.Resent:
      return t('dashboard_esent', timelineMessages.resent.defaultMessage);
    case GiftCardEventsEnum.SentToCustomer:
      return t('dashboard_sentToCustomer', timelineMessages.sentToCustomer.defaultMessage);
    case GiftCardEventsEnum.TagsUpdated:
      return t('dashboard_agsUpdated', timelineMessages.tagsUpdated.defaultMessage);
    case GiftCardEventsEnum.Updated:
      return t('dashboard_agsUpdated', timelineMessages.tagsUpdated.defaultMessage);
    case GiftCardEventsEnum.UsedInOrder:
      return user
        ? m.dashboard_sedInOrder({
            orderLink: <Link href={orderUrl(event.orderId)}>#{event.orderNumber}</Link>,
            buyer: (content) =>
              !!user && (
                <Link
                  href={event.user ? customerPath(event.user.id) : appPath(event.app.id)}
                >{`${content} ${user}`}</Link>
              ),
          }) ?? timelineMessages.usedInOrder.defaultMessage
        : t(
            'dashboard_sedInOrderAnonymous',
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
  return <TimelineEvent date={date} title={getEventMessage(event, t)} />;
};

export default GiftCardTimelineEvent;
