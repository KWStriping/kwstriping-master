import { CheckoutRemovePromoCodeDocument } from '@core/api';
import { useTranslation } from '@core/i18n';
import { IconButton } from '@core/ui/components/buttons/IconButton';
import { useMutation } from '@core/urql/hooks/useMutation';
import ClearIcon from '@mui/icons-material/Clear';
import type { FC } from 'react';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';
import { summaryLabels } from './messages';
import { SummaryMoneyRow } from './SummaryMoneyRow';
import type { SummaryMoneyRowProps } from './SummaryMoneyRow';

interface SummaryPromoCodeRowProps extends SummaryMoneyRowProps {
  promoCode?: string;
  promoCodeId?: string;
  editable: boolean;
}

export const SummaryPromoCodeRow: FC<SummaryPromoCodeRowProps> = ({
  promoCode,
  promoCodeId,
  editable,
  ...rest
}) => {
  const { checkout } = useCheckout();
  const { t } = useTranslation();
  const [removePromoCodeFromCheckout] = useMutation(CheckoutRemovePromoCodeDocument);

  const onDelete = () => {
    if (!checkout?.id) return;
    const variables = promoCode
      ? { promoCode: promoCode }
      : { promoCodeId: promoCodeId as string };
    void removePromoCodeFromCheckout({
      id: checkout.id,
      languageCode: 'EN_US', // TODO
      ...variables,
    });
  };

  return (
    <SummaryMoneyRow {...rest}>
      {editable && (
        <IconButton
          color="secondary"
          onClick={onDelete}
          aria-label={t(
            summaryLabels.removeDiscount.id,
            summaryLabels.removeDiscount.defaultMessage
          )}
        >
          <ClearIcon />
        </IconButton>
      )}
    </SummaryMoneyRow>
  );
};
