import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import { renderCollection } from '@core/ui/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import { TableButtonWrapper } from '@dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableCellAvatar from '@dashboard/components/tables/TableCellAvatar';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { SaleDetailsFragment } from '@core/api/graphql';
import { maybe } from '@dashboard/oldSrc/misc';
import { productVariantEditPath } from '@dashboard/oldSrc/products/urls';
import type { ListActions, ListProps, RelayToFlat } from '@dashboard/oldSrc/types';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';

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

  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t('dashboard.discountVariantsHeader', 'Eligible Variants')}
        toolbar={
          <Button onClick={onVariantAssign} data-test-id="assign-variant">
            {t('dashboard.discountVariantsButton', 'Assign variants')}
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
              {t('dashboard.discountVariantsTableProductHeader', 'Product Name')}
            </span>
          </TableCell>
          <TableCell className={styles.colVariantName ?? ''}>
            {t('dashboard.discountVariantsTableVariantHeader', 'Variant Name')}
          </TableCell>
          <TableCell className={styles.colType ?? ''}>
            {t('dashboard.discountVariantsTableProductHeader', 'Product Name')}
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
                  {t('dashboard.discountVariantsNotFound', 'No variants found')}
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
