import { VoucherType } from '@tempo/api/generated/constants';

const messages = {
  order: {
    id: 'ymo+cm',
    defaultMessage: 'All products',
    description: 'voucher discount',
  },
  products: {
    id: '45zP+r',
    defaultMessage: 'Specific products',
    description: 'voucher discount',
  },
  shipment: {
    id: 'WasHjQ',
    defaultMessage: 'Shipment',
    description: 'voucher discount',
  },
};

export const itemsQuantityMessages = {
  categories: {
    id: 'ppLwx3',
    defaultMessage: 'Categories ({quantity})',
    description: 'number of categories',
  },
  collections: {
    id: 'QdGzUf',
    defaultMessage: 'Collections ({quantity})',
    description: 'number of collections',
  },
  products: {
    id: 'bNw8PM',
    defaultMessage: 'Products ({quantity})',
    description: 'number of products',
  },
  variants: {
    id: 'HVlMK2',
    defaultMessage: 'Variants ({quantity})',
    description: 'number of variants',
  },
};

export const translateVoucherTypes = (t: TFunction) => ({
  [VoucherType.Shipping]: t('dashboard_shipment', messages.shipment.defaultMessage),
  [VoucherType.EntireOrder]: t('dashboard_order', messages.order.defaultMessage),
  [VoucherType.SpecificProduct]: t('dashboard_products', messages.products.defaultMessage),
});
