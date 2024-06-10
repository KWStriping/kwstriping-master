import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface OrderCustomerNoteProps {
  note: Maybe<string>;
}

export const OrderCustomerNote: FC<OrderCustomerNoteProps> = ({ note }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.uALFo',
          'Notes'
          // notes about customer, header
        )}
      />
      <CardContent>
        {note === undefined ? (
          <Skeleton />
        ) : note === '' ? (
          <Typography color="textSecondary">
            {t('dashboard.rFy8e', 'No notes from customer')}
          </Typography>
        ) : (
          <Typography>{note}</Typography>
        )}
      </CardContent>
    </Card>
  );
};
export default OrderCustomerNote;
