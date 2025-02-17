import type { ChannelFragment } from '@tempo/api/generated/graphql';
import type { ErrorCode } from '@tempo/next/types/errors';
import type {
  CustomizationID,
  CustomizationSettingID,
  PrivateSettingID,
  PublicMetafieldID,
  PublicSettingID,
  SettingsType,
} from './common';
import type { Errors } from '@tempo/checkout/payments/types';
import type {
  PaymentMethod,
  PaymentMethodID,
  PaymentProvider,
  PaymentProviderSettingID,
  PaymentProviderID,
} from '@tempo/checkout/types/payments';

export interface SettingValue {
  value: string;
  encrypted: boolean;
}
export type SettingReadMode = 'encrypted' | 'unencrypted';

export interface PaymentOption {
  id: string;
  method: PaymentMethod;
  availableProviders: PaymentProvider<PaymentProviderID>[];
  activeProvider: PaymentProvider<PaymentProviderID> | null;
}
export interface ChannelPaymentOptions {
  id: string;
  channel: ChannelFragment;
  paymentOptions: PaymentOption[];
}

export type ChannelActivePaymentProviders = {
  [P in string]: {
    [K in PaymentMethodID]: PaymentProviderID | '';
  };
};

export type PaymentProviderSettingsValues<E extends SettingReadMode> = {
  [P in PaymentProviderID]: E extends 'unencrypted'
    ? Partial<{
        [K in PaymentProviderSettingID<P>]: string;
      }>
    : {
        [K in PaymentProviderSettingID<P>]: SettingValue;
      };
};
export type CustomizationSettingsValues = {
  [P in CustomizationID]: {
    [K in CustomizationSettingID<P>]: string;
  };
};
export type CustomizationSettingsFiles = {
  [P in CustomizationID]?: {
    [K in CustomizationSettingID<P>]?: File;
  };
};
export type UnknownPublicSettingsValues = {
  [P in string]: {
    [K in string]: string;
  };
};
export type UnknownPrivateSettingsValues<E extends SettingReadMode> = {
  [P in string]: E extends 'unencrypted'
    ? Partial<{
        [K in string]: string;
      }>
    : {
        [K in string]: SettingValue;
      };
};

export type PublicSettingsValues = {
  [P in PublicSettingID[number]]: P extends 'customizations'
    ? CustomizationSettingsValues
    : P extends 'channelActivePaymentProviders'
      ? ChannelActivePaymentProviders
      : UnknownPublicSettingsValues;
};
export type PrivateSettingsValues<E extends SettingReadMode> = {
  [P in PrivateSettingID[number]]: P extends 'paymentProviders'
    ? PaymentProviderSettingsValues<E>
    : UnknownPrivateSettingsValues<E>;
};
export type SettingsValues<T extends SettingsType, E extends SettingReadMode> = T extends 'public'
  ? PublicSettingsValues
  : PrivateSettingsValues<E>;

export type PublicMetafieldsValues = {
  [P in PublicSettingID[number] | PublicMetafieldID[number]]?: string;
};
export type PrivateMetafieldsValues = {
  [P in PrivateSettingID[number]]?: string;
};

export type PayResult = PaySuccessResult | PayErrorResult | null;

export interface PayErrorResult {
  ok: false;
  errors: ErrorCode[];
  orderId?: string;
}

export interface PaySuccessResult {
  ok?: undefined;
  orderId: string;
  data: {
    paymentUrl: string;
  };
}

type MollieResponse = {
  provider: 'mollie';
  data: {
    paymentUrl: string;
  };
};

type AdyenResponse = {
  provider: 'adyen';
  data: {
    paymentUrl: string;
  };
};

type StripeResponse = {
  provider: 'stripe';
  data: {
    paymentUrl: string;
  };
};

type DummyResponse = {
  provider: 'dummy';
  data: {
    paymentUrl: string;
  };
};

export type PayRequestSuccessResponse = {
  provider: PaymentProviderID;
  ok: true;
  orderId: string;
} & (MollieResponse | AdyenResponse | StripeResponse | DummyResponse);

export type PayRequestErrorResponse = {
  ok: false;
  orderId?: string;
  errors: Errors;
  provider?: PaymentProviderID;
};

export type PayRequestResponse = PayRequestSuccessResponse | PayRequestErrorResponse;
