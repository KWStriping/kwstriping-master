import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import { appUrl } from '@tempo/dashboard/oldSrc/apps/urls';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import { PLACEHOLDER } from '../types';
import { updateGiftCardInfoCardMessages as messages } from './messages';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import Label from '@tempo/dashboard/components/orders/OrderHistory/Label';
import { getOrderNumberLinkObject } from '@tempo/dashboard/components/orders/OrderHistory/utils';
import { getByType } from '@tempo/dashboard/components/orders/OrderReturnPage/utils';
import { GiftCardEventsEnum } from '@tempo/api/generated/constants';
import useDateLocalize from '@tempo/dashboard/hooks/useDateLocalize';
import { customerUrl } from '@tempo/dashboard/oldSrc/customers/urls';
import { getFullName, getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import { productUrl } from '@tempo/dashboard/oldSrc/products/urls';
import { staffMemberDetailsUrl } from '@tempo/dashboard/oldSrc/staff/urls';

const GiftCardUpdateInfoCardContent: FC = () => {
  const localizeDate = useDateLocalize();

  const { giftCard } = useGiftCardDetails();

  const { created, createdByEmail, createdBy, usedByEmail, usedBy, product, events } = giftCard;

  const cardIssuedEvent = events.find(getByType(GiftCardEventsEnum.Issued));
  const cardBoughtEvent = events.find(getByType(GiftCardEventsEnum.Bought));

  const getBuyerFieldData = (): {
    label: MessageDescriptor;
    name: string;
    url?: string;
  } => {
    // createdBy can be either customer or staff hence
    // we check for issued event
    if (cardIssuedEvent) {
      const { app } = cardIssuedEvent;

      if (app) {
        return {
          label: messages.issuedByAppLabel,
          name: app?.name,
          url: appUrl(app?.id),
        };
      }

      const userName = getFullName(createdBy);

      return {
        label: messages.issuedByLabel,
        name: userName || createdByEmail,
        url: staffMemberDetailsUrl(createdBy?.id),
      };
    }

    if (createdByEmail) {
      return {
        label: messages.boughtByLabel,
        name: createdByEmail,
      };
    }

    return {
      label: messages.boughtByLabel,
      name: getFullName(createdBy),
      url: customerUrl(createdBy?.id),
    };
  };

  const getOrderData = () => {
    if (cardIssuedEvent) {
      const { orderId, orderNumber } = cardIssuedEvent;

      if (!orderId) return null;

      return getOrderNumberLinkObject({
        id: orderId,
        number: orderNumber,
      });
    }

    if (cardBoughtEvent) {
      const { orderId, orderNumber } = cardBoughtEvent;

      return getOrderNumberLinkObject({
        id: orderId,
        number: orderNumber,
      });
    }

    return null;
  };

  const { label: buyerLabelMessage, name: buyerName, url: buyerUrl } = getBuyerFieldData();

  const orderData = getOrderData();

  return (
    <>
      <Label text={m.dashboard_reationLabel() ?? messages.creationLabel.defaultMessage} />
      <Typography>{localizeDate(created)}</Typography>
      <CardSpacer />

      <Label text={m.dashboard_orderNumberLabel() ?? messages.orderNumberLabel.defaultMessage} />
      {orderData ? (
        <Link href={orderData.link}>{orderData.text}</Link>
      ) : (
        <Typography>{PLACEHOLDER}</Typography>
      )}
      <CardSpacer />

      <Label text={m.dashboard_productLabel() ?? messages.productLabel.defaultMessage} />
      {product ? (
        <Link href={productUrl(product?.id)}>{product?.name}</Link>
      ) : (
        <Typography>{PLACEHOLDER}</Typography>
      )}
      <CardSpacer />

      <Label text={m[buyerLabelMessage]} />
      {buyerUrl ? <Link href={buyerUrl}>{buyerName}</Link> : <Typography>{buyerName}</Typography>}
      <CardSpacer />

      <Label text={m.dashboard_sedByLabel() ?? messages.usedByLabel.defaultMessage} />
      {usedBy ? (
        <Link href={customerUrl(usedBy.id)}>{getFullName(usedBy)}</Link>
      ) : (
        <Typography>{getStringOrPlaceholder(usedByEmail, PLACEHOLDER)}</Typography>
      )}
    </>
  );
};

export default GiftCardUpdateInfoCardContent;
