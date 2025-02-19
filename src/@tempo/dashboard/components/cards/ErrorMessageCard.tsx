import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
interface ErrorMessageCardProps {
  message: string;
}

const ErrorMessageCard: FC<ErrorMessageCardProps> = ({ message }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="h2">
        <>
          {/* header */}

          {m.dashboard_v_oBd() ?? 'Error'}
        </>
      </Typography>
      <Typography variant="body1">{message}</Typography>
    </CardContent>
  </Card>
);
ErrorMessageCard.displayName = 'ErrorMessageCard';
export default ErrorMessageCard;
