import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { appUrl } from '@dashboard/oldSrc/apps/urls';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import { PLACEHOLDER } from '../types';
import { updateGiftCardInfoCardMessages as messages } from './messages';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import Label from '@dashboard/components/orders/OrderHistory/Label';
import { getOrderNumberLinkObject } from '@dashboard/components/orders/OrderHistory/utils';
import { getByType } from '@dashboard/components/orders/OrderReturnPage/utils';
import { GiftCardEventsEnum } from '@core/api/constants';
import useDateLocalize from '@dashboard/hooks/useDateLocalize';
import { customerUrl } from '@dashboard/oldSrc/customers/urls';
import { getFullName, getStringOrPlaceholder } from '@dashboard/oldSrc/misc';
import { productUrl } from '@dashboard/oldSrc/products/urls';
import { staffMemberDetailsUrl } from '@dashboard/oldSrc/staff/urls';

const GiftCardUpdateInfoCardContent: FC = () => {
  const { t } = useTranslation();
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
      <Label text={t('dashboard.reationLabel', messages.creationLabel.defaultMessage)} />
      <Typography>{localizeDate(created)}</Typography>
      <CardSpacer />

      <Label text={t('dashboard.orderNumberLabel', messages.orderNumberLabel.defaultMessage)} />
      {orderData ? (
        <Link href={orderData.link}>{orderData.text}</Link>
      ) : (
        <Typography>{PLACEHOLDER}</Typography>
      )}
      <CardSpacer />

      <Label text={t('dashboard.productLabel', messages.productLabel.defaultMessage)} />
      {product ? (
        <Link href={productUrl(product?.id)}>{product?.name}</Link>
      ) : (
        <Typography>{PLACEHOLDER}</Typography>
      )}
      <CardSpacer />

      <Label text={t(buyerLabelMessage)} />
      {buyerUrl ? <Link href={buyerUrl}>{buyerName}</Link> : <Typography>{buyerName}</Typography>}
      <CardSpacer />

      <Label text={t('dashboard.sedByLabel', messages.usedByLabel.defaultMessage)} />
      {usedBy ? (
        <Link href={customerUrl(usedBy.id)}>{getFullName(usedBy)}</Link>
      ) : (
        <Typography>{getStringOrPlaceholder(usedByEmail, PLACEHOLDER)}</Typography>
      )}
    </>
  );
};

export default GiftCardUpdateInfoCardContent;
