import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CardTitle from '@dashboard/components/core/CardTitle';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import { TableButtonWrapper } from '@dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { SaleDetailsFragment, VoucherDetailsFragment } from '@core/api/graphql';
import { categoryUrl } from '@dashboard/oldSrc/categories/urls';
import { maybe } from '@dashboard/oldSrc/misc';
import { renderCollection } from '@core/ui/utils';
import type { ListActions, ListProps } from '@dashboard/oldSrc/types';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';

export interface DiscountCategoriesProps extends ListProps, ListActions {
  discount: SaleDetailsFragment | VoucherDetailsFragment;
  onCategoryAssign: () => void;
  onCategoryUnassign: (id: string) => void;
}

const numberOfColumns = 4;

const DiscountCategories: FC<DiscountCategoriesProps> = (props) => {
  const {
    discount,
    disabled,
    onCategoryAssign,
    onCategoryUnassign,
    toolbar,
    toggle,
    toggleAll,
    selected,
    isChecked,
  } = props;
  const styles = useStyles(props);

  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t('dashboard.discountCategoriesHeader', 'Eligible Categories')}
        toolbar={
          <Button onClick={onCategoryAssign}>
            {t('dashboard.discountCategoriesButton', 'Assign categories')}
          </Button>
        }
      />
      <ResponsiveTable>
        <colgroup>
          <col />
          <col className={styles.colName ?? ''} />
          <col className={styles.colProducts ?? ''} />
          <col className={styles.colActions ?? ''} />
        </colgroup>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={mapEdgesToItems(discount?.categories)}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <>
            <TableCell className={styles.colName ?? ''}>
              {t('dashboard.discountCategoriesTableProductHeader', 'Category name')}
            </TableCell>
            <TableCell className={styles.colProducts ?? ''}>
              {t('dashboard.discountCategoriesTableProductNumber', 'Products')}
            </TableCell>
            <TableCell />
          </>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePaginationWithContext colSpan={numberOfColumns} />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            mapEdgesToItems(discount?.categories),
            (category) => {
              const isSelected = category ? isChecked(category.id) : false;

              return (
                <TableRow
                  hover={!!category}
                  key={category ? category.id : 'skeleton'}
                  href={category && categoryUrl(category.id)}
                  className={styles.tableRow ?? ''}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(category.id)}
                    />
                  </TableCell>
                  <TableCell>{maybe<ReactNode>(() => category.name, <Skeleton />)}</TableCell>
                  <TableCell className={styles.colProducts ?? ''}>
                    {maybe<ReactNode>(() => category.products.totalCount, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colActions ?? ''}>
                    <TableButtonWrapper>
                      <IconButton
                        color="secondary"
                        disabled={!category || disabled}
                        onClick={(event) => {
                          event.stopPropagation();
                          onCategoryUnassign(category.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableButtonWrapper>
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {t('dashboard.discountCategoriesNotFound', 'No categories found')}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
DiscountCategories.displayName = 'DiscountCategories';
export default DiscountCategories;
