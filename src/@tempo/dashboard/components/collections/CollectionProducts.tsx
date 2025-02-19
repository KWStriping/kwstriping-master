import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { makeStyles } from '@tempo/ui/theme/styles';

import type { CollectionDetailsQuery } from '@tempo/api/generated/graphql';
import { renderCollection } from '@tempo/ui/utils';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import { ChannelsAvailabilityDropdown } from '@tempo/dashboard/components/channels/ChannelsAvailabilityDropdown';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import { TableButtonWrapper } from '@tempo/dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import { AVATAR_MARGIN } from '@tempo/dashboard/components/tables/TableCellAvatar/Avatar';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import { productUrl } from '@tempo/dashboard/oldSrc/products/urls';
import type { ListActions, PageListProps } from '@tempo/dashboard/oldSrc/types';
import type { ReactNode, FC, MouseEvent } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    colActions: {
      width: `calc(76px + ${theme.spacing(1)})`,
      marginRight: theme.spacing(-2),
    },
    colName: {
      width: 'auto',
    },
    colNameLabel: {
      marginLeft: AVATAR_MARGIN,
    },
    colPublished: {
      width: 200,
    },
    colType: {
      width: 200,
    },
    table: {
      tableLayout: 'fixed',
    },
    tableRow: {
      cursor: 'pointer',
    },
  }),
  { name: 'CollectionProducts' }
);

export interface CollectionProductsProps extends PageListProps, ListActions {
  collection: CollectionDetailsQuery['collection'];
  onProductUnassign: (id: string, event: MouseEvent<unknown>) => void;
  onAdd: () => void;
}

const CollectionProducts: FC<CollectionProductsProps> = (props) => {
  const {
    collection,
    disabled,
    onAdd,
    onProductUnassign,
    isChecked,
    selected,
    toggle,
    toggleAll,
    toolbar,
  } = props;
  const styles = useStyles(props);
  const products = mapEdgesToItems(collection?.products);
  const numberOfColumns = products?.length === 0 ? 4 : 5;

  return (
    <Card>
      <CardTitle
        title={
          collection ? (
            (m._dnWE_({
              name: collection.name ?? '...',
            }) ?? 'Products in {name}')
          ) : (
            <Skeleton />
          )
        }
        toolbar={
          <Button
            data-test-id="add-product"
            disabled={disabled}
            color="secondary"
            onClick={onAdd}
          >
            <>
              {/* button */}

              {m.dashboard_cHVdW() ?? 'Assign product'}
            </>
          </Button>
        }
      />
      <ResponsiveTable className={styles.table ?? ''}>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={mapEdgesToItems(collection?.products)}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCell className={styles.colName ?? ''}>
            <span className={styles.colNameLabel ?? ''}>
              <>
                {/* product name */}

                {m.dashboard_AMFki() ?? 'Name'}
              </>
            </span>
          </TableCell>
          <TableCell className={styles.colType ?? ''}>
            <>
              {t(
                'dashboard_+HcTv',
                'Type'
                // product type
              )}
            </>
          </TableCell>
          <TableCell className={styles.colPublished ?? ''}>
            <>
              {/* product availability */}

              {m.dashboard_e__bR() ?? 'Availability'}
            </>
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
            products,
            (product) => {
              const isSelected = product ? isChecked(product.id) : false;

              return (
                <TableRow
                  className={styles.tableRow ?? ''}
                  hover={!!product}
                  href={product && productUrl(product.id)}
                  key={product ? product.id : 'skeleton'}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(product.id)}
                    />
                  </TableCell>
                  <TableCellAvatar
                    className={styles.colName ?? ''}
                    thumbnail={product.thumbnail.url}
                  >
                    {maybe<ReactNode>(() => product.name, <Skeleton />)}
                  </TableCellAvatar>
                  <TableCell className={styles.colType ?? ''}>
                    {maybe<ReactNode>(() => product.productKlass.name, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colType ?? ''}>
                    {product && !product?.channelListings?.length ? (
                      '-'
                    ) : product?.channelListings !== undefined ? (
                      <ChannelsAvailabilityDropdown channels={product?.channelListings} />
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={styles.colActions ?? ''}>
                    <TableButtonWrapper>
                      <IconButton
                        data-test-id="delete-icon"
                        color="secondary"
                        disabled={!product}
                        onClick={(event) => onProductUnassign(product.id, event)}
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
                  {m.dashboard__Uzbb() ?? 'No products found'}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

CollectionProducts.displayName = 'CollectionProducts';
export default CollectionProducts;
