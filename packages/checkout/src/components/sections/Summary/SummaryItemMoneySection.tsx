import type { OrderLineFragment } from '@core/api';
import { useTranslation } from '@core/i18n';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { SummaryItemMoneyInfo } from '@core/checkout/components/sections/Summary/SummaryItemMoneyInfo';
import { summaryMessages } from './messages';

interface LineItemQuantitySelectorProps {
  line: Maybe<OrderLineFragment>;
}

export const SummaryItemMoneySection: FC<LineItemQuantitySelectorProps> = ({ line }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-end">
      <Typography>{`${t('checkout.quantity', summaryMessages.quantity.defaultMessage)}: ${
        line.quantity
      }`}</Typography>
      <SummaryItemMoneyInfo {...line} undiscountedUnitPrice={line.undiscountedUnitPrice.gross} />
    </div>
  );
};
