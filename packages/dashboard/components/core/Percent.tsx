import { useRouter } from 'next/router';
import type { FC } from 'react';

interface PercentProps {
  amount: number;
}

const Percent: FC<PercentProps> = ({ amount }) => {
  const { locale = 'en-US' } = useRouter(); // TODO: use default locale
  return (
    <>
      {amount
        ? (amount / 100).toLocaleString(locale, {
            maximumFractionDigits: 2,
            style: 'percent',
          })
        : '-'}
    </>
  );
};
Percent.displayName = 'Percent';
export default Percent;
