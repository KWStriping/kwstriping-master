import * as m from '@paraglide/messages';
import type { CheckoutFragment } from '@tempo/api/generated/graphql';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { notNullable } from '@tempo/ui/utils/money';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import { CartSummary } from '@tempo/checkout/components/CartSummary';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';
import { CheckoutProductList } from './CheckoutProductList';

interface CheckoutSidebarProps {
  checkout: Maybe<CheckoutFragment>;
}

export function CheckoutSidebar({ checkout }: CheckoutSidebarProps) {
  const { displayPrices: initiallyDisplayPrices } = useShopSettings();
  const lines = checkout?.lines?.filter(notNullable) || [];
  const displayPrices = initiallyDisplayPrices || !checkout?.validationErrors.length;
  return (
    <section className={'grow'}>
      <Typography variant={'h2'} className="font-semibold">
        {m.checkout_orderSummary() ?? 'Order summary'}
      </Typography>
      <CheckoutProductList lines={lines} token={checkout?.id} displayPrices={displayPrices} />
      {displayPrices ? (
        <CartSummary checkout={checkout} />
      ) : (
        <div className={'flex items-center'}>
          <Typography className={'grow'}>
            {
              'Prices will be displayed after your contact information and job details are collected.'
            }
          </Typography>
          <IconButton title={'(There are reasons for this.)'}>
            <InfoIcon />
          </IconButton>
        </div>
      )}
    </section>
  );
}

export default CheckoutSidebar;
