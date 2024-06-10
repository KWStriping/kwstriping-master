import * as m from '@paraglide/messages';
import type { IFilter } from '@tempo/dashboard/components/core/Filter';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import { OrderStatusFilter, ChargeStatus } from '@tempo/api/generated/constants';
import { paymentStatusMessages } from '@tempo/dashboard/oldSrc/intl';
import type { FilterOpts, KeyValue, MinMax } from '@tempo/dashboard/oldSrc/types';
import {
  createBooleanField,
  createDateField,
  createKeyValueField,
  createOptionsField,
  createTextField,
} from '@tempo/dashboard/oldSrc/utils/filters/fields';

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
  return [
    {
      ...createBooleanField(
        OrderFilterKeys.clickAndCollect,
        (m.dashboard_lickAndCollect() ?? 'Click&Collect'),
        opts.clickAndCollect.value,
        {
          negative: (m.dashboard_no() ?? 'No'),
          positive: (m.dashboard_yes() ?? 'Yes'),
        }
      ),
      active: opts.clickAndCollect.active,
    },
    {
      ...createBooleanField(
        OrderFilterKeys.preorder,
        (m.dashboard_reorder() ?? 'Preorder'),
        opts.preorder.value,
        {
          negative: (m.dashboard_no() ?? 'No'),
          positive: (m.dashboard_yes() ?? 'Yes'),
        }
      ),
      active: opts.preorder.active,
    },
    {
      ...createTextField(
        OrderFilterKeys.customer,
        (m.dashboard_customer() ?? 'Customer'),
        opts.customer.value
      ),
      active: opts.customer.active,
    },
    {
      ...createDateField(
        OrderFilterKeys.created,
        (m.dashboard_placed() ?? 'Created'),
        opts.created.value
      ),
      active: opts.created.active,
    },
    {
      ...createOptionsField(
        OrderFilterKeys.giftCard,
        (m.dashboard_giftCard() ?? 'Gift Card'),
        opts.giftCard.value,
        true,
        [
          {
            label: (m.dashboard_giftCardOrdered() ?? 'Gift Card ordered'),
            value: OrderFilterGiftCard.bought,
          },
          {
            label: (m.dashboard_giftCardPaid() ?? 'Paid with Gift Card'),
            value: OrderFilterGiftCard.paid,
          },
        ]
      ),
      active: opts.giftCard.active,
    },
    {
      ...createOptionsField(
        OrderFilterKeys.status,
        (m.dashboard_status() ?? 'Status'),
        opts.status.value,
        true,
        [
          {
            label: (m.dashboard_cancelled() ?? 'Cancelled'),
            value: OrderStatusFilter.Canceled,
          },
          {
            label: (m.dashboard_fulfilled() ?? 'Fulfilled'),
            value: OrderStatusFilter.Fulfilled,
          },
          {
            label: (m.dashboard_partiallyFulfilled() ?? 'Partially fulfilled'),
            value: OrderStatusFilter.PartiallyFulfilled,
          },
          {
            label: (m.dashboard_unfulfilled() ?? 'Unfulfilled'),
            value: OrderStatusFilter.Unfulfilled,
          },
          {
            label: (m.dashboard_eadyToCapture() ?? 'Ready to capture'),
            value: OrderStatusFilter.ReadyToCapture,
          },
          {
            label: (m.dashboard_eadyToFulfill() ?? 'Ready to fulfill'),
            value: OrderStatusFilter.ReadyToFulfill,
          },
          {
            label: (m.dashboard_unconfirmed() ?? 'Unconfirmed'),
            value: OrderStatusFilter.Unconfirmed,
          },
        ]
      ),
      active: opts.status.active,
    },
    {
      ...createOptionsField(
        OrderFilterKeys.paymentStatus,
        (m.dashboard_paymentStatus() ?? 'Payment status'),
        opts.paymentStatus.value,
        true,
        [
          {
            label: (m.dashboard_paid() ?? 'Fully paid'),
            value: ChargeStatus.FullyCharged,
          },
          {
            label: (m.dashboard_partiallyPaid() ?? 'Partially paid'),
            value: ChargeStatus.PartiallyCharged,
          },
          {
            label: (m.dashboard_unpaid() ?? 'Unpaid'),
            value: ChargeStatus.NotCharged,
          },
          {
            label: (m.dashboard_refunded() ?? 'Fully refunded'),
            value: ChargeStatus.FullyRefunded,
          },
          {
            label: (m.dashboard_partiallyRefunded() ?? 'Partially refunded'),
            value: ChargeStatus.PartiallyRefunded,
          },
          {
            label: (m.dashboard_cancelled() ?? 'Cancelled'),
            value: ChargeStatus.Cancelled,
          },
          {
            label: (m.dashboard_ending() ?? 'Pending'),
            value: ChargeStatus.Pending,
          },
          {
            label: t('dashboard_refused', paymentStatusMessages.refused.defaultMessage),
            value: ChargeStatus.Refused,
          },
        ]
      ),
      active: opts.paymentStatus.active,
    },
    {
      ...createKeyValueField(
        OrderFilterKeys.metadata,
        t('dashboard_etadata', messages.metadata?.defaultMessage),
        opts.metadata?.value
      ),
      active: opts.metadata?.active,
    },
    ...(opts?.channel?.value.length
      ? [
          {
            ...createOptionsField(
              OrderFilterKeys.channel,
              t('dashboard_channel', messages.channel.defaultMessage),
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
