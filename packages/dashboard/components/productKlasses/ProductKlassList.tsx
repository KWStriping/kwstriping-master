import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { ProductKlassFragment } from '@core/api/graphql';
import { renderCollection } from '@core/ui/utils';
import { ProductKlassListUrlOrdering, productKlassUrl } from '@dashboard/oldSrc/productKlasses/urls';
import type { ListActions, ListProps, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colTax: {
        width: 300,
      },
      colType: {
        width: 300,
      },
    },
    colTax: {},
    colType: {},
    link: {
      cursor: 'pointer',
    },
  }),
  { name: 'ProductKlassList' }
);

interface ProductKlassListProps
  extends ListProps,
    ListActions,
    SortPage<ProductKlassListUrlOrdering> {
  productKlasses: ProductKlassFragment[];
}

const numberOfColumns = 4;

const ProductKlassList: FC<ProductKlassListProps> = (props) => {
  const {
    disabled,
    productKlasses,
    onSort,
    isChecked,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
  } = props;
  const styles = useStyles(props);

  const { t } = useTranslation();

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={productKlasses}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === ProductKlassListUrlOrdering.name
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(ProductKlassListUrlOrdering.name)}
        >
          {t('dashboard.productKlassName', 'Type Name')}
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === ProductKlassListUrlOrdering.digital
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          onClick={() => onSort(ProductKlassListUrlOrdering.digital)}
          className={styles.colType ?? ''}
        >
          <>
            {/* product type is either simple or configurable */}

            {t('dashboard.yTwDR', 'Type')}
          </>
        </TableCellHeader>
        <TableCell className={styles.colTax ?? ''}>
          <>
            {t(
              '+Jgot0',
              'Tax class'
              // tax class for a product type
            )}
          </>
        </TableCell>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePaginationWithContext colSpan={numberOfColumns} />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          productKlasses,
          (productKlass) => {
            const isSelected = productKlass ? isChecked(productKlass.id) : false;
            return (
              <TableRow
                className={productKlass ? styles.link : undefined}
                hover={!!productKlass}
                key={productKlass ? productKlass.id : 'skeleton'}
                href={productKlass && productKlassUrl(productKlass.id)}
                selected={isSelected}
                data-test-id={'id-' + productKlass.id}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(productKlass.id)}
                  />
                </TableCell>
                <TableCell>
                  {productKlass ? (
                    <>
                      <span data-test-id="name">{productKlass.name}</span>
                      <Typography variant="caption">
                        {productKlass.hasVariants
                          ? t('dashboard.90t9n', 'Configurable')
                          : t('dashboard.Nb+dT', '')}
                      </Typography>
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.colType ?? ''}>
                  {productKlass.isShippingRequired !== undefined ? (
                    productKlass.isShippingRequired ? (
                      <>
                        <>
                          {/* product type */}

                          {t('dashboard.DTNND', 'Physical')}
                        </>
                      </>
                    ) : (
                      <>
                        <>
                          {/* product type */}

                          {t('dashboard.sdvmK', 'Digital')}
                        </>
                      </>
                    )
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.colTax ?? ''}>
                  {productKlass?.taxClass?.name ?? '-'}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {t('dashboard.nLsyM', 'No product types found')}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
ProductKlassList.displayName = 'ProductKlassList';
export default ProductKlassList;
