import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';

import { renderCollection } from '@tempo/ui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { ReactNode, FC } from 'react';
import type { MenuFragment } from '@tempo/api/generated/graphql';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import IconButtonTableCell from '@tempo/dashboard/components/tables/IconButtonTableCell';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import { TableButtonWrapper } from '@tempo/dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import { MenuListUrlOrdering, menuUrl } from '@tempo/dashboard/oldSrc/navigation/urls';
import type { ListActions, ListProps, SortPage } from '@tempo/dashboard/oldSrc/types';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';

export interface MenuListProps extends ListProps, ListActions, SortPage<MenuListUrlOrdering> {
  menus: MenuFragment[];
  onDelete: (id: string) => void;
}

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colItems: {
        width: 200,
      },
      colTitle: {},
    },
    colAction: {
      width: 84,
    },
    colItems: {
      textAlign: 'right',
    },
    colTitle: {
      paddingLeft: 0,
    },
    row: {
      cursor: 'pointer',
    },
  }),
  { name: 'MenuList' }
);

const numberOfColumns = 4;

const MenuList: FC<MenuListProps> = (props) => {
  const {
    settings,
    disabled,
    isChecked,
    menus,
    onDelete,
    onUpdateListSettings,
    onSort,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
  } = props;
  // const styles = useStyles();
  const styles = {};

  return (
    <Card>
      <ResponsiveTable>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={menus}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader
            direction={
              sort.sort === MenuListUrlOrdering.name ? getArrowDirection(!!sort.asc) : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(MenuListUrlOrdering.name)}
            className={styles.colTitle ?? ''}
          >
            {m.dashboard_hh() / D6 ?? 'Menu Title'}
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === MenuListUrlOrdering.items ? getArrowDirection(!!sort.asc) : undefined
            }
            textAlign="right"
            onClick={() => onSort(MenuListUrlOrdering.items)}
            className={styles.colItems ?? ''}
          >
            <>
              {/* number of menu items */}

              {m.dashboard_nL_D_() ?? 'Items'}
            </>
          </TableCellHeader>
          <TableCell className={styles.colAction ?? ''} />
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePaginationWithContext
              colSpan={numberOfColumns}
              settings={settings}
              onUpdateListSettings={onUpdateListSettings}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            menus,
            (menu) => {
              const isSelected = menu ? isChecked(menu.id) : false;
              return (
                <TableRow
                  hover={!!menu}
                  key={menu ? menu.id : 'skeleton'}
                  href={menu && menuUrl(menu.id)}
                  className={styles.row ?? ''}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(menu.id)}
                    />
                  </TableCell>
                  <TableCell className={styles.colTitle ?? ''}>
                    {maybe<ReactNode>(() => menu.name, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colItems ?? ''}>
                    {maybe<ReactNode>(() => menu?.items?.length, <Skeleton />)}
                  </TableCell>
                  <TableButtonWrapper>
                    <IconButtonTableCell
                      className={styles.colAction ?? ''}
                      disabled={disabled}
                      onClick={() => onDelete(menu.id)}
                    >
                      <DeleteIcon />
                    </IconButtonTableCell>
                  </TableButtonWrapper>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {m.dashboard_Ws_ba() ?? 'No menus found'}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
MenuList.displayName = 'MenuList';
export default MenuList;
