export const formatAsMoney = (amount = 0, currency = 'USD', locale = 'en-US') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);

// Returns true for non nullable values
export function notNullable<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export type Money = {
  currency: string;
  amount: number;
} | null;

export const getFormattedMoney = <TMoney extends Money>(
  money: TMoney | undefined | null,
  negative = false
) => {
  if (!money) {
    return '';
  }

  const { amount, currency } = money;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  }).format(negative ? -amount : amount);
};
