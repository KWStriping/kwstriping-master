import type { TFunction } from '@core/i18n';
import type { InvoiceErrorFragment } from '@core/api/graphql';
import { InvoiceErrorCode } from '@core/api/constants';

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
        return t('dashboard.emailNotSet', messages.emailNotSet.defaultMessage);
      case InvoiceErrorCode.InvalidStatus:
        return t('dashboard.invalidStatus', messages.invalidStatus.defaultMessage);
      case InvoiceErrorCode.NotFound:
        return t('dashboard.otFound', messages.notFound.defaultMessage);
      case InvoiceErrorCode.NotReady:
        return t('dashboard.otReady', messages.notReady.defaultMessage);
      case InvoiceErrorCode.NumberNotSet:
        return t('dashboard.umberNotSet', messages.numberNotSet.defaultMessage);
      case InvoiceErrorCode.UrlNotSet:
        return t('dashboard.rlNotSet', messages.urlNotSet.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getInvoiceErrorMessage;
