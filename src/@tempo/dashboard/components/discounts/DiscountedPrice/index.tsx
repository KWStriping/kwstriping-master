import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import styles from './index.module.css';
import Money from '@tempo/dashboard/components/core/Money';
import type { IMoney } from '@tempo/dashboard/components/core/Money';

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
