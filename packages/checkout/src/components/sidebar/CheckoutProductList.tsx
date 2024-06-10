import type { CheckoutLineFragment } from '@core/api';
import { CheckoutLineDeleteDocument } from '@core/api';
import { useTranslation } from '@core/i18n';
import Button from '@core/ui/components/buttons/Button';
import { useLocalization } from '@core/ui/providers/LocalizationProvider';
import { useShopSettings } from '@core/ui/providers/ShopSettingsProvider';
import { translate } from '@core/ui/utils/translations';
import { useMutation } from '@core/urql/hooks/useMutation';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export interface CheckoutProductListProps {
  lines: CheckoutLineFragment[];
  token: Maybe<string>;
  displayPrices?: boolean;
}

export function CheckoutProductList({
  lines,
  token,
  displayPrices = true,
}: CheckoutProductListProps) {
  const { t } = useTranslation();
  const { query, formatPrice } = useLocalization();
  const [removeProductFromCheckout] = useMutation(CheckoutLineDeleteDocument);
  const { displayProductImages } = useShopSettings();
  return (
    <ul className="flex-auto p-0">
      {lines.map((line, index) => {
        if (!line) return null;
        return (
          <li key={index} className="flex items-center space-x-4 border-x-0">
            {displayProductImages && (
              <div className="bg-white w-32 h-32 object-center object-cover rounded-md relative">
                {line.product?.thumbnail && (
                  <Image
                    src={line.product?.thumbnail?.url}
                    alt={line.product?.thumbnail?.alt || ''}
                    fill
                  />
                )}
              </div>
            )}

            <div className="flex grow justify-between py-2">
              <div>
                <Typography variant={'h3'} className={'text-md'}>
                  {translate(line.product, 'name')}
                </Typography>
                {/* <Typography className="text-gray-500 text-sm mt-1">
                  {translate(line.variant, 'name')}
                </Typography> */}
                {displayPrices && (
                  <p className="text-gray-900">{formatPrice(line.totalPrice.gross)}</p>
                )}
              </div>
              <Button
                type="button"
                variant={'text'}
                className="text-sm text-blue font-medium self-center"
                onClick={() => {
                  if (!token) return;
                  removeProductFromCheckout({
                    checkoutId: token,
                    lineId: line.id,
                    // languageCode: query.languageCode,
                  });
                }}
              >
                {t('checkout.ui.removeButton', 'Remove')}
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
