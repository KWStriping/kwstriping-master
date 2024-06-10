import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import { renderCollection } from '@tempo/ui/utils';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import { TableButtonWrapper } from '@tempo/dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import type { SaleDetailsFragment, VoucherDetailsFragment } from '@tempo/api/generated/graphql';
import { collectionUrl } from '@tempo/dashboard/oldSrc/collections/urls';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import type { ListActions, ListProps } from '@tempo/dashboard/oldSrc/types';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';

export interface DiscountCollectionsProps extends ListProps, ListActions {
  discount: SaleDetailsFragment | VoucherDetailsFragment;
  onCollectionAssign: () => void;
  onCollectionUnassign: (id: string) => void;
}

const numberOfColumns = 4;

const DiscountCollections: FC<DiscountCollectionsProps> = (props) => {
  const {
    discount: sale,
    disabled,
    onCollectionAssign,
    onCollectionUnassign,
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
        title={m.dashboard_discountCollectionsHeader() ?? 'Eligible Collections'}
        toolbar={
          <Button onClick={onCollectionAssign}>
            {m.dashboard_discountCollectionsButton() ?? 'Assign collections'}
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
          items={mapEdgesToItems(sale?.collections)}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCell className={styles.colName ?? ''}>
            {m.dashboard_discountCollectionsTableProductHeader() ?? 'Collection Name'}
          </TableCell>
          <TableCell className={styles.colProducts ?? ''}>
            {m.dashboard_discountCollectionsTableProductNumber() ?? 'Products'}
          </TableCell>
          <TableCell />
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePaginationWithContext colSpan={numberOfColumns} />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            mapEdgesToItems(sale?.collections),
            (collection) => {
              const isSelected = collection ? isChecked(collection.id) : false;
              return (
                <TableRow
                  selected={isSelected}
                  hover={!!collection}
                  key={collection ? collection.id : 'skeleton'}
                  href={collection && collectionUrl(collection.id)}
                  className={styles.tableRow ?? ''}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(collection.id)}
                    />
                  </TableCell>
                  <TableCell className={styles.colName ?? ''}>
                    {maybe<ReactNode>(() => collection.name, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colProducts ?? ''}>
                    {maybe<ReactNode>(() => collection.products.totalCount, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colActions ?? ''}>
                    <TableButtonWrapper>
                      <IconButton
                        color="secondary"
                        disabled={!collection || disabled}
                        onClick={(event) => {
                          event.stopPropagation();
                          onCollectionUnassign(collection.id);
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
                  {m.dashboard_discountCollectionsNotFound() ?? 'No collections found'}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
DiscountCollections.displayName = 'DiscountCollections';
export default DiscountCollections;
