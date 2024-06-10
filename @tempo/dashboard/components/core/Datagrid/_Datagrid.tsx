import * as m from '@paraglide/messages';
import '@glideapps/glide-data-grid/dist/index.css';

// import { useTranslation } from '@tempo/next/i18n';
import { useTheme } from '@tempo/ui/theme';
import { useColorScheme } from '@tempo/ui/theme/styles';
import type { CardMenuItem } from '@tempo/dashboard/components/core/CardMenu';
import ColumnPicker from '@tempo/dashboard/components/core/ColumnPicker';
import { usePreventHistoryBack } from '@tempo/dashboard/hooks/usePreventHistoryBack';
import DataEditor from '@glideapps/glide-data-grid';
import type {
  DataEditorRef,
  EditableGridCell,
  GridCell,
  GridSelection,
  Item,
} from '@glideapps/glide-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import range from 'lodash-es/range';
import throttle from 'lodash-es/throttle';
import { useMemo, useCallback, useEffect, useState, useRef } from 'react';
import type { FC, MutableRefObject, ReactElement, ReactNode } from 'react';

import { FullScreenContainer } from './FullScreenContainer';
import { Header } from './Header';
import styles from './index.module.css';
import { RowActions } from './RowActions';
import { useDatagridTheme, useFullScreenStyles } from './styles';
import type { AvailableColumn } from './types';
import useCells from './useCells';
import useColumns from './useColumns';
import type { DatagridChange, OnDatagridChange } from './useDatagridChange';
import useDatagridChange from './useDatagridChange';
import { useFullScreenMode } from './useFullScreenMode';

export interface GetCellContentOpts {
  changes: MutableRefObject<DatagridChange[]>;
  added: number[];
  removed: number[];
  getChangeIndex: (column: string, row: number) => number;
}

export interface MenuItemsActions {
  removeRows: (indexes: number[]) => void;
}

export interface DatagridProps {
  addButtonLabel: string;
  availableColumns: readonly AvailableColumn[];
  emptyText: string;
  getCellError: (item: Item, opts: GetCellContentOpts) => boolean;
  getCellContent: (item: Item, opts: GetCellContentOpts) => GridCell;
  menuItems: (index: number) => CardMenuItem[];
  rows: number;
  title: string;
  fullScreenTitle?: string;
  selectionActions: (selection: number[], actions: MenuItemsActions) => ReactNode;
  onChange?: OnDatagridChange;
}

export const Datagrid: FC<DatagridProps> = ({
  addButtonLabel,
  availableColumns,
  emptyText,
  getCellContent,
  getCellError,
  menuItems,
  rows,
  selectionActions,
  title,
  fullScreenTitle,
  onChange,
}): ReactElement => {
  const fullScreenClasses = useFullScreenStyles(styles);
  const datagridTheme = useDatagridTheme();
  const editor = useRef<DataEditorRef>(null);

  const { isOpen, isAnimationOpenFinished, toggle } = useFullScreenMode();

  useEffect(() => {
    // Glide automatically refers to the div with an id "portal"
    document
      .getElementById('portal')
      ?.classList.add('fixed', 'top-0', 'left-0', 'z-[2]', styles.portal ?? '');
  }, []);

  const {
    availableColumnsChoices,
    columns,
    columnChoices,
    defaultColumns,
    displayedColumns,
    onColumnMoved,
    onColumnResize,
    onColumnsChange,
    picker,
  } = useColumns(availableColumns);

  const { added, onCellEdited, onRowsRemoved, changes, removed, getChangeIndex, onRowAdded } =
    useDatagridChange(availableColumns, rows, onChange);

  const theme = useTheme();
  const { mode } = useColorScheme();

  const [scrolledToRight, setScrolledToRight] = useState(false);

  const scroller: HTMLDivElement | null = document.querySelector('.dvn-scroller');
  const scrollerInner: HTMLDivElement | null = document.querySelector('.dvn-scroll-inner');

  usePreventHistoryBack(scroller);

  useEffect(() => {
    if (!(scroller && scrollerInner)) return;
    const handler = throttle(() => {
      const isScrolledToRight =
        scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft < 2;
      setScrolledToRight(isScrolledToRight);
    }, 100);
    scroller.addEventListener('scroll', handler);
    return () => scroller.removeEventListener('scroll', handler);
  }, [scroller, scrollerInner]);

  const getCellContentEnh = useCallback(
    ([column, row]: Item): GridCell => {
      const item = [
        availableColumns.findIndex((ac) => ac.id === displayedColumns[column]),
        row,
      ] as const;
      const opts = { changes, added, removed, getChangeIndex };
      const columnId = availableColumns[column]?.id;
      const changed = !!columnId && !!changes.current[getChangeIndex(columnId, row)]?.data;

      return {
        ...getCellContent(item, opts),
        ...(changed ? { themeOverride: { bgCell: theme.vars.palette.active[500] } } : {}),
        ...(getCellError(item, opts)
          ? {
              themeOverride: {
                bgCell:
                  mode === 'light'
                    ? theme.vars.palette.error.light
                    : theme.vars.palette.error[500],
              },
            }
          : {}),
      };
    },
    [getCellError, getCellContent, availableColumns, displayedColumns, changes, added, removed]
  );

  const onCellEditedEnh = useCallback(
    ([column, row]: Item, newValue: EditableGridCell): void => {
      onCellEdited(
        [availableColumns.findIndex((ac) => ac.id === displayedColumns[column]), row],
        newValue
      );
      editor.current?.updateCells(
        range(displayedColumns.length).map((offset) => ({
          cell: [column + offset, row],
        }))
      );
    },
    [onCellEdited, availableColumns, displayedColumns]
  );

  const [selection, setSelection] = useState<GridSelection>();

  const props = useCells();

  const removeRows = useCallback(
    (rows: number[]) => {
      if (selection?.rows) {
        onRowsRemoved(rows);
        setSelection(undefined);
      }
    },
    [selection, onRowsRemoved]
  );

  const selectionActionsComponent = useMemo(
    () =>
      selection?.rows?.length
        ? selectionActions(Array.from(selection.rows), { removeRows })
        : null,
    [selection, selectionActions, removeRows]
  );

  const rowsTotal = rows - removed.length + added.length;
  const hasColumnGroups = columns.some((col) => col?.group);
  const headerTitle = isAnimationOpenFinished ? fullScreenTitle ?? title : title;
  return (
    <FullScreenContainer open={isOpen} className={fullScreenClasses.fullScreenContainer}>
      <Card className={styles.root ?? ''}>
        <Header title={headerTitle}>
          <Header.ButtonFullScreen isOpen={isOpen} onToggle={toggle}>
            {isOpen ? m.dashboard_close() ?? 'Close' : m.dashboard_open() ?? 'Open'}
          </Header.ButtonFullScreen>
          <Header.ButtonAddRow onAddRow={onRowAdded}>{addButtonLabel}</Header.ButtonAddRow>
        </Header>
        <CardContent classes={{ root: styles.cardContentRoot }}>
          {rowsTotal > 0 ? (
            <>
              {!!selection?.rows?.length && (
                <div className={styles.actionBtnBar ?? ''}>{selectionActionsComponent}</div>
              )}
              <div className={styles.editorContainer ?? ''}>
                <DataEditor
                  {...props}
                  theme={datagridTheme}
                  className={styles.datagrid ?? ''}
                  getCellContent={getCellContentEnh}
                  onCellEdited={onCellEditedEnh}
                  columns={columns}
                  rows={rowsTotal}
                  freezeColumns={1}
                  smoothScrollX
                  rowMarkers="checkbox"
                  rowSelect="multi"
                  rowSelectionMode="multi"
                  rangeSelect="multi-rect"
                  columnSelect="none"
                  getCellsForSelection
                  onColumnMoved={onColumnMoved}
                  onColumnResize={onColumnResize}
                  onGridSelectionChange={setSelection}
                  gridSelection={selection}
                  rowHeight={48}
                  headerHeight={48}
                  ref={editor}
                  onPaste
                  rightElementProps={{
                    sticky: true,
                  }}
                  rightElement={
                    <div
                      className={clsx(
                        styles.rowActionBar ?? '',
                        scrolledToRight && styles.rowActionBarScrolledToRight
                      )}
                    >
                      <div
                        className={clsx(
                          styles.rowActionBarShadow ?? '',
                          !scrolledToRight && styles.rowActionBarShadowActive
                        )}
                      />
                      <div className={'flex items-center justify-center h-[48px]'}>
                        <ColumnPicker
                          IconButtonProps={{
                            className: styles.ghostIcon ?? '',
                            variant: 'ghost',
                            hoverOutline: false,
                          }}
                          availableColumns={availableColumnsChoices}
                          initialColumns={columnChoices}
                          defaultColumns={defaultColumns}
                          onSave={onColumnsChange}
                          hasMore={false}
                          loading={false}
                          onFetchMore={() => undefined}
                          onQueryChange={picker.setQuery}
                          query={picker.query}
                        />
                      </div>
                      {hasColumnGroups && (
                        <div
                          className={clsx(
                            styles.rowAction ?? '',
                            scrolledToRight && styles.rowActionScrolledToRight
                          )}
                        />
                      )}
                      {Array(rowsTotal)
                        .fill(0)
                        .map((_, index) => (
                          <RowActions
                            key={index}
                            menuItems={menuItems(index)}
                            disabled={index >= rowsTotal - added.length}
                          />
                        ))}
                    </div>
                  }
                  rowMarkerWidth={48}
                />
                {/* FIXME: https://github.com/glideapps/glide-data-grid/issues/505 */}
                {hasColumnGroups && <div className={styles.columnGroupFixer ?? ''} />}
              </div>
            </>
          ) : (
            <Typography align="center">{emptyText}</Typography>
          )}
        </CardContent>
      </Card>
    </FullScreenContainer>
  );
};

Datagrid.displayName = 'Datagrid';
export default Datagrid;
