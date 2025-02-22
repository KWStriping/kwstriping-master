import type { PaginationProps } from './TablePagination';
import TablePagination from './TablePagination';
import { usePaginatorContext } from '@tempo/dashboard/hooks/usePaginator';

export type TablePaginationWithContextProps = Omit<
  PaginationProps,
  'nextHref' | 'prevHref' | 'hasNextPage' | 'hasPreviousPage' | 'onNextPage' | 'onPreviousPage'
>;
export const TablePaginationWithContext = (props: TablePaginationWithContextProps) => {
  const { hasNextPage, hasPreviousPage, paginatorType, ...paginationProps } =
    usePaginatorContext();

  if (paginatorType === 'click') {
    const { loadNextPage, loadPreviousPage } = paginationProps;

    return (
      <TablePagination
        {...props}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onNextPage={loadNextPage}
        onPreviousPage={loadPreviousPage}
      />
    );
  }

  const { nextHref, prevHref } = paginationProps;

  return (
    <TablePagination
      {...props}
      nextHref={nextHref}
      hasNextPage={hasNextPage}
      prevHref={prevHref}
      hasPreviousPage={hasPreviousPage}
    />
  );
};
