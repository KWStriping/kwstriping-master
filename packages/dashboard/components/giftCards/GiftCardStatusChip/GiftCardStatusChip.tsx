import { useTranslation } from '@core/i18n';
import { Pill } from '@core/ui/components/pill/Pill';
import type {
  ExtendedGiftCard,
  GiftCardBase,
} from '@dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardDetailsProvider/types';

interface GiftCardStatusChipProps<
  T extends ExtendedGiftCard<GiftCardBase & { isActive: boolean }>
> {
  giftCard: T;
}

function GiftCardStatusChip<T extends ExtendedGiftCard<GiftCardBase & { isActive: boolean }>>({
  giftCard,
}: GiftCardStatusChipProps<T>) {
  const { isExpired, isActive } = giftCard;
  const { t } = useTranslation();

  if (isExpired) {
    return <Pill color="info" label={t('dashboard.expiredStatusLabel', 'Expired')} />;
  }

  if (!isActive) {
    return <Pill color="error" label={t('dashboard.disabledStatusLabel', 'Disabled')} />;
  }

  return null;
}

export default GiftCardStatusChip;
