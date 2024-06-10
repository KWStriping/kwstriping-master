import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import { SortableTableBody, SortableTableRow } from '@tempo/dashboard/components/tables/SortableTable';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import type { ProductCreateDataQuery, ProductDetailsQuery } from '@tempo/api/generated/graphql';

import { renderCollection } from '@tempo/ui/utils';
import { productVariantAddUrl, productVariantEditUrl } from '@tempo/dashboard/oldSrc/products/urls';
import type { ReorderAction } from '@tempo/dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';
import type { FC } from 'react';

interface ProductNavigationProps {
  current?: string;
  defaultVariantId?: string;
  fallbackThumbnail: string;
  productId: string;
  isCreate?: boolean;
  variants:
    | Array<ProductDetailsQuery['productVariant']>
    | ProductCreateDataQuery['product']['variants'];
  onReorder: ReorderAction;
}

const ProductNavigation: FC<ProductNavigationProps> = (props) => {
  const {
    current,
    defaultVariantId,
    fallbackThumbnail,
    productId,
    isCreate,
    variants,
    onReorder,
  } = props;

  return (
    <Card>
      <CardTitle title={m.dashboard_variants() ?? 'Variants'} />
      <ResponsiveTable>
        <SortableTableBody onSortEnd={onReorder}>
          {renderCollection(variants, (variant, variantIndex) => {
            const isDefault = variant && variant.id === defaultVariantId;
            const isActive = variant && variant.id === current;
            const thumbnail = variant?.media?.filter((mediaObj) => mediaObj.type === 'IMAGE')[0];

            return (
              <SortableTableRow
                hover={!!variant}
                key={variant ? variant.id : 'skeleton'}
                index={variantIndex || 0}
                className={clsx(styles.link, isActive && styles.rowActive)}
                href={variant ? productVariantEditUrl(productId, variant.id) : undefined}
              >
                <TableCellAvatar
                  className={styles.colAvatar ?? ''}
                  thumbnail={thumbnail?.url || fallbackThumbnail}
                />
                <TableCell className={styles.colName ?? ''}>
                  {variant ? variant.name || variant.sku : <Skeleton />}
                  {isDefault && (
                    <span className={styles.defaultVariant ?? ''}>
                      {m.dashboard_efaultVariant() ?? 'Default'}
                    </span>
                  )}
                </TableCell>
              </SortableTableRow>
            );
          })}
          {!isCreate ? (
            <TableRow className={styles.rowNew ?? ''}>
              <TableCell colSpan={3}>
                <Button href={productVariantAddUrl(productId)} data-test-id="button-add-variant">
                  {m.dashboard_addVariant() ?? 'Add variant'}
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCellAvatar
                alignRight
                className={clsx(
                  styles.colAvatar ?? '',
                  styles.rowActive ?? '',
                  styles.noHandle ?? '',
                  variants?.length === 0 && styles.firstVariant
                )}
                thumbnail={null}
                colSpan={2}
              />
              <TableCell className={styles.colName ?? ''}>
                {m.dashboard_ewVariant() ?? 'New variant'}
              </TableCell>
            </TableRow>
          )}
        </SortableTableBody>
      </ResponsiveTable>
    </Card>
  );
};
ProductNavigation.displayName = 'ProductNavigation';
export default ProductNavigation;
