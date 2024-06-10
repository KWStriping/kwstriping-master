import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import RadioGroupField from '@tempo/dashboard/components/fields/RadioGroupField';
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

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_qAJCT() ?? 'Refund Order'
          // section header
        }
      />
      <CardContent className={styles.cartContent ?? ''}>
        <RadioGroupField
          choices={[
            {
              label: m.dashboard_refundProducts() ?? 'Refund Products',
              value: OrderRefundType.ProductS,
            },
            {
              label: m.dashboard_refundMiscellaneous() ?? 'Miscellaneous Refund',
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
