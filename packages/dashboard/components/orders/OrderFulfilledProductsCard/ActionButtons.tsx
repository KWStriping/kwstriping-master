import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { FulfillmentStatus } from '@core/api/constants';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
// import useStyles from './styles';

interface ActionButtonsProps {
  status: FulfillmentStatus;
  trackingNumber?: string;
  orderIsPaid?: boolean;
  fulfillmentAllowUnpaid: boolean;
  onTrackingCodeAdd: () => void;
  onRefund: () => void;
  onApprove: () => void;
}

const statusesToShow = [
  FulfillmentStatus.Fulfilled,
  FulfillmentStatus.Returned,
  FulfillmentStatus.WaitingForApproval,
];

const ActionButtons: FC<ActionButtonsProps> = ({
  status,
  trackingNumber,
  orderIsPaid,
  fulfillmentAllowUnpaid,
  onTrackingCodeAdd,
  onRefund,
  onApprove,
}) => {
  const hasTrackingNumber = !!trackingNumber;
  const { t } = useTranslation();
  // const styles = useStyles({});

  const styles = {};

  if (!statusesToShow.includes(status)) return null;

  if (status === FulfillmentStatus.WaitingForApproval) {
    const cannotFulfill = !orderIsPaid && !fulfillmentAllowUnpaid;

    return (
      <CardActions className={styles.actions ?? ''}>
        <Button color="primary" onClick={onApprove} disabled={cannotFulfill}>
          {t('dashboard.approve', 'Approve')}
        </Button>
        {cannotFulfill && (
          <Typography color="error" variant="caption">
            {t('dashboard.cannotFulfillUnpaidOrder', 'Can’t fulfill until payment is captured')}
          </Typography>
        )}
      </CardActions>
    );
  }

  if (status === FulfillmentStatus.Returned) {
    return (
      <CardActions>
        <Button color="primary" onClick={onRefund}>
          {t('dashboard.refund', 'Refund')}
        </Button>
      </CardActions>
    );
  }

  return hasTrackingNumber ? (
    <CardActions className={styles.actions ?? ''}>
      <Button color="primary" onClick={onTrackingCodeAdd}>
        {t('dashboard.editTracking', 'Edit tracking')}
      </Button>
    </CardActions>
  ) : (
    <CardActions className={styles.actions ?? ''}>
      <Button color="primary" onClick={onTrackingCodeAdd}>
        {t('dashboard.addTracking', 'Add tracking')}
      </Button>
    </CardActions>
  );
};

export default ActionButtons;
