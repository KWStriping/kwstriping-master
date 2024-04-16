import { useTranslation } from '@core/i18n';
import type { FC } from 'react';

interface OrderAlertsProps {
  alertsHeader?: string;
  alerts: Array<string | MessageDescriptor>;
}

export const OrderAlerts: FC<OrderAlertsProps> = ({ alertsHeader, alerts }) => {
  const { t } = useTranslation();

  const formattedAlerts = alerts.map((alert, index) => {
    if (typeof alert === 'string') {
      return { id: `${index}_${alert}`, text: alert };
    }
    return {
      id: alert.id,
      text: t(alert),
    };
  });

  if (!formattedAlerts.length) return null;

  if (formattedAlerts.length === 1) {
    return <>{formattedAlerts[0].text}</>;
  }

  return (
    <>
      {!!alertsHeader && alertsHeader}
      <ul>
        {formattedAlerts.map((alert) => (
          <li key={alert.id}>{alert.text}</li>
        ))}
      </ul>
    </>
  );
};
OrderAlerts.displayName = 'OrderAlerts';
export default OrderAlerts;
