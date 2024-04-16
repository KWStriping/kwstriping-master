import { useTranslation } from '@core/i18n';
import type { IFilter } from '@dashboard/components/core/Filter';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import { OrderStatusFilter, ChargeStatus } from '@core/api/constants';
import { paymentStatusMessages } from '@dashboard/oldSrc/intl';
import type { FilterOpts, KeyValue, MinMax } from '@dashboard/oldSrc/types';
import {
  createBooleanField,
  createDateField,
  createKeyValueField,
  createOptionsField,
  createTextField,
} from '@dashboard/oldSrc/utils/filters/fields';

export enum OrderFilterKeys {
  created = 'created',
  customer = 'customer',
  status = 'status',
  paymentStatus = 'paymentStatus',
  clickAndCollect = 'clickAndCollect',
  preorder = 'preorder',
  channel = 'channel',
  giftCard = 'giftCard',
  metadata = 'metadata',
}

export enum OrderFilterGiftCard {
  bought = 'bought',
  paid = 'paid',
}

export interface OrderListFilterOpts {
  created: FilterOpts<MinMax>;
  customer: FilterOpts<string>;
  status: FilterOpts<OrderStatusFilter[]>;
  paymentStatus: FilterOpts<ChargeStatus[]>;
  channel?: FilterOpts<MultiAutocompleteChoiceType[]>;
  clickAndCollect: FilterOpts<boolean>;
  preorder: FilterOpts<boolean>;
  giftCard: FilterOpts<OrderFilterGiftCard[]>;
  metadata: FilterOpts<KeyValue[]>;
}

const messages = {
  preorder: {
    id: 'JYvf8/',
    defaultMessage: 'Preorder',
    description: 'is preorder',
  },
  clickAndCollect: {
    id: 'biAxKR',
    defaultMessage: 'Click&Collect',
    description: 'click and collect',
  },
  channel: {
    id: 'lJP1iw',
    defaultMessage: 'Channel',
    description: 'order',
  },
  customer: {
    id: 'PzXIXh',
    defaultMessage: 'Customer',
    description: 'order',
  },
  placed: {
    id: 'a4qX2+',
    defaultMessage: 'Created',
    description: 'order',
  },
  giftCard: {
    id: 'JUQwne',
    defaultMessage: 'Gift Card',
    description: 'order',
  },
  giftCardPaid: {
    id: 'Kgxlsf',
    defaultMessage: 'Paid with Gift Card',
    description: 'order',
  },
  giftCardOrdered: {
    id: 's5v6m0',
    defaultMessage: 'Gift Card ordered',
    description: 'order',
  },
  metadata: {
    defaultMessage: 'Metadata',
    id: '8Q504V',
  },
};

export function useFilterStructure(opts: OrderListFilterOpts): IFilter<OrderFilterKeys> {
  const { t } = useTranslation();
  return [
    {
      ...createBooleanField(
        OrderFilterKeys.clickAndCollect,
        t('dashboard.lickAndCollect', 'Click&Collect'),
        opts.clickAndCollect.value,
        {
          negative: t('dashboard.no', 'No'),
          positive: t('dashboard.yes', 'Yes'),
        }
      ),
      active: opts.clickAndCollect.active,
    },
    {
      ...createBooleanField(
        OrderFilterKeys.preorder,
        t('dashboard.reorder', 'Preorder'),
        opts.preorder.value,
        {
          negative: t('dashboard.no', 'No'),
          positive: t('dashboard.yes', 'Yes'),
        }
      ),
      active: opts.preorder.active,
    },
    {
      ...createTextField(
        OrderFilterKeys.customer,
        t('dashboard.customer', 'Customer'),
        opts.customer.value
      ),
      active: opts.customer.active,
    },
    {
      ...createDateField(
        OrderFilterKeys.created,
        t('dashboard.placed', 'Created'),
        opts.created.value
      ),
      active: opts.created.active,
    },
    {
      ...createOptionsField(
        OrderFilterKeys.giftCard,
        t('dashboard.giftCard', 'Gift Card'),
        opts.giftCard.value,
        true,
        [
          {
            label: t('dashboard.giftCardOrdered', 'Gift Card ordered'),
            value: OrderFilterGiftCard.bought,
          },
          {
            label: t('dashboard.giftCardPaid', 'Paid with Gift Card'),
            value: OrderFilterGiftCard.paid,
          },
        ]
      ),
      active: opts.giftCard.active,
    },
    {
      ...createOptionsField(
        OrderFilterKeys.status,
        t('dashboard.status', 'Status'),
        opts.status.value,
        true,
        [
          {
            label: t('dashboard.cancelled', 'Cancelled'),
            value: OrderStatusFilter.Canceled,
          },
          {
            label: t('dashboard.fulfilled', 'Fulfilled'),
            value: OrderStatusFilter.Fulfilled,
          },
          {
            label: t('dashboard.partiallyFulfilled', 'Partially fulfilled'),
            value: OrderStatusFilter.PartiallyFulfilled,
          },
          {
            label: t('dashboard.unfulfilled', 'Unfulfilled'),
            value: OrderStatusFilter.Unfulfilled,
          },
          {
            label: t('dashboard.eadyToCapture', 'Ready to capture'),
            value: OrderStatusFilter.ReadyToCapture,
          },
          {
            label: t('dashboard.eadyToFulfill', 'Ready to fulfill'),
            value: OrderStatusFilter.ReadyToFulfill,
          },
          {
            label: t('dashboard.unconfirmed', 'Unconfirmed'),
            value: OrderStatusFilter.Unconfirmed,
          },
        ]
      ),
      active: opts.status.active,
    },
    {
      ...createOptionsField(
        OrderFilterKeys.paymentStatus,
        t('dashboard.paymentStatus', 'Payment status'),
        opts.paymentStatus.value,
        true,
        [
          {
            label: t('dashboard.paid', 'Fully paid'),
            value: ChargeStatus.FullyCharged,
          },
          {
            label: t('dashboard.partiallyPaid', 'Partially paid'),
            value: ChargeStatus.PartiallyCharged,
          },
          {
            label: t('dashboard.unpaid', 'Unpaid'),
            value: ChargeStatus.NotCharged,
          },
          {
            label: t('dashboard.refunded', 'Fully refunded'),
            value: ChargeStatus.FullyRefunded,
          },
          {
            label: t('dashboard.partiallyRefunded', 'Partially refunded'),
            value: ChargeStatus.PartiallyRefunded,
          },
          {
            label: t('dashboard.cancelled', 'Cancelled'),
            value: ChargeStatus.Cancelled,
          },
          {
            label: t('dashboard.ending', 'Pending'),
            value: ChargeStatus.Pending,
          },
          {
            label: t('dashboard.refused', paymentStatusMessages.refused.defaultMessage),
            value: ChargeStatus.Refused,
          },
        ]
      ),
      active: opts.paymentStatus.active,
    },
    {
      ...createKeyValueField(
        OrderFilterKeys.metadata,
        t('dashboard.etadata', messages.metadata?.defaultMessage),
        opts.metadata?.value
      ),
      active: opts.metadata?.active,
    },
    ...(opts?.channel?.value.length
      ? [
          {
            ...createOptionsField(
              OrderFilterKeys.channel,
              t('dashboard.channel', messages.channel.defaultMessage),
              [],
              true,
              opts.channel.value
            ),
            active: opts.channel.active,
          },
        ]
      : []),
  ];
}
