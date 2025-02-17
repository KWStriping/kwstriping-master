import { ProductField } from '@tempo/api/generated/constants';

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
  const messages = {
    [ProductField.Category]: t(
      'dashboard_upNHw',
      'Category'
      // product field
    ),
    [ProductField.ChargeTaxes]: t(
      'dashboard_VNg8A',
      'Charge Taxes'
      // product field
    ),
    [ProductField.Collections]: t(
      'dashboard_xoMLL',
      'Collections'
      // product field
    ),
    [ProductField.Description]: t(
      'dashboard_VIajc',
      'Description'
      // product field
    ),
    [ProductField.Name]: t(
      'dashboard_8i2Ez',
      'Name'
      // product field
    ),
    [ProductField.ProductMediaItem]: t(
      'dashboard_y+k8V',
      'Product Images'
      // product field
    ),
    [ProductField.ProductKlass]: t(
      'dashboard_/Nbku',
      'Type'
      // product field
    ),
    [ProductField.ProductWeight]: t(
      'dashboard_JAAul',
      'Export Product Weight'
      // product field
    ),
    [ProductField.VariantMedia]: t(
      'dashboard_o5MoU',
      'Variant Images'
      // product field
    ),
    [ProductField.VariantId]: t(
      'dashboard_YHLsB',
      'Export Variant ID'
      // product field
    ),
    [ProductField.VariantSku]: t(
      'dashboard_kvaFR',
      'Export Variant SKU'
      // product field
    ),
    [ProductField.VariantWeight]: t(
      'dashboard_BwpUv',
      'Export Variant Weight'
      // product field
    ),
  };

  return (field: ProductField) => messages[field];
}

export default useProductExportFieldMessages;
