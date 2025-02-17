import * as m from '@paraglide/messages';
import type { TFunction } from '@tempo/next/i18n';
import { Temporal } from '@js-temporal/polyfill';
import { OrderStatus, ChargeStatus } from '@tempo/api/generated/constants';
import type { AddressUpdateInput, DateRangeInput } from '@tempo/api/generated/graphql';
import type { AddressTypeInput } from './customers/types';
import {
  commonStatusMessages,
  errorMessages,
  orderStatusMessages,
  paymentStatusMessages,
} from './intl';
import { StatusType } from '@tempo/dashboard/oldSrc/types';
import type { UserError } from '@tempo/dashboard/oldSrc/types';

export function decimal(value: string | number) {
  if (typeof value === 'string') {
    return value === '' ? null : value;
  }
  return value;
}

export function weight(value: string) {
  return value === '' ? null : parseFloat(value);
}

export const removeDoubleSlashes = (url: string) => url.replace(/([^:]\/)\/+/g, '$1');

export const transformPaymentStatus = (
  status: string,
  t: TFunction
): { localized: string; status: StatusType } => {
  switch (status) {
    case ChargeStatus.PartiallyCharged:
      return {
        localized: t(
          'dashboard_partiallyPaid',
          paymentStatusMessages.partiallyPaid.defaultMessage
        ),
        status: StatusType.Error,
      };
    case ChargeStatus.FullyCharged:
      return {
        localized: t('dashboard_paid', paymentStatusMessages.paid.defaultMessage),
        status: StatusType.Success,
      };
    case ChargeStatus.PartiallyRefunded:
      return {
        localized: t(
          'dashboard_partiallyRefunded',
          paymentStatusMessages.partiallyRefunded.defaultMessage
        ),
        status: StatusType.Info,
      };
    case ChargeStatus.FullyRefunded:
      return {
        localized: t('dashboard_refunded', paymentStatusMessages.refunded.defaultMessage),
        status: StatusType.Info,
      };
    case ChargeStatus.Pending:
      return {
        localized: t('dashboard_ending', paymentStatusMessages.pending.defaultMessage),
        status: StatusType.Warning,
      };
    case ChargeStatus.Refused:
      return {
        localized: t('dashboard_refused', paymentStatusMessages.refused.defaultMessage),
        status: StatusType.Error,
      };
    case ChargeStatus.Cancelled:
      return {
        localized: t('dashboard_cancelled', commonStatusMessages.cancelled.defaultMessage),
        status: StatusType.Error,
      };
    case ChargeStatus.NotCharged:
      return {
        localized: t('dashboard_unpaid', paymentStatusMessages.unpaid.defaultMessage),
        status: StatusType.Error,
      };
    default:
      return {
        localized: status,
        status: StatusType.Error,
      };
  }
};

export const transformOrderStatus = (
  status: string,
  t: TFunction
): { localized: string; status: StatusType } => {
  switch (status) {
    case OrderStatus.Fulfilled:
      return {
        localized: t('dashboard_fulfilled', orderStatusMessages.fulfilled.defaultMessage),
        status: StatusType.Success,
      };
    case OrderStatus.PartiallyFulfilled:
      return {
        localized: t(
          'dashboard_partiallyFulfilled',
          orderStatusMessages.partiallyFulfilled.defaultMessage
        ),
        status: StatusType.Warning,
      };
    case OrderStatus.Unfulfilled:
      return {
        localized: t('dashboard_unfulfilled', orderStatusMessages.unfulfilled.defaultMessage),
        status: StatusType.Error,
      };
    case OrderStatus.Canceled:
      return {
        localized: t('dashboard_cancelled', commonStatusMessages.cancelled.defaultMessage),
        status: StatusType.Error,
      };
    case OrderStatus.Draft:
      return {
        localized: t('dashboard_draft', orderStatusMessages.draft.defaultMessage),
        status: StatusType.Info,
      };
    case OrderStatus.Unconfirmed:
      return {
        localized: t('dashboard_unconfirmed', orderStatusMessages.unconfirmed.defaultMessage),
        status: StatusType.Info,
      };
    case OrderStatus.PartiallyReturned:
      return {
        localized: t(
          'dashboard_partiallyReturned',
          orderStatusMessages.partiallyReturned.defaultMessage
        ),
        status: StatusType.Info,
      };
    case OrderStatus.Returned:
      return {
        localized: t('dashboard_returned', orderStatusMessages.returned.defaultMessage),
        status: StatusType.Info,
      };
    default:
      return {
        localized: status,
        status: StatusType.Error,
      };
  }
};

export function maybe<T>(exp: () => T): T | undefined;
export function maybe<T>(exp: () => T, d: T): T;
export function maybe(exp: unknown, d?: unknown) {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
}

export function only<T>(obj: T, key: keyof T): boolean {
  return Object.keys(obj).every((objKey) =>
    objKey === key ? obj[key] !== undefined : obj[key] === undefined
  );
}

export function empty(obj: {}): boolean {
  return Object.keys(obj).every((key) => obj[key] === undefined);
}

export function hasErrors(errorList: UserError[] | null): boolean {
  return !(errorList === undefined || errorList === null || errorList.length === 0);
}

export const parseLogMessage = ({
  t,
  code,
  field,
}: {
  t: TFunction;
  code: string;
  field?: string;
}) =>
  m.dashboard_aseCodeErrorMessage({
    errorCode: code,
    fieldError:
      field &&
      (m.dashboard_odeErrorFieldMessage({
        fieldName: field,
      }) ??
        errorMessages.codeErrorFieldMessage.defaultMessage),
  }) ?? errorMessages.baseCodeErrorMessage.defaultMessage;

interface AnyEventWithPropagation {
  stopPropagation: () => void;
}
export function stopPropagation<T extends AnyEventWithPropagation>(cb: (event?: T) => void) {
  return (event: T) => {
    event.stopPropagation();
    cb(event);
  };
}

interface AnyEventWithPreventDefault {
  preventDefault: () => void;
}
export function preventDefault<T extends AnyEventWithPreventDefault>(cb: (event?: T) => void) {
  return (event: T) => {
    event.preventDefault();
    cb(event);
  };
}

export function generateCode(charNum: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < charNum; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function capitalize(s: string) {
  return s.charAt(0).toLocaleUpperCase() + s.slice(1);
}

export function transformFormToAddressInput<T>(
  address: T & AddressTypeInput
): T & AddressUpdateInput {
  return {
    ...address,
  };
}

export function getStringOrPlaceholder(s: string | undefined, placeholder?: string): string {
  return s || placeholder || '...';
}

export const getDatePeriod = (days: number): DateRangeInput => {
  if (days < 1) return {};
  const end = Temporal.Now.plainDateISO();
  const start = end.subtract({ days: 1 });
  return {
    gte: start.toString(),
    lte: end.toString(),
  };
};

export function getFullName<T extends { firstName: string; lastName: string }>(data: T) {
  if (!data || !data?.firstName || !data?.lastName) {
    return '';
  }

  return `${data?.firstName} ${data?.lastName}`;
}

export const flatten = (obj: unknown) => {
  // Be cautious that repeated keys are overwritten

  const result = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(result, flatten(obj[key]));
    } else {
      result[key] = obj[key];
    }
  });

  return result;
};

export function PromiseQueue() {
  let queue = Promise.resolve();

  function add<T>(operation: (value: T | void) => PromiseLike<T>) {
    return new Promise((resolve, reject) => {
      queue = queue.then(operation).then(resolve).catch(reject);
    });
  }

  return { queue, add };
}

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
