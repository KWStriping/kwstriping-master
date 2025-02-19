import * as m from '@paraglide/messages';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export const NotAvailable: FC = () => {
  return (
    <CardContent>
      <Typography variant="caption">
        {m.dashboard_oItemsAvailable() ?? 'This variant is not available at any of the channels'}
      </Typography>
    </CardContent>
  );
};
