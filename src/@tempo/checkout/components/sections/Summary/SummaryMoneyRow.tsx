import type { MoneyProps } from '@tempo/ui/components/Money';
import { Money } from '@tempo/ui/components/Money';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';

export interface SummaryMoneyRowProps extends MoneyProps {
  label: string;
  children?: ReactNode;
}

export const SummaryMoneyRow: FC<SummaryMoneyRowProps> = ({ label, children, ...moneyProps }) => {
  return (
    <div className="summary-row mb-2">
      <div className="flex flex-row items-center">
        <Typography color="secondary">{label}</Typography>
        {children}
      </div>
      <Money {...moneyProps} />
    </div>
  );
};
