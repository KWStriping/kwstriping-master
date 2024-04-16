import { useTranslation } from '@core/i18n';
import Grid from '@core/ui/components/Grid';
import type {
  OrderSettingsFragment,
  ShopOrderSettingsFragment,
} from '@core/api/graphql';
import useForm from '@dashboard/hooks/useForm';
import type { CommonUseFormResult, SubmitPromise } from '@dashboard/hooks/useForm';
import useHandleFormSubmit from '@dashboard/hooks/useHandleFormSubmit';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import OrderFulfillmentSettings from '@dashboard/components/orders/OrderFulfillmentSettings';
import OrderSettings from '../OrderSettings';

export interface OrderSettingsFormData {
  autoConfirmAllNewOrders: boolean;
  autoApproveFulfillment: boolean;
  fulfillmentAllowUnpaid: boolean;
  autoFulfillNonShippableGiftCard: boolean;
}

export type UseOrderSettingsFormResult = CommonUseFormResult<OrderSettingsFormData>;
export interface OrderSettingsFormProps {
  disabled: boolean;
}

function getOrderSettingsFormData(
  orderSettings: OrderSettingsFragment,
  shop: ShopOrderSettingsFragment
): OrderSettingsFormData {
  return {
    autoFulfillNonShippableGiftCard:
      orderSettings?.autoFulfillNonShippableGiftCard,
    autoConfirmAllNewOrders: orderSettings?.autoConfirmAllNewOrders,
    autoApproveFulfillment: shop?.autoApproveFulfillment,
    fulfillmentAllowUnpaid: shop?.fulfillmentAllowUnpaid,
  };
}

export function useOrderSettingsForm(
  orderSettings: OrderSettingsFragment,
  shop: ShopOrderSettingsFragment,
  onSubmit: (data: OrderSettingsFormData) => SubmitPromise,
  disabled: boolean
): UseOrderSettingsFormResult {
  const { data, handleChange, formId, setIsSubmitDisabled } = useForm(
    getOrderSettingsFormData(orderSettings, shop),
    undefined,
    { confirmLeave: true }
  );

  const handleFormSubmit = useHandleFormSubmit({
    formId,
    onSubmit,
  });

  const submit = () => handleFormSubmit(data);
  setIsSubmitDisabled(disabled);

  return {
    change: handleChange,
    data,
    submit,
    isSaveDisabled: disabled,
  };
}

const OrderSettingsForm: FC<OrderSettingsFormProps & ReturnType<typeof useOrderSettingsForm>> = ({
  disabled,
  data,
  submit,
  change,
}) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={submit}>
      <Grid variant="inverted">
        <Typography>{t('dashboard.generalSettings', 'General Settings')}</Typography>
        <OrderSettings data={data} disabled={disabled} onChange={change} />
        <div />
        <OrderFulfillmentSettings data={data} disabled={disabled} onChange={change} />
      </Grid>
    </form>
  );
};

OrderSettingsForm.displayName = 'OrderSettingsForm';
export default OrderSettingsForm;
