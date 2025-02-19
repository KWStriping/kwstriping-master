import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { makeStyles } from '@tempo/ui/theme/styles';

import { AttributeInputType } from '@tempo/api/generated/constants';
import type { ValueFragment, ValueListFragment } from '@tempo/api/generated/graphql';
import { renderCollection } from '@tempo/ui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import type {
  ListProps,
  PaginateListProps,
  RelayToFlat,
  ReorderAction,
} from '@tempo/dashboard/oldSrc/types';
import { stopPropagation } from '@tempo/dashboard/oldSrc/misc';
import TablePagination from '@tempo/dashboard/components/tables/TablePagination';
import {
  SortableTableBody,
  SortableTableRow,
} from '@tempo/dashboard/components/tables/SortableTable';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface ValuesProps
  extends Pick<ListProps, Exclude<keyof ListProps, 'getRowHref'>>,
    PaginateListProps {
  disabled: boolean;
  values: RelayToFlat<ValueListFragment>;
  onValueAdd: () => void;
  onValueDelete: (id: string) => void;
  onValueReorder: ReorderAction;
  onValueUpdate: (id: string) => void;
  inputType: AttributeInputType;
}

const useStyles = makeStyles(
  (theme) => ({
    columnSwatch: {
      width: 100,
    },
    columnAdmin: {
      width: 300,
    },
    columnDrag: {
      width: theme.spacing(6 + 1.5),
    },
    columnStore: {
      width: 'auto',
    },
    dragIcon: {
      cursor: 'grab',
    },
    iconCell: {
      width: 84,
    },
    link: {
      cursor: 'pointer',
    },
    swatch: {
      width: 32,
      height: 32,
      borderRadius: 4,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }),
  { name: 'Values' }
);

const getSwatchCellStyle = (value: ValueFragment) => {
  if (!value) return;
  return value.file
    ? { backgroundImage: `url(${value.file.url})` }
    : { backgroundColor: value.value };
};

const Values: FC<ValuesProps> = ({
  disabled,
  onValueAdd,
  onValueDelete,
  onValueReorder,
  onValueUpdate,
  values,
  settings,
  onUpdateListSettings,
  pageInfo,
  onNextPage,
  onPreviousPage,
  inputType,
}) => {
  // const styles = useStyles();
  const styles = {};
  const isSwatch = inputType === AttributeInputType.Swatch;
  const numberOfColumns = isSwatch ? 5 : 4;

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard__uE_t() ?? 'Attribute Values'
          // section header
        }
        toolbar={
          <Button
            disabled={disabled}
            color="secondary"
            onClick={onValueAdd}
            data-test-id="assign-value-button"
          >
            {m._iVKR_() ?? 'Assign value'}
          </Button>
        }
      />
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell className={styles.columnDrag ?? ''} />
            {isSwatch && (
              <TableCell className={styles.columnSwatch ?? ''}>
                {m.dashboard_UevU_() ?? 'Swatch'}
              </TableCell>
            )}
            <TableCell className={styles.columnAdmin ?? ''}>
              {m.dashboard_psvRS() ?? 'Admin'}
            </TableCell>
            <TableCell className={styles.columnStore ?? ''}>
              {m.dashboard___H_L() ?? 'Default Store View'}
            </TableCell>
            <TableCell className={styles.iconCell ?? ''} />
          </TableRow>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={numberOfColumns}
              hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
              onNextPage={onNextPage}
              hasPreviousPage={pageInfo && !disabled ? pageInfo.hasPreviousPage : false}
              onPreviousPage={onPreviousPage}
              settings={settings}
              onUpdateListSettings={onUpdateListSettings}
            />
          </TableRow>
        </TableFooter>
        <SortableTableBody items={values?.map(({ id }) => id)} onSortEnd={onValueReorder}>
          {renderCollection(
            values,
            (value) => (
              <SortableTableRow
                className={value ? styles.link : undefined}
                hover={!!value}
                onClick={value ? () => onValueUpdate(value.id) : undefined}
                key={value?.id}
                // index={valueIndex || 0}
              >
                {isSwatch && (
                  <TableCell className={styles.columnSwatch ?? ''}>
                    <div
                      data-test-id="swatch-image"
                      className={styles.swatch ?? ''}
                      style={getSwatchCellStyle(value)}
                    />
                  </TableCell>
                )}
                <TableCell className={styles.columnAdmin ?? ''}>
                  {value?.slug ?? <Skeleton />}
                </TableCell>
                <TableCell className={styles.columnStore ?? ''}>
                  {value?.name ?? <Skeleton />}
                </TableCell>
                <TableCell className={styles.iconCell ?? ''}>
                  <IconButton
                    color="secondary"
                    disabled={disabled}
                    onClick={stopPropagation(() => onValueDelete(value.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </SortableTableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {m.dashboard__zIpS() ?? 'No values found'}
                </TableCell>
              </TableRow>
            )
          )}
        </SortableTableBody>
      </ResponsiveTable>
    </Card>
  );
};
Values.displayName = 'Values';
export default Values;
