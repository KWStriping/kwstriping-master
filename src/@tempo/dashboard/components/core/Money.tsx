import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

export interface IMoney {
  amount: number;
  currency: string;
}

export interface MoneyProps {
  money: Maybe<Partial<IMoney>>;
}

export const Money: FC<MoneyProps> = ({ money }) => {
  const { locale } = useRouter();
  if (!money?.currency ?? !money?.amount) return <Skeleton />;

  const currencyFractionDigits = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
  }).resolvedOptions().maximumFractionDigits;

  const amount = money.amount.toLocaleString(locale, {
    maximumFractionDigits: currencyFractionDigits,
    minimumFractionDigits: currencyFractionDigits,
  });

  return (
    <span className={'inline-flex gap-1 items-end'}>
      <span className={'font-normal text-sm self-end'}>{money.currency}</span>
      <span className={'font-semibold'}>{amount}</span>
    </span>
  );
};

Money.displayName = 'Money';
export default Money;

export function addMoney(init: IMoney, ...args: IMoney[]): IMoney {
  return {
    amount: args.reduce((acc, curr) => acc + curr.amount, init.amount),
    currency: init.currency,
  };
}
export function subtractMoney(init: IMoney, ...args: IMoney[]): IMoney {
  return {
    amount: args.reduce((acc, curr) => acc - curr.amount, init.amount),
    currency: init.currency,
  };
}

export const formatMoney = (money: IMoney, locale: string) => {
  try {
    return Intl.NumberFormat(locale, {
      style: 'currency',
      currency: money.currency,
    }).format(money.amount);
  } catch (error) {
    return `${money.amount} ${money.currency}`;
  }
};

export const formatMoneyRange = (moneyFrom: IMoney, moneyTo: IMoney, locale: string) => {
  try {
    return Intl.NumberFormat(locale, {
      style: 'currency',
      currency: moneyFrom.currency,
    }).formatRange(moneyFrom.amount, moneyTo.amount);
  } catch (error) {
    const formattedMoneyFrom = formatMoney(moneyFrom, locale);
    const formattedMoneyTo = formatMoney(moneyTo, locale);
    return `${formattedMoneyFrom} - ${formattedMoneyTo}`;
  }
};
