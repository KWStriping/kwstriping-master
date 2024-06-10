import { useTranslation } from '@core/i18n';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export const NotAvailable: FC = () => {
  const { t } = useTranslation();

  return (
    <CardContent>
      <Typography variant="caption">
        {t('dashboard.oItemsAvailable', 'This variant is not available at any of the channels')}
      </Typography>
    </CardContent>
  );
};
