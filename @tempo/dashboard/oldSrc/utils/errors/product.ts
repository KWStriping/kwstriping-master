import type {
  BulkProductErrorFragment,
  CollectionErrorFragment,
  ProductChannelListingErrorFragment,
  ProductErrorFragment,
} from '@tempo/api/generated/graphql';
import { ProductErrorCode } from '@tempo/api/generated/constants';
import type { TFunction } from '@tempo/next/i18n';

import commonErrorMessages, { getCommonFormFieldErrorMessage } from './common';

const messages = {
  alreadyExists: {
    id: '2NgTCJ',
    defaultMessage: 'A product with this SKU already exists',
  },
  attributeAlreadyAssigned: {
    id: 'aggaJg',
    defaultMessage: 'This attribute has already been assigned to this product type',
  },
  attributeCannotBeAssigned: {
    id: 'u24Ppd',
    defaultMessage: 'This attribute cannot be assigned to this product type',
  },
  attributeRequired: {
    id: 'cd13nN',
    defaultMessage: 'All attributes should have value',
    description: 'product attribute error',
  },
  attributeVariantsDisabled: {
    id: 'lLwtgs',
    defaultMessage: 'Variants are disabled in this product type',
  },
  duplicated: {
    id: 'AY7Tuz',
    defaultMessage: 'The same object cannot be in both lists',
  },
  duplicatedInputItem: {
    id: 'pFVX6g',
    defaultMessage: 'Variant with these attributes already exists',
  },
  nameAlreadyTaken: {
    id: 'FuAV5G',
    defaultMessage: 'This name is already taken. Please provide another.',
  },
  priceInvalid: {
    id: 'mYs3tb',
    defaultMessage: 'Product price cannot be lower than 0.',
  },
  skuUnique: {
    id: 'rZf1qL',
    defaultMessage: 'SKUs must be unique',
    description: 'bulk variant create error',
  },
  unsupportedMediaProvider: {
    id: 'DILs4b',
    defaultMessage: 'Unsupported media provider or incorrect URL',
  },
  variantNoDigitalContent: {
    id: 'Z6QAbw',
    defaultMessage: 'This variant does not have any digital content',
  },
  variantUnique: {
    id: 'i3Mvj8',
    defaultMessage: 'This variant already exists',
    description: 'product attribute error',
  },
  noCategorySet: {
    id: '3AqOxp',
    defaultMessage: 'Product category not set',
    description: 'no category set error',
  },
};

function getProductErrorMessage(
  err:
    | Omit<
      ProductErrorFragment | CollectionErrorFragment | ProductChannelListingErrorFragment,
      '__typename'
    >
    | undefined,
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case ProductErrorCode.AttributeAlreadyAssigned:
        return t(
          'dashboard_attributeAlreadyAssigned',
          messages.attributeAlreadyAssigned.defaultMessage
        );
      case ProductErrorCode.AlreadyExists:
        return t('dashboard_lreadyExists', messages.alreadyExists.defaultMessage);
      case ProductErrorCode.AttributeCannotBeAssigned:
        return t(
          'dashboard_attributeCannotBeAssigned',
          messages.attributeCannotBeAssigned.defaultMessage
        );
      case ProductErrorCode.AttributeVariantsDisabled:
        return t(
          'dashboard_attributeVariantsDisabled',
          messages.attributeVariantsDisabled.defaultMessage
        );
      case ProductErrorCode.DuplicatedInputItem:
        return t('dashboard_uplicatedInputItem', messages.duplicatedInputItem.defaultMessage);
      case ProductErrorCode.VariantNoDigitalContent:
        return t(
          'dashboard_variantNoDigitalContent',
          messages.variantNoDigitalContent.defaultMessage
        );
      case ProductErrorCode.UnsupportedMediaProvider:
        return t(
          'dashboard_insupportedMediaProvider',
          messages.unsupportedMediaProvider.defaultMessage
        );
      case ProductErrorCode.ProductWithoutCategory:
        return t('dashboard_oCategorySet', messages.noCategorySet.defaultMessage);
      case ProductErrorCode.Invalid:
        if (err.field === 'price') {
          return t('dashboard_priceInvalid', messages.priceInvalid.defaultMessage);
        }
        return t('dashboard_invalid', commonErrorMessages.invalid.defaultMessage);
      case ProductErrorCode.Unique:
        if (err.field === 'sku') {
          return t('dashboard_kuUnique', messages.skuUnique.defaultMessage);
        }
    }
  }
  return getCommonFormFieldErrorMessage(err, t);
}

export function getProductAttributeErrorMessage(
  err: Omit<ProductErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case ProductErrorCode.Unique:
        return t('dashboard_variantUnique', messages.variantUnique.defaultMessage);
      default:
        return getProductErrorMessage(err, t);
    }
  }

  return undefined;
}

export function getBulkProductErrorMessage(
  err: BulkProductErrorFragment | undefined,
  t: TFunction
): string {
  if (err?.code === ProductErrorCode.Unique && err.field === 'sku') {
    return t('dashboard_kuUnique', messages.skuUnique.defaultMessage);
  }
  return getProductErrorMessage(err, t);
}

export default getProductErrorMessage;
