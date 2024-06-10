import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import type { FC, ReactNode } from 'react';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface VariantDetailsChannelsAvailabilityCardContainerProps {
  children: ReactNode;
  cardTitle?: ReactNode;
}

const VariantDetailsChannelsAvailabilityCardContainer: FC<
  VariantDetailsChannelsAvailabilityCardContainerProps
> = ({ children, cardTitle }) => (
  <>
    <Card>
      {cardTitle || <CardTitle title={m.dashboard_title() ?? 'Availability'} />}
      {children}
    </Card>
    <CardSpacer />
  </>
);

export default VariantDetailsChannelsAvailabilityCardContainer;
