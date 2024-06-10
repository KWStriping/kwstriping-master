import type { TFunction } from '@core/i18n';
import { AttributeErrorCode } from '@core/api/constants';
import type { AttributeErrorFragment } from '@core/api/graphql';
import getAttributeErrorMessage from '@dashboard/oldSrc/utils/errors/attribute';

const messages = {
  attributeSlugUnique: {
    id: 'eWV760',
    defaultMessage: 'Attribute with this slug already exists',
  },
  valueAlreadyExists: {
    id: 'J/QqOI',
    defaultMessage: 'This value already exists within this attribute',
  },
};

export function getAttributeSlugErrorMessage(err: AttributeErrorFragment, t: TFunction): string {
  switch (err?.code) {
    case AttributeErrorCode.Unique:
      return t('dashboard.attributeSlugUnique', messages.attributeSlugUnique.defaultMessage);
    default:
      return getAttributeErrorMessage(err, t);
  }
}

export function getValueErrorMessage(err: AttributeErrorFragment, t: TFunction): string {
  switch (err?.code) {
    case AttributeErrorCode.AlreadyExists:
      return t(
        'dashboard.valueAlreadyExists',
        messages.valueAlreadyExists.defaultMessage
      );
    default:
      return getAttributeErrorMessage(err, t);
  }
}
