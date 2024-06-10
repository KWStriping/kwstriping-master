import * as m from '@paraglide/messages';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';

import useGiftCardDetails from '../providers/GiftCardDetailsProvider/hooks/useGiftCardDetails';
import { updateGiftCardDetailsCardMessages as messages } from './messages';
import Money from '@tempo/dashboard/components/core/Money';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
// import { useGiftCardDetailsBalanceStyles as useStyles } from "./styles";

const GiftCardUpdateDetailsBalanceSection: FC = () => {
  const {
    giftCard: { currentBalance, initialBalance },
  } = useGiftCardDetails();

  const progressBarWidth = currentBalance.amount
    ? Math.floor((currentBalance.amount / initialBalance.amount) * 100)
    : 0;

  return (
    <>
      <div className={clsx(styles.labelsContainer, styles.wideContainer)}>
        <Typography>
          {m.dashboard_cardBalanceLabel() ?? messages.cardBalanceLabel.defaultMessage}
        </Typography>
        <Typography className={styles.labelsContainer ?? ''}>
          <Money money={currentBalance} />
          <Typography component="span" color="textSecondary">
            <Money money={initialBalance} />
          </Typography>
        </Typography>
      </div>
      <CardSpacer />
      <div className={styles.balanceBar ?? ''}>
        <div
          style={{ width: `${progressBarWidth}%` }}
          className={styles.balanceBarProgress ?? ''}
        />
      </div>
    </>
  );
};

export default GiftCardUpdateDetailsBalanceSection;
