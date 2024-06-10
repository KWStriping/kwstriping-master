import type { TFunction } from '@tempo/next/i18n';
import { AttributeErrorCode } from '@tempo/api/generated/constants';
import type { AttributeErrorFragment } from '@tempo/api/generated/graphql';
import getAttributeErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/attribute';

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
      return t('dashboard_attributeSlugUnique', messages.attributeSlugUnique.defaultMessage);
    default:
      return getAttributeErrorMessage(err, t);
  }
}

export function getValueErrorMessage(err: AttributeErrorFragment, t: TFunction): string {
  switch (err?.code) {
    case AttributeErrorCode.AlreadyExists:
      return t(
        'dashboard_valueAlreadyExists',
        messages.valueAlreadyExists.defaultMessage
      );
    default:
      return getAttributeErrorMessage(err, t);
  }
}
