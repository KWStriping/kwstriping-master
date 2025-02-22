import TableFooter from '@mui/material/TableFooter';
import type { FC } from 'react';

import { useGiftCardList } from '../providers/GiftCardListProvider';
import usePaginator from '@tempo/dashboard/hooks/usePaginator';
import TablePagination from '@tempo/dashboard/components/tables/TablePagination';

const GiftCardsListTableFooter: FC = () => {
  const {
    settings,
    updateListSettings,
    pageInfo: apiPageInfo,
    paginationState,
    params,
    numberOfColumns,
  } = useGiftCardList();

  const paginationValues = usePaginator({
    pageInfo: apiPageInfo,
    paginationState,
    queryString: params,
  });

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          {...paginationValues}
          settings={settings}
          colSpan={numberOfColumns}
          onUpdateListSettings={updateListSettings}
        />
      </TableRow>
    </TableFooter>
  );
};

export default GiftCardsListTableFooter;
