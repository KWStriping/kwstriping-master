import type {
  RemovePromoCodeFromCheckoutMutation,
  RemovePromoCodeFromCheckoutMutationVariables,
} from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import { RemovePromoCodeFromCheckoutDocument } from '@tempo/api/generated/graphql';
import { IconButton } from '@tempo/ui/components/buttons/IconButton';
import { useMutation } from '@tempo/api/hooks/useMutation';
import ClearIcon from '@mui/icons-material/Clear';
import type { FC } from 'react';
import { summaryLabels } from './messages';
import { SummaryMoneyRow } from './SummaryMoneyRow';
import type { SummaryMoneyRowProps } from './SummaryMoneyRow';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';

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
  const [removePromoCodeFromCheckout] = useMutation(RemovePromoCodeFromCheckoutDocument);

  const onDelete = () => {
    if (!checkout?.id) return;
    const variables = promoCode
      ? { promoCode: promoCode }
      : { promoCodeId: promoCodeId as string };
    void removePromoCodeFromCheckout({
      id: checkout.id,
      // languageCode: 'EN_US', // TODO
      ...variables,
    });
  };

  return (
    <SummaryMoneyRow {...rest}>
      {editable && (
        <IconButton
          color="secondary"
          onClick={onDelete}
          aria-label={
            m[summaryLabels.removeDiscount.id] ?? summaryLabels.removeDiscount.defaultMessage
          }
        >
          <ClearIcon />
        </IconButton>
      )}
    </SummaryMoneyRow>
  );
};
