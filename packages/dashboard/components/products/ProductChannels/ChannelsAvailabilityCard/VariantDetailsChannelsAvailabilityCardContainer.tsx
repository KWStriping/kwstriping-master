import Card from '@mui/material/Card';
import type { FC, ReactNode } from 'react';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CardTitle from '@dashboard/components/core/CardTitle';

interface VariantDetailsChannelsAvailabilityCardContainerProps {
  children: ReactNode;
  cardTitle?: ReactNode;
}

const VariantDetailsChannelsAvailabilityCardContainer: FC<
  VariantDetailsChannelsAvailabilityCardContainerProps
> = ({ children, cardTitle }) => (
  <>
    <Card>
      {cardTitle || <CardTitle title={t('dashboard.title', 'Availability')} />}
      {children}
    </Card>
    <CardSpacer />
  </>
);

export default VariantDetailsChannelsAvailabilityCardContainer;
