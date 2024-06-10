import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { FC } from 'react';

const messages = {
  title: {
    id: 'CT5PAn',
    defaultMessage: 'Availability',
    description: 'CannotDefineChannelsAvailabilityCard title',
  },
  subtitle: {
    id: '8qL/tV',
    defaultMessage: 'You will be able to define availability of product after creating variants.',
    description: 'CannotDefineChannelsAvailabilityCard subtitle',
  },
};

const CannotDefineChannelsAvailabilityCard: FC = () => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardTitle title={t('dashboard.title', 'Availability')} />
      <CardContent>
        {t(
          'dashboard.subtitle',
          'You will be able to define availability of product after creating variants.'
        )}
      </CardContent>
    </Card>
  );
};

export default CannotDefineChannelsAvailabilityCard;
