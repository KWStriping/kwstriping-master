import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import RadioGroupField from '@dashboard/components/fields/RadioGroupField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { ChangeEvent, FC } from 'react';
import type { OrderRefundFormData } from '../OrderRefundPage/form';
import { OrderRefundType } from '../OrderRefundPage/form';

const useStyles = makeStyles(
  {
    cartContent: { paddingBottom: 0 },
  },
  { name: 'OrderRefund' }
);

interface OrderRefundProps {
  data: OrderRefundFormData;
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const messages = {
  refundMiscellaneous: {
    id: 'LKpQYh',
    defaultMessage: 'Miscellaneous Refund',
    description: 'refund type',
  },
  refundProducts: {
    id: 'CLB1k9',
    defaultMessage: 'Refund Products',
    description: 'refund type',
  },
};

const OrderRefund: FC<OrderRefundProps> = (props) => {
  const { data, disabled, onChange } = props;
  const styles = useStyles(props);
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.qAJCT',
          'Refund Order'
          // section header
        )}
      />
      <CardContent className={styles.cartContent ?? ''}>
        <RadioGroupField
          choices={[
            {
              label: t('dashboard.refundProducts', 'Refund Products'),
              value: OrderRefundType.ProductS,
            },
            {
              label: t('dashboard.refundMiscellaneous', 'Miscellaneous Refund'),
              value: OrderRefundType.Miscellaneous,
            },
          ]}
          disabled={disabled}
          name={'type' as keyof FormData}
          value={data?.type}
          onChange={onChange}
          variant="inline"
        />
      </CardContent>
    </Card>
  );
};
OrderRefund.displayName = 'OrderRefund';
export default OrderRefund;
