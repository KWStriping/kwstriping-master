import type { IMoney } from '@dashboard/components/core/Money';
import Money from '@dashboard/components/core/Money';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import styles from './index.module.css';

interface DiscountedPriceProps {
  regularPrice: IMoney;
  discountedPrice: IMoney;
}

const DiscountedPrice: FC<DiscountedPriceProps> = ({ regularPrice, discountedPrice }) => {
  return (
    <>
      <Typography className={styles.strike ?? ''}>
        <Money money={regularPrice} />
      </Typography>
      <Money money={discountedPrice} />
    </>
  );
};

export default DiscountedPrice;
