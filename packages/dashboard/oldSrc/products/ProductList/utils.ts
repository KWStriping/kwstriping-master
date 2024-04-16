import type { TFunction } from '@core/i18n';
import { isInEnum } from '@core/utils/enums';
import { ProductKlassKind } from '@core/api/constants';

interface ProductKindChoice {
  label: string;
  value: ProductKlassKind;
}

export const getAvailableProductKinds = (): ProductKindChoice[] =>
  Object.keys(ProductKlassKind).map((kind) => ({
    label: kind,
    value: kind as ProductKlassKind,
  }));

export const getProductKindOpts = (
  availableProducts: ProductKindChoice[],
  t: TFunction
): ProductKindChoice[] =>
  availableProducts.map((kind) => {
    switch (kind.value) {
      case ProductKlassKind.GiftCard:
        return {
          ...kind,
          label: t('dashboard.giftCardLabel', 'Gift Card'),
        };
      case ProductKlassKind.Normal:
        return {
          ...kind,
          label: t('dashboard.normalLabel', 'Normal'),
        };
      default:
        return {
          ...kind,
          label: t('dashboard.normalLabel', 'Normal'),
        };
    }
  });

export const getProductGiftCardFilterParam = (productKind?: string) => {
  if (productKind === undefined || !isInEnum(productKind, ProductKlassKind)) {
    return null;
  }

  return productKind === ProductKlassKind.GiftCard;
};
