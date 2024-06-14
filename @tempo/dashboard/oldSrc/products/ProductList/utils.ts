import * as m from '@paraglide/messages';
import { isInEnum } from '@tempo/utils/enums';
import { ProductKlassKind } from '@tempo/api/generated/constants';

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
          label: (m.dashboard_giftCardLabel() ?? 'Gift Card'),
        };
      case ProductKlassKind.Normal:
        return {
          ...kind,
          label: (m.dashboard_normalLabel() ?? 'Normal'),
        };
      default:
        return {
          ...kind,
          label: (m.dashboard_normalLabel() ?? 'Normal'),
        };
    }
  });

export const getProductGiftCardFilterParam = (productKind?: string) => {
  if (productKind === undefined || !isInEnum(productKind, ProductKlassKind)) {
    return null;
  }

  return productKind === ProductKlassKind.GiftCard;
};
