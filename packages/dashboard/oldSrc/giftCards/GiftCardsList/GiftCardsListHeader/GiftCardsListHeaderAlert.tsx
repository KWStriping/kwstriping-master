import { useTranslation } from '@core/i18n';
import { Alert } from '@core/ui/components/Alert';
import type { FC } from 'react';

import { giftCardsListHeaderMenuItemsMessages as messages } from '../messages';
import GiftCardsListHeaderAlertContent from './GiftCardsListHeaderAlertContent';

const GiftCardsListHeaderAlert: FC = () => {
  const { t } = useTranslation();

  const { data: giftCardProductsCount, loading: giftCardProductsCountLoading } = useQuery(
    GiftCardProductsCountDocument,
    {}
  );

  const giftCardProductKlassesExist = giftCardProductsCount?.giftCardProductKlasses.totalCount > 0;
  const giftCardProductsExist = giftCardProductsCount?.giftCardProducts.totalCount > 0;

  const showNoGiftCardProductsAlert =
    !giftCardProductsCountLoading && (!giftCardProductKlassesExist || !giftCardProductsExist);

  if (showNoGiftCardProductsAlert) {
    return (
      <Alert
        title={t('dashboard.oGiftCardsAlertTitle', messages.noGiftCardsAlertTitle.defaultMessage)}
        variant="warning"
        close={false}
      >
        <GiftCardsListHeaderAlertContent
          giftCardProductKlassesExist={giftCardProductKlassesExist}
          giftCardProductsExist={giftCardProductsExist}
        />
      </Alert>
    );
  }

  return null;
};

export default GiftCardsListHeaderAlert;
