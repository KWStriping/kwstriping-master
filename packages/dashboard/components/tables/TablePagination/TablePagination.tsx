import { useTranslation } from '@core/i18n';
import type { PaginationProps as MacawPaginationProps } from '@core/ui/components/Pagination';
import { Pagination } from '@core/ui/components/Pagination';
import type { ListSettings } from '@dashboard/oldSrc/types';
import TableCell from '@mui/material/TableCell';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ElementType, FC } from 'react';

export type ListSettingsUpdate = <T extends keyof ListSettings>(
  key: T,
  value: ListSettings[T]
) => void;

export interface PaginationProps
  extends Omit<
    MacawPaginationProps,
    'labels' | 'rowNumber' | 'nextIconButtonProps' | 'prevIconButtonProps'
  > {
  component?: ElementType;
  colSpan?: number;
  settings?: ListSettings;
  onUpdateListSettings?: ListSettingsUpdate;
  prevHref?: string;
  nextHref?: string;
  disabled?: boolean;
}
export const TablePagination: FC<PaginationProps> = ({
  component,
  colSpan,
  settings,
  onUpdateListSettings,
  nextHref,
  prevHref,
  hasNextPage,
  hasPreviousPage,
  disabled,
  ...rest
}) => {
  const { t } = useTranslation();
  const Wrapper = component || TableCell;

  return (
    <Wrapper colSpan={colSpan || 1000}>
      <Pagination<LinkProps>
        {...rest}
        hasNextPage={hasNextPage && !disabled}
        hasPreviousPage={hasPreviousPage && !disabled}
        labels={{
          noOfRows: t('dashboard.oOfRows', 'No. of rows'),
        }}
        rowNumber={settings?.rowNumber}
        onRowNumberUpdate={
          onUpdateListSettings ? (value) => onUpdateListSettings('rowNumber', value) : undefined
        }
        nextIconButtonProps={nextHref ? { component: Link, to: nextHref } : undefined}
        prevIconButtonProps={prevHref ? { component: Link, to: prevHref } : undefined}
      />
    </Wrapper>
  );
};

TablePagination.displayName = 'TablePagination';
export default TablePagination;
