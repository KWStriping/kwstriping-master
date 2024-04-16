import TablePagination from '@dashboard/components/tables/TablePagination';
import usePaginator from '@dashboard/hooks/usePaginator';
import TableFooter from '@mui/material/TableFooter';
import type { FC } from 'react';

import { useGiftCardList } from '../providers/GiftCardListProvider';

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
