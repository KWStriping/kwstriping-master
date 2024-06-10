import * as m from '@paraglide/messages';
import { useTranslation, Trans } from '@tempo/next/i18n';
import Link from '@tempo/ui/components/Link';
import type { FC } from 'react';
import { giftCardsListHeaderMenuItemsMessages as messages } from '../messages';
import { ProductKlassKind } from '@tempo/api/generated/constants';
import { productKlassAddUrl } from '@tempo/dashboard/oldSrc/productKlasses/urls';

interface GiftCardsListHeaderAlertContentProps {
  giftCardProductKlassesExist: boolean;
  giftCardProductsExist: boolean;
}

const GiftCardsListHeaderAlertContent: FC<GiftCardsListHeaderAlertContentProps> = ({
  giftCardProductKlassesExist,
  giftCardProductsExist,
}) => {
  const giftCardProductKlassUrl = productKlassAddUrl({
    kind: ProductKlassKind.GiftCard,
  });

  const createGiftCardGiftCardProductUrl = '/products/add';

  if (!giftCardProductKlassesExist) {
    return (
      <Trans
        {...messages.noGiftCardsProductKlasses}
        values={{
          createGiftCardProductKlass: (
            <Link href={giftCardProductKlassUrl} className={styles.alertLink ?? ''}>
              {m.dashboard_createGiftCardProductKlass() ??
                messages.createGiftCardProductKlass.defaultMessage}
            </Link>
          ),
        }}
      />
    );
  }

  if (!giftCardProductsExist) {
    return (
      <Trans
        {...messages.noGiftCardsProducts}
        values={{
          createGiftCardProduct: (
            <Link href={createGiftCardGiftCardProductUrl} className={styles.alertLink ?? ''}>
              {m.dashboard_createGiftCardProduct() ??
                messages.createGiftCardProduct.defaultMessage}
            </Link>
          ),
        }}
      />
    );
  }

  return null;
};

export default GiftCardsListHeaderAlertContent;
