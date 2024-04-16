import type { PageInfo } from '@core/api';
import { useTranslation } from '@core/i18n';

export interface PaginationProps {
  pageInfo?: PageInfo;
  onLoadMore: () => void;
  totalCount?: number;
  itemsCount?: number;
}

export function Pagination({ pageInfo, onLoadMore, itemsCount, totalCount }: PaginationProps) {
  const { t } = useTranslation();
  if (!pageInfo || !pageInfo?.hasNextPage) return null;

  return (
    <nav className="mt-8 p-4 ">
      <div className="flex justify-center flex-col items-center">
        <button
          type="button"
          onClick={onLoadMore}
          className="relative inline-flex  items-center px-4 py-2 border text-base font-medium rounded-md text-gray-700 bg-gray-50 hover:border-blue-300 cursor-pointer"
        >
          {t('loadMoreButton', 'Load more')}
        </button>
        {itemsCount && totalCount && (
          <div className="text-sm text-gray-500 mt-2">
            {t('paginationProductCounter', '{{currentItemsCount}} out of {{totalItemsCount}}', {
              totalItemsCount: totalCount,
              currentItemsCount: itemsCount,
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
