import clsx from 'clsx';
import type { FC } from 'react';
import styles from './index.module.css';
import { useLocale } from '@tempo/ui/hooks/useLocale';

// const useStyles = makeStyles(
//   {
//     root: {
//       fontWeight: 500,
//     },
//     currency: {
//       fontSize: '0.87em',
//       marginRight: '0.2rem',
//     },
//   },
//   { name: 'Money' }
// );

export interface IMoney {
  amount: number;
  currency: string;
}

export interface MoneyProps {
  money: IMoney | null;
  className?: string;
}

export const Money: FC<MoneyProps> = ({ money, className }) => {
  const { locale } = useLocale();
  if (!money) return null;

  const currencyFractionDigits = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
  }).resolvedOptions().maximumFractionDigits;

  const amount = money.amount.toLocaleString(locale, {
    maximumFractionDigits: currencyFractionDigits,
    minimumFractionDigits: currencyFractionDigits,
  });

  return (
    <span className={clsx(styles.root, className)}>
      <span className={styles.currency ?? ''}>{money.currency}</span>
      {amount}
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
