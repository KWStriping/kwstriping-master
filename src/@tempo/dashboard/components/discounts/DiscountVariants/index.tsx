import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import { renderCollection } from '@tempo/ui/utils';
import type { SaleDetailsFragment } from '@tempo/api/generated/graphql';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import { TableButtonWrapper } from '@tempo/dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import { productVariantEditPath } from '@tempo/dashboard/oldSrc/products/urls';
import type { ListActions, ListProps, RelayToFlat } from '@tempo/dashboard/oldSrc/types';

export interface SaleVariantsProps extends ListProps, ListActions {
  variants: RelayToFlat<SaleDetailsFragment['variants']> | null;
  onVariantAssign: () => void;
  onVariantUnassign: (id: string) => void;
}

const numberOfColumns = 5;

const DiscountVariants: FC<SaleVariantsProps> = (props) => {
  const {
    variants,
    disabled,
    onVariantAssign,
    onVariantUnassign,
    isChecked,
    selected,
    toggle,
    toggleAll,
    toolbar,
  } = props;
  const styles = useStyles(props);

  return (
    <Card>
      <CardTitle
        title={m.dashboard_discountVariantsHeader() ?? 'Eligible Variants'}
        toolbar={
          <Button onClick={onVariantAssign} data-test-id="assign-variant">
            {m.dashboard_discountVariantsButton() ?? 'Assign variants'}
          </Button>
        }
      />
      <ResponsiveTable>
        <colgroup>
          <col />
          <col className={styles.colProductName ?? ''} />
          <col className={styles.colVariantName ?? ''} />
          <col className={styles.colType ?? ''} />
          <col className={styles.colActions ?? ''} />
        </colgroup>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={variants}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCell className={styles.colProductName ?? ''}>
            <span className={!!variants?.length && styles.colNameLabel}>
              {m.dashboard_discountVariantsTableProductHeader() ?? 'Product Name'}
            </span>
          </TableCell>
          <TableCell className={styles.colVariantName ?? ''}>
            {m.dashboard_discountVariantsTableVariantHeader() ?? 'Variant Name'}
          </TableCell>
          <TableCell className={styles.colType ?? ''}>
            {m.dashboard_discountVariantsTableProductHeader() ?? 'Product Name'}
          </TableCell>
          <TableCell className={styles.colActions ?? ''} />
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePaginationWithContext colSpan={numberOfColumns} />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            variants,
            (variant) => {
              const isSelected = variant ? isChecked(variant.id) : false;

              return (
                <TableRow
                  hover={!!variant}
                  key={variant ? variant.id : 'skeleton'}
                  href={variant && productVariantEditPath(variant.product.id, variant.id)}
                  className={styles.tableRow ?? ''}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(variant.id)}
                    />
                  </TableCell>
                  <TableCellAvatar
                    className={styles.colProductName ?? ''}
                    thumbnail={variant.product.thumbnail.url}
                  >
                    {maybe<ReactNode>(() => variant.product.name, <Skeleton />)}
                  </TableCellAvatar>
                  <TableCell className={styles.colType ?? ''}>
                    {maybe<ReactNode>(() => variant.name, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colType ?? ''}>
                    {maybe<ReactNode>(() => variant.product.productKlass.name, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colActions ?? ''}>
                    <TableButtonWrapper>
                      <IconButton
                        color="secondary"
                        disabled={!variant || disabled}
                        onClick={(event) => {
                          event.stopPropagation();
                          onVariantUnassign(variant.id);
                        }}
                      >
                        <DeleteIcon color="primary" />
                      </IconButton>
                    </TableButtonWrapper>
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {m.dashboard_discountVariantsNotFound() ?? 'No variants found'}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
DiscountVariants.displayName = 'DiscountVariants';
export default DiscountVariants;
