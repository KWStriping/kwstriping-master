import type { Money as MoneyType } from '@core/api';
import { useTranslation } from '@core/i18n';
import type { ClassNames } from '@core/types';
import type { GrossMoney } from '@core/types/misc';
import { Money } from '@core/ui/components/Money';
import { getFormattedMoney } from '@core/ui/utils/money';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import { summaryLabels, summaryMessages } from './messages';

interface SummaryItemMoneyInfoProps {
  classNames?: ClassNames<'container'>;
  unitPrice: GrossMoney;
  undiscountedUnitPrice: MoneyType;
  quantity: number;
}

export const SummaryItemMoneyInfo: FC<SummaryItemMoneyInfoProps> = ({
  unitPrice,
  quantity,
  undiscountedUnitPrice,
  classNames = {},
}) => {
  const { t } = useTranslation();
  const multiplePieces = quantity > 1;
  const piecePrice = unitPrice.gross;
  const onSale = undiscountedUnitPrice.amount !== unitPrice.gross.amount;

  return (
    <>
      <div className={clsx('flex flex-row', classNames.container)}>
        {onSale && (
          <Money
            aria-label={t(
              summaryLabels.undiscountedPrice.id,
              summaryLabels.undiscountedPrice.defaultMessage
            )}
            money={{
              currency: undiscountedUnitPrice.currency,
              amount: undiscountedUnitPrice.amount * quantity,
            }}
            className="line-through mr-1"
          />
        )}
        <Money
          aria-label={t(summaryLabels.totalPrice.id, summaryLabels.totalPrice.defaultMessage)}
          money={{
            currency: piecePrice?.currency,
            amount: (piecePrice?.amount || 0) * quantity,
          }}
          className={clsx('bold', onSale && '!text-text-error')}
        />
      </div>

      {multiplePieces && (
        <Typography
          aria-label={t(
            summaryLabels.singlePiecePrice.id,
            summaryLabels.singlePiecePrice.defaultMessage
          )}
          // size="sm"
          // color="secondary"
          className="ml-4"
        >
          {`${getFormattedMoney(piecePrice)} ${t(
            summaryMessages.each.id,
            summaryMessages.each.defaultMessage
          )}`}
        </Typography>
      )}
    </>
  );
};
