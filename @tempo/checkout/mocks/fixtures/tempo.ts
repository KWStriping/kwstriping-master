import type {
  TransactionActionPayloadFragment,
  TransactionItemFragment,
} from '@tempo/api/generated/graphql';
import { testingVars } from '../consts';
import { encryptSetting } from '@tempo/checkout/configuration/encryption';
import type { PaymentProviderSettingsValues } from '@tempo/checkout/types';

export const mollieCompletedOrderId = 'ord_kr6ltl';

export const paymentProviders: PaymentProviderSettingsValues<'encrypted'> = {
  mollie: {
    apiKey: encryptSetting(testingVars.mollieKey),
    profileId: {
      encrypted: false,
      value: testingVars.mollieProfileId,
    },
  },
  adyen: {
    merchantAccount: {
      encrypted: false,
      value: testingVars.adyenMerchantAccount,
    },
    clientKey: {
      encrypted: false,
      value: testingVars.adyenClientKey,
    },
    apiKey: encryptSetting(testingVars.adyenApiKey),
    hmac: encryptSetting(testingVars.adyenHmac),
    password: encryptSetting(testingVars.adyenWebhookPassword),
    username: encryptSetting(testingVars.adyenWebhookUsername),
  },
  stripe: {
    secretKey: encryptSetting(testingVars.stripeSecretKey),
    webhookSecret: encryptSetting(testingVars.stripeWebhookSecret),
    publishableKey: {
      encrypted: false,
      value: testingVars.stripePublishableKey,
    },
  },
  dummy: { dummyKey: encryptSetting('') },
};

export const appPrivateMetafields = {
  paymentProviders,
};

export const prepareTempoTransaction = (
  type: 'voided' | 'charged' | 'authorized' | 'refunded',
  amount: number,
  currency: string,
  additionalData?: Partial<TransactionItemFragment>
): TransactionItemFragment => {
  const common: Pick<
    TransactionItemFragment,
    'amountVoided' | 'amountCharged' | 'amountAuthorized' | 'amountRefunded'
  > = {
    amountRefunded: {
      amount: 0,
      currency,
    },
    amountAuthorized: { amount: 0, currency },
    amountCharged: { amount: 0, currency },
    amountVoided: { amount: 0, currency },
  };

  const amounts = { ...common };

  switch (type) {
    case 'authorized':
      amounts.amountAuthorized.amount = amount;
      break;
    case 'charged':
      amounts.amountCharged.amount = amount;
      break;
    case 'refunded':
      amounts.amountRefunded.amount = amount;
      break;
    case 'voided':
      amounts.amountVoided.amount = amount;
      break;
  }

  return {
    ...amounts,
    reference: '123',
    events: [],
    id: '123',
    ...additionalData,
  };
};

export const transactionActionRequest: Record<
  'missingData' | 'adyenRefund' | 'mollieRefund',
  Partial<TransactionActionPayloadFragment>
> = {
  missingData: {
    transaction: undefined,
    action: undefined,
  },
  adyenRefund: {
    transaction: {
      id: 'VHJhbnNhY3Rpb25JdGVtOjE3OA==',
      reference: 'LD65H2FVNXSKGK82',
      type: 'adyen-mc',
      amountAuthorized: {
        amount: 0,
        currency: 'USD',
      },
      amountCharged: {
        amount: 42.92,
      },
      amountVoided: {
        amount: 0,
      },
      amountRefunded: {
        amount: 0,
      },
    },
    action: {
      actionType: 'REFUND',
      amount: String(4.31),
    },
  },
  mollieRefund: {
    transaction: {
      id: 'VHJhbnNhY3Rpb25JdGVtOjE3Mg==',
      reference: 'ord_kr6ltl',
      type: 'mollie-creditcard',
      amountAuthorized: {
        amount: 0,
        currency: 'USD',
      },
      amountCharged: {
        amount: 21.67,
      },
      amountVoided: {
        amount: 0,
      },
      amountRefunded: {
        amount: 0,
      },
    },
    action: {
      actionType: 'REFUND',
      amount: String(38.61),
    },
  },
};
