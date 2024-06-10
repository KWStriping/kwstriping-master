import * as m from '@paraglide/messages';
import { Pill } from '@tempo/ui/components/pill/Pill';
import type {
  ExtendedGiftCard,
  GiftCardBase,
} from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/providers/GiftCardDetailsProvider/types';

interface GiftCardStatusChipProps<
  T extends ExtendedGiftCard<GiftCardBase & { isActive: boolean }>,
> {
  giftCard: T;
}

function GiftCardStatusChip<T extends ExtendedGiftCard<GiftCardBase & { isActive: boolean }>>({
  giftCard,
}: GiftCardStatusChipProps<T>) {
  const { isExpired, isActive } = giftCard;

  if (isExpired) {
    return <Pill color="info" label={m.dashboard_expiredStatusLabel() ?? 'Expired'} />;
  }

  if (!isActive) {
    return <Pill color="error" label={m.dashboard_disabledStatusLabel() ?? 'Disabled'} />;
  }

  return null;
}

export default GiftCardStatusChip;
