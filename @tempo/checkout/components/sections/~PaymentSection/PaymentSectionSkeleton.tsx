import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';

export const PaymentSectionSkeleton: FC = () => {
  return (
    <div className="section">
      <Skeleton variant="text" />
      <div className="skeleton-box flex flex-row items-center mt-4">
        <Skeleton className="w-1/5 mr-4" />
        <Skeleton className="w-1/5 mr-4" />
        <Skeleton className="w-1/5" />
      </div>
    </div>
  );
};
