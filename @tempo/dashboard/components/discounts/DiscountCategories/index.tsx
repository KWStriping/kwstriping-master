import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { SaleDetailsFragment, VoucherDetailsFragment } from '@tempo/api/generated/graphql';
import { renderCollection } from '@tempo/ui/utils';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';
import type { ListActions, ListProps } from '@tempo/dashboard/oldSrc/types';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import { categoryUrl } from '@tempo/dashboard/oldSrc/categories/urls';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TableButtonWrapper } from '@tempo/dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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

  return (
    <Card>
      <CardTitle
        title={m.dashboard_discountCategoriesHeader() ?? 'Eligible Categories'}
        toolbar={
          <Button onClick={onCategoryAssign}>
            {m.dashboard_discountCategoriesButton() ?? 'Assign categories'}
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
              {m.dashboard_discountCategoriesTableProductHeader() ?? 'Category name'}
            </TableCell>
            <TableCell className={styles.colProducts ?? ''}>
              {m.dashboard_discountCategoriesTableProductNumber() ?? 'Products'}
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
                  {m.dashboard_discountCategoriesNotFound() ?? 'No categories found'}
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
