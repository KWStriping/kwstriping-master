import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import { renderCollection } from '@core/ui/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import { TableButtonWrapper } from '@dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { SaleDetailsFragment, VoucherDetailsFragment } from '@core/api/graphql';
import { collectionUrl } from '@dashboard/oldSrc/collections/urls';
import { maybe } from '@dashboard/oldSrc/misc';
import type { ListActions, ListProps } from '@dashboard/oldSrc/types';
import { mapEdgesToItems } from '@core/ui/utils/maps';
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

  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t('dashboard.discountCollectionsHeader', 'Eligible Collections')}
        toolbar={
          <Button onClick={onCollectionAssign}>
            {t('dashboard.discountCollectionsButton', 'Assign collections')}
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
            {t('dashboard.discountCollectionsTableProductHeader', 'Collection Name')}
          </TableCell>
          <TableCell className={styles.colProducts ?? ''}>
            {t('dashboard.discountCollectionsTableProductNumber', 'Products')}
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
                  {t('dashboard.discountCollectionsNotFound', 'No collections found')}
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
