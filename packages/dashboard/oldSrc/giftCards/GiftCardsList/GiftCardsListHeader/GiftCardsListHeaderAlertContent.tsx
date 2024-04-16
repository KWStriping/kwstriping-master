import { useTranslation, Trans } from '@core/i18n';
import Link from '@core/ui/components/Link';
import type { FC } from 'react';
import { giftCardsListHeaderMenuItemsMessages as messages } from '../messages';
import { ProductKlassKind } from '@core/api/constants';
import { productKlassAddUrl } from '@dashboard/oldSrc/productKlasses/urls';

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
  const { t } = useTranslation();

  const createGiftCardGiftCardProductUrl = '/products/add';

  if (!giftCardProductKlassesExist) {
    return (
      <Trans
        {...messages.noGiftCardsProductKlasses}
        values={{
          createGiftCardProductKlass: (
            <Link href={giftCardProductKlassUrl} className={styles.alertLink ?? ''}>
              {t(
                'dashboard.createGiftCardProductKlass',
                messages.createGiftCardProductKlass.defaultMessage
              )}
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
              {t(
                'dashboard.createGiftCardProduct',
                messages.createGiftCardProduct.defaultMessage
              )}
            </Link>
          ),
        }}
      />
    );
  }

  return null;
};

export default GiftCardsListHeaderAlertContent;
