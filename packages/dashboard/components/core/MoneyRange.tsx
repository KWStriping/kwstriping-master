import { useTranslation } from '@core/i18n';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import type { IMoney } from './Money';
import { formatMoney, formatMoneyRange } from './Money';

export interface MoneyRangeProps {
  from?: IMoney;
  to?: IMoney;
}

export const MoneyRange: FC<MoneyRangeProps> = ({ from, to }) => {
  const { t } = useTranslation();
  const { locale = 'en-US' } = useRouter(); // TODO: use default locale
  return (
    <>
      {from && to
        ? from.amount === to.amount
          ? formatMoney(from, locale)
          : formatMoneyRange(from, to, locale)
        : from && !to
        ? t('dashboard.W5uJO', 'from {{money}}', {
            money: formatMoney(from, locale),
          })
        : !from && to
        ? t('dashboard.ptDxW', 'to {{money}}', {
            money: formatMoney(to, locale),
          })
        : '-'}
    </>
  );
};

MoneyRange.displayName = 'MoneyRange';
export default MoneyRange;
