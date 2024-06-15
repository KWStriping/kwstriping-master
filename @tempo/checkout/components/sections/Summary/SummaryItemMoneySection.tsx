import * as m from '@paraglide/messages';
import type { OrderLineFragment } from '@tempo/api/generated/graphql';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { SummaryItemMoneyInfo } from '@tempo/checkout/components/sections/Summary/SummaryItemMoneyInfo';
import { summaryMessages } from './messages';

interface LineItemQuantitySelectorProps {
  line: Maybe<OrderLineFragment>;
}

export const SummaryItemMoneySection: FC<LineItemQuantitySelectorProps> = ({ line }) => {
  return (
    <div className="flex flex-col items-end">
      <Typography>{`${m.checkout_quantity() ?? summaryMessages.quantity.defaultMessage}: ${
        line.quantity
      }`}</Typography>
      <SummaryItemMoneyInfo {...line} undiscountedUnitPrice={line.undiscountedUnitPrice.gross} />
    </div>
  );
};
