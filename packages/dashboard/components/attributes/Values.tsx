import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton';
import { makeStyles } from '@core/ui/theme/styles';

import CardTitle from '@dashboard/components/core/CardTitle';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import { SortableTableBody, SortableTableRow } from '@dashboard/components/tables/SortableTable';
import TablePagination from '@dashboard/components/tables/TablePagination';
import { AttributeInputType } from '@core/api/constants';
import type {
  ValueFragment,
  ValueListFragment,
} from '@core/api/graphql';
import { renderCollection } from '@core/ui/utils';
import { stopPropagation } from '@dashboard/oldSrc/misc';
import type {
  ListProps,
  PaginateListProps,
  RelayToFlat,
  ReorderAction,
} from '@dashboard/oldSrc/types';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';

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
  const { t } = useTranslation();
  // const styles = useStyles();
  const styles = {};
  const isSwatch = inputType === AttributeInputType.Swatch;
  const numberOfColumns = isSwatch ? 5 : 4;

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.3uE0t',
          'Attribute Values'
          // section header
        )}
        toolbar={
          <Button
            disabled={disabled}
            color="secondary"
            onClick={onValueAdd}
            data-test-id="assign-value-button"
          >
            {t('+iVKR1', 'Assign value')}
          </Button>
        }
      />
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell className={styles.columnDrag ?? ''} />
            {isSwatch && (
              <TableCell className={styles.columnSwatch ?? ''}>
                {t('dashboard.UevU9', 'Swatch')}
              </TableCell>
            )}
            <TableCell className={styles.columnAdmin ?? ''}>
              {t('dashboard.psvRS', 'Admin')}
            </TableCell>
            <TableCell className={styles.columnStore ?? ''}>
              {t('dashboard.60H6L', 'Default Store View')}
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
                  {t('dashboard.5zIpS', 'No values found')}
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
