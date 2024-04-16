import Money from '@dashboard/components/core/Money';
import DiscountedPrice from '@dashboard/components/discounts/DiscountedPrice';
import type { SearchOrderVariantQuery } from '@core/api/graphql';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface OrderPriceLabelProps {
  pricing: SearchOrderVariantQuery['search']['edges'][0]['node']['variants'][0]['pricing'];
}

const OrderPriceLabel: FC<OrderPriceLabelProps> = ({ pricing }) => {
  if (pricing.onSale) {
    const { price, priceUndiscounted } = pricing;
    return (
      <div className={styles.percentDiscountLabelContainer ?? ''}>
        <DiscountedPrice discountedPrice={price.gross} regularPrice={priceUndiscounted.gross} />
      </div>
    );
  }

  return (
    <Typography align="right">
      <Money money={pricing.priceUndiscounted.gross} />
    </Typography>
  );
};

export default OrderPriceLabel;
