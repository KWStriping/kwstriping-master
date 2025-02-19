import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';

import CardContainer from './VariantDetailsChannelsAvailabilityCardContainer';

export const CardSkeleton: FC = () => (
  <CardContainer>
    <CardContent>
      <Skeleton />
    </CardContent>
  </CardContainer>
);
