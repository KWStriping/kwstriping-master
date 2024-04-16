import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { AttributeFragment } from '@core/api/graphql';
import { AttributeListUrlOrdering } from '@dashboard/oldSrc/attributes/urls';
import { translateBoolean } from '@dashboard/oldSrc/intl';
import type { ListActions, ListProps, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';

export interface AttributeListProps
  extends ListProps,
    ListActions,
    SortPage<AttributeListUrlOrdering> {
  attributes: AttributeFragment[];
}

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colFaceted: {
        width: 180,
      },
      colSearchable: {
        width: 180,
      },
      colSlug: {
        width: 200,
      },
      colVisible: {
        width: 180,
      },
    },
    colFaceted: {
      textAlign: 'center',
    },
    colSearchable: {
      textAlign: 'center',
    },
    colVisible: {
      textAlign: 'center',
    },
    link: {
      cursor: 'pointer',
    },
  }),
  { name: 'AttributeList' }
);

const numberOfColumns = 6;

const AttributeList: FC<AttributeListProps> = ({
  attributes,
  disabled,
  isChecked,
  selected,
  sort,
  toggle,
  toggleAll,
  toolbar,
  onSort,
}) => {
  const { t } = useTranslation();
  // const styles = useStyles();
  const styles = {};
  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={attributes}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          className={styles.colSlug ?? ''}
          direction={
            sort.sort === AttributeListUrlOrdering.slug
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(AttributeListUrlOrdering.slug)}
        >
          {t('dashboard.JkeS6', 'Attribute Code')}
        </TableCellHeader>
        <TableCellHeader
          className={'w-auto'}
          direction={
            sort.sort === AttributeListUrlOrdering.name
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          onClick={() => onSort(AttributeListUrlOrdering.name)}
        >
          {t('dashboard.efaultLabel', 'Default Label')}
        </TableCellHeader>
        <TableCellHeader
          className={styles.colVisible ?? ''}
          direction={
            sort.sort === AttributeListUrlOrdering.visible
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          textAlign="center"
          onClick={() => onSort(AttributeListUrlOrdering.visible)}
        >
          {t('dashboard.isible', 'Visible')}
        </TableCellHeader>
        <TableCellHeader
          className={styles.colSearchable ?? ''}
          direction={
            sort.sort === AttributeListUrlOrdering.searchable
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          textAlign="center"
          onClick={() => onSort(AttributeListUrlOrdering.searchable)}
        >
          {t('dashboard.searchable', 'Searchable')}
        </TableCellHeader>
        <TableCellHeader
          className={styles.colFaceted ?? ''}
          direction={
            sort.sort === AttributeListUrlOrdering.useInFacetedSearch
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          textAlign="center"
          onClick={() => onSort(AttributeListUrlOrdering.useInFacetedSearch)}
        >
          {t('dashboard.3pCRX', 'Use as filter')}
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePaginationWithContext colSpan={numberOfColumns} />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          attributes,
          (attribute) => {
            const isSelected = attribute ? isChecked(attribute.id) : false;
            return (
              <TableRow
                selected={isSelected}
                hover={!!attribute}
                key={attribute ? attribute.id : 'skeleton'}
                className={styles.link ?? ''}
                data-test-id={'id-' + attribute.id}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(attribute.id)}
                  />
                </TableCell>
                <TableCell className={styles.colSlug ?? ''} data-test-id="slug">
                  <Link href={{ pathname: '/attributes/[id]', query: { id: attribute?.id } }}>
                    {attribute ? attribute.slug : <Skeleton />}
                  </Link>
                </TableCell>
                <TableCell className={'w-auto'} data-test-id="name">
                  {attribute ? attribute.name : <Skeleton />}
                </TableCell>
                <TableCell
                  className={styles.colVisible ?? ''}
                  data-test-id="visible"
                  data-test-visible={attribute.visibleInStorefront}
                >
                  {attribute ? translateBoolean(attribute.visibleInStorefront, t) : <Skeleton />}
                </TableCell>
                <TableCell
                  className={styles.colSearchable ?? ''}
                  data-test-id="searchable"
                  data-test-searchable={attribute.filterableInDashboard}
                >
                  {attribute ? (
                    translateBoolean(attribute.filterableInDashboard, t)
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell
                  className={styles.colFaceted ?? ''}
                  data-test-id="use-in-faceted-search"
                  data-test-use-in-faceted-search={attribute.filterableInStorefront}
                >
                  {attribute ? (
                    translateBoolean(attribute.filterableInStorefront, t)
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {t('dashboard.tQgD8', 'No attributes found')}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
AttributeList.displayName = 'AttributeList';
export default AttributeList;
