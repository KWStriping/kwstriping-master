import * as m from '@paraglide/messages';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import type { IMoney } from './Money';
import { formatMoney, formatMoneyRange } from './Money';

export interface MoneyRangeProps {
  from?: IMoney;
  to?: IMoney;
}

export const MoneyRange: FC<MoneyRangeProps> = ({ from, to }) => {
  const { locale = 'en-US' } = useRouter(); // TODO: use default locale
  return (
    <>
      {from && to
        ? from.amount === to.amount
          ? formatMoney(from, locale)
          : formatMoneyRange(from, to, locale)
        : from && !to
          ? m.dashboard_W_uJO({
              money: formatMoney(from, locale),
            }) ?? 'from {{money}}'
          : !from && to
            ? m.dashboard_ptDxW({
                money: formatMoney(to, locale),
              }) ?? 'to {{money}}'
            : '-'}
    </>
  );
};

MoneyRange.displayName = 'MoneyRange';
export default MoneyRange;
