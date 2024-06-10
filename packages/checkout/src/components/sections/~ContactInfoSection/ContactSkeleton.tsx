import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';

interface ContactSkeletonProps {}

export const ContactSkeleton: FC<ContactSkeletonProps> = ({}) => {
  return (
    <div className="section">
      <Skeleton variant="text" />
      <div className="flex flex-row justify-between">
        <Skeleton className="w-1/2" />
        <Skeleton className="w-1/8" />
      </div>
    </div>
  );
};
