import type { CheckoutFragment } from '@core/api';
import { useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton';
import { notNullable } from '@core/ui/utils/money';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import { CartSummary } from '@core/checkout/components/CartSummary';
import { useShopSettings } from '@core/ui/providers/ShopSettingsProvider';
import { CheckoutProductList } from './CheckoutProductList';

interface CheckoutSidebarProps {
  checkout: Maybe<CheckoutFragment>;
}

export function CheckoutSidebar({ checkout }: CheckoutSidebarProps) {
  const { t } = useTranslation();
  const { displayPrices: initiallyDisplayPrices } = useShopSettings();
  const lines = checkout?.lines?.filter(notNullable) || [];
  const displayPrices = initiallyDisplayPrices || !checkout?.validationErrors.length;
  return (
    <section className={'grow'}>
      <Typography variant={'h2'} className="font-semibold">
        {t('checkout.orderSummary', 'Order summary')}
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
