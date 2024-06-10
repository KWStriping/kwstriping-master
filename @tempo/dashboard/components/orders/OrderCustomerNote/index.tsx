import * as m from '@paraglide/messages';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface OrderCustomerNoteProps {
  note: Maybe<string>;
}

export const OrderCustomerNote: FC<OrderCustomerNoteProps> = ({ note }) => {
  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_uALFo() ?? 'Notes'
          // notes about customer, header
        }
      />
      <CardContent>
        {note === undefined ? (
          <Skeleton />
        ) : note === '' ? (
          <Typography color="textSecondary">
            {m.dashboard_rFy_e() ?? 'No notes from customer'}
          </Typography>
        ) : (
          <Typography>{note}</Typography>
        )}
      </CardContent>
    </Card>
  );
};
export default OrderCustomerNote;
