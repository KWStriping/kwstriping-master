import { useTranslation } from '@core/i18n';
import { ProductField } from '@core/api/constants';

export const productExportDialogMessages = {
  title: {
    id: 'xkjRu5',
    defaultMessage: 'Export Information',
    description: 'export products to csv file, dialog header',
  },
  confirmButtonLabel: {
    id: 'oOFrUd',
    defaultMessage: 'export products',
    description: 'export products to csv file, button',
  },
  productsLabel: {
    id: 'dc5KWn',
    defaultMessage: 'products',
    description: 'products export type label',
  },
};

function useProductExportFieldMessages() {
  const { t } = useTranslation();

  const messages = {
    [ProductField.Category]: t(
      'dashboard.upNHw',
      'Category'
      // product field
    ),
    [ProductField.ChargeTaxes]: t(
      'dashboard.VNg8A',
      'Charge Taxes'
      // product field
    ),
    [ProductField.Collections]: t(
      'dashboard.xoMLL',
      'Collections'
      // product field
    ),
    [ProductField.Description]: t(
      'dashboard.VIajc',
      'Description'
      // product field
    ),
    [ProductField.Name]: t(
      'dashboard.8i2Ez',
      'Name'
      // product field
    ),
    [ProductField.ProductMediaItem]: t(
      'dashboard.y+k8V',
      'Product Images'
      // product field
    ),
    [ProductField.ProductKlass]: t(
      'dashboard./Nbku',
      'Type'
      // product field
    ),
    [ProductField.ProductWeight]: t(
      'dashboard.JAAul',
      'Export Product Weight'
      // product field
    ),
    [ProductField.VariantMedia]: t(
      'dashboard.o5MoU',
      'Variant Images'
      // product field
    ),
    [ProductField.VariantId]: t(
      'dashboard.YHLsB',
      'Export Variant ID'
      // product field
    ),
    [ProductField.VariantSku]: t(
      'dashboard.kvaFR',
      'Export Variant SKU'
      // product field
    ),
    [ProductField.VariantWeight]: t(
      'dashboard.BwpUv',
      'Export Variant Weight'
      // product field
    ),
  };

  return (field: ProductField) => messages[field];
}

export default useProductExportFieldMessages;
