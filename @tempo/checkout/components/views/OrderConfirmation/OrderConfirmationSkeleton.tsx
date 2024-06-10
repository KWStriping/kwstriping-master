import { PageHeader } from '@tempo/checkout/components/PageHeader';
import Skeleton from '@mui/material/Skeleton';
import { SummarySkeleton } from '@tempo/checkout/components/sections/Summary/SummarySkeleton';

export const OrderConfirmationSkeleton = () => {
  return (
    <div className="page">
      <header>
        <PageHeader />
        <Skeleton className="title h-4 w-72 mb-6" />
        <Skeleton />
        <Skeleton className="w-2/3" />
      </header>
      <main className="order-content overflow-hidden">
        <div className="skeleton-box w-1/2">
          <div className="mb-10">
            <Skeleton variant="text" />
            <Skeleton />
          </div>
          <div className="mb-10">
            <Skeleton variant="text" />
            <Skeleton className="w-2/3" />
          </div>
          <div className="mb-10">
            <Skeleton variant="text" />
            <Skeleton className="w-3/4" />
          </div>
          <div className="mb-10">
            <Skeleton variant="text" />
            <Skeleton className="w-1/2" />
            <Skeleton className="w-1/4" />
            <Skeleton className="w-2/3" />
          </div>
          <div className="mb-10">
            <Skeleton variant="text" />
            <Skeleton className="w-1/2" />
            <Skeleton className="w-1/4" />
            <Skeleton className="w-2/3" />
          </div>
        </div>
        <div className="order-divider" />
        <SummarySkeleton />
      </main>
    </div>
  );
};
