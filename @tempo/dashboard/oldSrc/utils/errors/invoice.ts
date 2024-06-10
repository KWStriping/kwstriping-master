import type { TFunction } from '@tempo/next/i18n';
import type { InvoiceErrorFragment } from '@tempo/api/generated/graphql';
import { InvoiceErrorCode } from '@tempo/api/generated/constants';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  emailNotSet: {
    id: 'abTH5q',
    defaultMessage: 'Email address is not set',
    description: 'error message',
  },
  invalidStatus: {
    id: 'dxCVWI',
    defaultMessage: 'Cannot request an invoice for draft order',
    description: 'error message',
  },
  notFound: {
    id: 'uRTj1Q',
    defaultMessage: 'Invoice not found',
    description: 'error message',
  },
  notReady: {
    id: 'Fz3kic',
    defaultMessage: 'Billing address is not set or invoice is not ready to be send',
    description: 'error message',
  },
  numberNotSet: {
    id: 'N43t3/',
    defaultMessage: 'Number not set for an invoice',
    description: 'error message',
  },
  urlNotSet: {
    id: 'vP7g2+',
    defaultMessage: 'URL not set for an invoice',
    description: 'error message',
  },
};

function getInvoiceErrorMessage(err: InvoiceErrorFragment, t: TFunction): string {
  if (err) {
    switch (err.code) {
      case InvoiceErrorCode.EmailNotSet:
        return t('dashboard_emailNotSet', messages.emailNotSet.defaultMessage);
      case InvoiceErrorCode.InvalidStatus:
        return t('dashboard_invalidStatus', messages.invalidStatus.defaultMessage);
      case InvoiceErrorCode.NotFound:
        return t('dashboard_otFound', messages.notFound.defaultMessage);
      case InvoiceErrorCode.NotReady:
        return t('dashboard_otReady', messages.notReady.defaultMessage);
      case InvoiceErrorCode.NumberNotSet:
        return t('dashboard_umberNotSet', messages.numberNotSet.defaultMessage);
      case InvoiceErrorCode.UrlNotSet:
        return t('dashboard_rlNotSet', messages.urlNotSet.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getInvoiceErrorMessage;
