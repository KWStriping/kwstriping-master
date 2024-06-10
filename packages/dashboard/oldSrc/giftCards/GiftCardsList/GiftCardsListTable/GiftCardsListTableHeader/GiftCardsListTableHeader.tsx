import { useTranslation } from '@core/i18n';
import DeleteIconButton from '@core/ui/components/buttons/DeleteIconButton';
import TableCell from '@mui/material/TableCell';
import type { ReactNode, FC } from 'react';
import { messages as filterLabels } from '../../GiftCardListSearchAndFilters/filters';
import { giftCardsListTableMessages as messages } from '../../messages';

import { useGiftCardListDialogs } from '../../providers/GiftCardListDialogsProvider';
import { useGiftCardList } from '../../providers/GiftCardListProvider';
import { canBeSorted } from '../../sort';
import { GiftCardUrlOrdering } from '../../types';
import BulkEnableDisableSection from './BulkEnableDisableSection';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';
import { commonTooltipMessages } from '@dashboard/components/tables/TooltipTableCellHeader/messages';
import TooltipTableCellHeader from '@dashboard/components/tables/TooltipTableCellHeader';
import TableHead from '@dashboard/components/tables/TableHead';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import type {
  TableCellHeaderArrowDirection,
  TableCellHeaderProps,
} from '@dashboard/components/tables/TableCellHeader';
import Label, { LabelSizes } from '@dashboard/components/orders/OrderHistory/Label';

interface HeaderItem {
  title?: MessageDescriptor;
  options?: TableCellHeaderProps;
  onClick?: () => void;
  direction?: TableCellHeaderArrowDirection;
}

interface GiftCardsListTableHeaderProps {
  isCurrencySelected: boolean;
}

const GiftCardsListTableHeader: FC<GiftCardsListTableHeaderProps> = ({ isCurrencySelected }) => {
  const { t } = useTranslation();

  const { giftCards, numberOfColumns, loading, toggleAll, listElements } = useGiftCardList();
  const { openDeleteDialog } = useGiftCardListDialogs();
  const { onSort, sort } = useGiftCardList();

  const getDirection = (sortField: GiftCardUrlOrdering) =>
    sort.sort === sortField ? getArrowDirection(!!sort.asc) : undefined;

  const headerItems: HeaderItem[] = [
    {
      title: messages.giftCardsTableColumnGiftCardTitle,
      options: {
        className: styles.colCardCode ?? '',
        textAlign: 'left',
      },
    },
    {
      title: messages.giftCardsTableColumnTagTitle,
    },
    {
      title: messages.giftCardsTableColumnProductTitle,
      onClick: () => onSort(GiftCardUrlOrdering.product),
      direction: getDirection(GiftCardUrlOrdering.product),
    },
    {
      title: messages.giftCardsTableColumnCustomerTitle,
      onClick: () => onSort(GiftCardUrlOrdering.usedBy),
      direction: getDirection(GiftCardUrlOrdering.usedBy),
    },
  ];

  const headerTooltipItem: HeaderItem & {
    disabled: boolean;
    tooltip: string | ReactNode[];
  } = {
    title: messages.giftCardsTableColumnBalanceTitle,
    options: {
      className: styles.colBalance ?? '',
      textAlign: 'right',
    },
    onClick: () => onSort(GiftCardUrlOrdering.balance),
    direction: getDirection(GiftCardUrlOrdering.balance),
    disabled: !canBeSorted(GiftCardUrlOrdering.balance, isCurrencySelected),
    tooltip: t(
      'dashboard.noFilterSelected',
      commonTooltipMessages.noFilterSelected.defaultMessage,
      {
        filterName: <b>{filterLabels.currencyLabel.defaultMessage}</b>,
      }
    ),
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, ...headerTooltipItemProps } = headerTooltipItem;

  return (
    <>
      <colgroup>
        <col />
        <col className={styles.colCardCode ?? ''} />
        <col className={styles.colBase ?? ''} />
        <col className={styles.colProduct ?? ''} />
        <col className={styles.colBase ?? ''} />
        <col className={styles.colBalance ?? ''} />
        <col className={styles.colDelete ?? ''} />
      </colgroup>
      <TableHead
        disabled={loading}
        colSpan={numberOfColumns}
        selected={listElements.length}
        items={giftCards}
        toggleAll={toggleAll}
        toolbar={
          <div className={styles.toolbar ?? ''}>
            <BulkEnableDisableSection />
            <DeleteIconButton onClick={() => openDeleteDialog()} />
          </div>
        }
      >
        {headerItems.map(({ title, options, onClick, direction }) => (
          <TableCellHeader
            {...options}
            onClick={onClick}
            direction={direction}
            key={title.defaultMessage}
          >
            <Label text={t(title)} size={LabelSizes.md} />
          </TableCellHeader>
        ))}
        <TooltipTableCellHeader {...headerTooltipItemProps}>
          <Label text={t(headerTooltipItem.title)} size={LabelSizes.md} />
        </TooltipTableCellHeader>
        <TableCell className={styles.colDelete ?? ''} />
      </TableHead>
    </>
  );
};

export default GiftCardsListTableHeader;
