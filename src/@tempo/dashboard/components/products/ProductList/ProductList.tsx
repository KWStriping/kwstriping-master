// import Link from '@tempo/ui/components/Link';
import * as m from '@paraglide/messages';
import Pill from '@tempo/ui/components/pill/Pill';
import { ChannelsAvailabilityDropdown } from '@tempo/dashboard/components/channels/ChannelsAvailabilityDropdown';
import {
  getChannelAvailabilityColor,
  getChannelAvailabilityLabel,
} from '@tempo/dashboard/components/channels/ChannelsAvailabilityDropdown/utils';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import Date from '@tempo/dashboard/components/core/Date';
import MoneyRange from '@tempo/dashboard/components/core/MoneyRange';
import {
  getAttributeIdFromColumnValue,
  isAttributeColumnValue,
} from '@tempo/dashboard/components/products/ProductListPage/utils';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import TooltipTableCellHeader from '@tempo/dashboard/components/tables/TooltipTableCellHeader';
import type { GridAttributesQuery, ProductListQuery } from '@tempo/api/generated/graphql';
import type { ProductListColumns } from '@tempo/dashboard/oldSrc/config';
import { renderCollection } from '@tempo/ui/utils';
import { canBeSorted } from '@tempo/dashboard/oldSrc/products/sort';
import { ProductListUrlOrdering, productUrl } from '@tempo/dashboard/oldSrc/products/urls';
import type {
  ChannelProps,
  ListActions,
  ListProps,
  RelayToFlat,
  SortPage,
} from '@tempo/dashboard/oldSrc/types';
import type { DisplayColumnProps } from '@tempo/dashboard/oldSrc/utils/columns/DisplayColumn';
import TDisplayColumn from '@tempo/dashboard/oldSrc/utils/columns/DisplayColumn';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';

import styles from './index.module.css';
import ProductListAttribute from './ProductListAttribute';

const DisplayColumn = TDisplayColumn as FC<DisplayColumnProps<ProductListColumns>>;

interface ProductListProps
  extends ListProps<ProductListColumns>,
    ListActions,
    SortPage<ProductListUrlOrdering>,
    ChannelProps {
  activeAttributeSortId: string;
  gridAttributes: RelayToFlat<NonNullable<GridAttributesQuery['grid']>>;
  products: RelayToFlat<NonNullable<ProductListQuery['products']>>;
}

export const ProductList: FC<ProductListProps> = (props) => {
  const {
    activeAttributeSortId,
    settings,
    disabled,
    isChecked,
    gridAttributes,
    products,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
    onUpdateListSettings,
    onSort,
    selectedChannelId,
    filterDependency,
  } = props;
  const gridAttributesFromSettings = settings.columns?.filter(isAttributeColumnValue);
  const numberOfColumns = (products?.length === 0 ? 1 : 2) + settings.columns.length;

  return (
    <div className={styles.tableContainer ?? ''}>
      <ResponsiveTable className={styles.table ?? ''}>
        <colgroup>
          {products?.length !== 0 && <col />}
          <col className={styles.colName ?? ''} />
          <DisplayColumn column="productKlass" displayColumns={settings.columns}>
            <col className={styles.colType ?? ''} />
          </DisplayColumn>
          <DisplayColumn column="availability" displayColumns={settings.columns}>
            <col className={styles.colPublished ?? ''} />
          </DisplayColumn>
          {gridAttributesFromSettings?.map((gridAttribute) => (
            <col className={styles.colAttribute ?? ''} key={gridAttribute} />
          ))}
          <DisplayColumn column="date" displayColumns={settings.columns}>
            <col className={styles.colDate ?? ''} />
          </DisplayColumn>
          <DisplayColumn column="price" displayColumns={settings.columns}>
            <col className={styles.colPrice ?? ''} />
          </DisplayColumn>
        </colgroup>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={products}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader
            data-test-id="col-name-header"
            arrowPosition="right"
            className={clsx(styles.colName, settings.columns?.length > 4 && styles.colNameFixed)}
            direction={
              sort.sort === ProductListUrlOrdering.name
                ? getArrowDirection(!!sort.asc)
                : undefined
            }
            onClick={() => onSort(ProductListUrlOrdering.name)}
          >
            <span className={styles.colNameHeader ?? ''}>
              {m.dashboard_productNameColumnHeader() ?? 'Name'}
            </span>
          </TableCellHeader>
          <DisplayColumn column="productKlass" displayColumns={settings.columns}>
            <TableCellHeader
              data-test-id="col-type-header"
              className={styles.colType ?? ''}
              direction={
                sort.sort === ProductListUrlOrdering.productKlass
                  ? getArrowDirection(!!sort.asc)
                  : undefined
              }
              onClick={() => onSort(ProductListUrlOrdering.productKlass)}
            >
              {m.dashboard_type() ?? 'Type'}
            </TableCellHeader>
          </DisplayColumn>
          <DisplayColumn column="availability" displayColumns={settings.columns}>
            <TooltipTableCellHeader
              data-test-id="col-availability-header"
              className={styles.colPublished ?? ''}
              direction={
                sort.sort === ProductListUrlOrdering.status
                  ? getArrowDirection(!!sort.asc)
                  : undefined
              }
              onClick={() => onSort(ProductListUrlOrdering.status)}
              disabled={!canBeSorted(ProductListUrlOrdering.status, !!selectedChannelId)}
              tooltip={(m.dashboard_noFilterSelected() ?? 'Sorting by this column requires active filter: {{filterName}}',
                {
                  filterName: filterDependency.label,
                }
              )}
            >
              {m.dashboard_vailability() ?? 'Availability'}
            </TooltipTableCellHeader>
          </DisplayColumn>
          {gridAttributesFromSettings?.map((gridAttributeFromSettings) => {
            const attributeId = getAttributeIdFromColumnValue(gridAttributeFromSettings);

            return (
              <TableCellHeader
                className={styles.colAttribute ?? ''}
                direction={
                  sort.sort === ProductListUrlOrdering.attribute &&
                  attributeId === activeAttributeSortId
                    ? getArrowDirection(!!sort.asc)
                    : undefined
                }
                onClick={() => onSort(ProductListUrlOrdering.attribute, attributeId)}
                key={gridAttributeFromSettings}
              >
                {gridAttributes.find((gridAttribute) => attributeId === gridAttribute.id)
                  .name ?? <Skeleton />}
              </TableCellHeader>
            );
          })}
          <DisplayColumn column="date" displayColumns={settings.columns}>
            <TableCellHeader
              data-test-id="col-date-header"
              className={styles.colDate ?? ''}
              direction={
                sort.sort === ProductListUrlOrdering.date
                  ? getArrowDirection(!!sort.asc)
                  : undefined
              }
              onClick={() => onSort(ProductListUrlOrdering.date)}
            >
              {m.dashboard_updatedAt() ?? 'Last updated'}
            </TableCellHeader>
          </DisplayColumn>
          <DisplayColumn column="price" displayColumns={settings.columns}>
            <TooltipTableCellHeader
              data-test-id="col-price-header"
              className={styles.colPrice ?? ''}
              direction={
                sort.sort === ProductListUrlOrdering.price
                  ? getArrowDirection(!!sort.asc)
                  : undefined
              }
              textAlign="right"
              onClick={() => onSort(ProductListUrlOrdering.price)}
              disabled={!canBeSorted(ProductListUrlOrdering.price, !!selectedChannelId)}
              tooltip={(m.dashboard_noFilterSelected() ?? 'Sorting by this column requires active filter: {{filterName}}',
                {
                  filterName: filterDependency.label,
                }
              )}
            >
              {m.dashboard_price() ?? 'Price'}
            </TooltipTableCellHeader>
          </DisplayColumn>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePaginationWithContext
              colSpan={numberOfColumns}
              settings={settings}
              onUpdateListSettings={onUpdateListSettings}
            />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            products,
            (product) => {
              const isSelected = product ? isChecked(product.id) : false;
              const channel = product?.channelListings?.find(
                (listing) => listing.channel.id === selectedChannelId
              );

              return (
                <TableRow
                  selected={isSelected}
                  hover={!!product}
                  key={product ? product.id : 'skeleton'}
                  className={styles.link ?? ''}
                  data-test-id={'id-' + (product ? product?.id : 'skeleton')}
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
                    className={styles.colAvatar ?? ''}
                    thumbnail={product.thumbnail?.url}
                  >
                    {product?.name ? (
                      <Link href={productUrl(product.id)}>
                        <span data-test-id="name">{product.name}</span>
                      </Link>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCellAvatar>
                  <DisplayColumn column="productKlass" displayColumns={settings.columns}>
                    <TableCell className={styles.colType ?? ''} data-test-id="product-type">
                      {product?.productKlass?.name ? (
                        <Link href={productUrl(product.id)}>{product.productKlass.name}</Link>
                      ) : (
                        <Skeleton />
                      )}
                    </TableCell>
                  </DisplayColumn>
                  <DisplayColumn column="availability" displayColumns={settings.columns}>
                    <TableCell
                      className={styles.colPublished ?? ''}
                      data-test-id="availability"
                      data-test-availability={!!product?.channelListings?.length}
                    >
                      {(product &&
                        (channel ? (
                          <Pill
                            label={m[getChannelAvailabilityLabel(channel])}
                            color={getChannelAvailabilityColor(channel)}
                          />
                        ) : (
                          <ChannelsAvailabilityDropdown channels={product?.channelListings} />
                        ))) ?? <Skeleton />}
                    </TableCell>
                  </DisplayColumn>
                  {gridAttributesFromSettings?.map((gridAttribute) => (
                    <TableCell
                      className={styles.colAttribute ?? ''}
                      key={gridAttribute}
                      data-test-id="attribute"
                      data-test-attribute={getAttributeIdFromColumnValue(gridAttribute)}
                    >
                      <ProductListAttribute
                        attribute={gridAttribute}
                        productAttributes={product?.attributes}
                      />
                    </TableCell>
                  ))}
                  <DisplayColumn column="date" displayColumns={settings.columns}>
                    <TableCell className={styles.colDate ?? ''} data-test-id="date">
                      {product?.updatedAt ? <Date date={product.updatedAt} /> : <Skeleton />}
                    </TableCell>
                  </DisplayColumn>
                  <DisplayColumn column="price" displayColumns={settings.columns}>
                    <TableCell className={styles.colPrice ?? ''} data-test-id="price">
                      {product?.channelListings ? (
                        <MoneyRange
                          from={channel?.pricing?.priceRange?.start?.net}
                          to={channel?.pricing?.priceRange?.stop?.net}
                        />
                      ) : (
                        <Skeleton />
                      )}
                    </TableCell>
                  </DisplayColumn>
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
    </div>
  );
};
ProductList.displayName = 'ProductList';
export default ProductList;
