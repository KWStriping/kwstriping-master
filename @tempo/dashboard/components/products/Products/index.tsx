import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import type {
  ProductDetailsVariantFragment,
  ProductFragment,
  RefreshLimitsQuery,
  WarehouseFragment,
} from '@tempo/api/generated/graphql';
import { AttributeInputType } from '@tempo/api/generated/constants';
import type { Item } from '@glideapps/glide-data-grid';
import type { FC } from 'react';
import { useCallback, useMemo } from 'react';
import { getColumnData, getData, getError } from './utils';
import type { GetCellContentOpts } from '@tempo/dashboard/components/core/Datagrid/_Datagrid';
import Datagrid from '@tempo/dashboard/components/core/Datagrid/_Datagrid';
import type { DatagridChangeOpts } from '@tempo/dashboard/components/core/Datagrid/useDatagridChange';
import type { Choice } from '@tempo/dashboard/components/fields/SingleSelectField';
import type { ChannelData } from '@tempo/dashboard/oldSrc/channels/utils';
import EditIcon from '@tempo/dashboard/oldSrc/icons/Edit';
import type { ProductListError } from '@tempo/dashboard/oldSrc/products/ProductUpdate/handlers/errors';
// import { isLimitReached } from "@tempo/utils/limits";

interface ProductsProps {
  channels: ChannelData[];
  errors: ProductListError[];
  limits: RefreshLimitsQuery['shop']['limits'];
  variantAttributes: ProductFragment['productKlass']['variantAttributes'];
  variants: ProductDetailsVariantFragment[];
  warehouses: WarehouseFragment[];
  productName: string;
  onValuesSearch: (id: string, query: string) => Promise<Array<Choice<string, string>>>;
  onChange: (data: DatagridChangeOpts) => void;
  onRowClick: (id: string) => void;
}

export const Products: FC<ProductsProps> = ({
  channels,
  errors,
  variants,
  warehouses,
  variantAttributes,
  productName,
  onValuesSearch,
  onChange,
  onRowClick,
}) => {
  const columns = useMemo(
    () =>
      variantAttributes && warehouses && channels
        ? [
            'name',
            'sku',
            'trackInventory',
            ...channels.flatMap((channel) => [
              `availableInChannel:${channel.id}`,
              `channel:${channel.id}`,
            ]),
            ...warehouses.map((warehouse) => `stock:${warehouse.id}`),
            ...variantAttributes
              .filter(
                (attribute) =>
                  attribute?.inputType &&
                  [AttributeInputType.Dropdown, AttributeInputType.PlainText].includes(
                    attribute.inputType
                  )
              )
              .map((attribute) => `attribute:${attribute.id}`),
          ].map((fieldName) =>
            getColumnData(fieldName, channels, warehouses, variantAttributes, t)
          )
        : [],
    [variantAttributes, warehouses, channels, t]
  );

  const getCellContent = useCallback(
    ([column, row]: Item, opts: GetCellContentOpts) =>
      getData({
        availableColumns: columns,
        column,
        row,
        channels,
        variants,
        searchValues: onValuesSearch,
        ...opts,
      }),
    [columns, variants]
  );

  const getCellError = useCallback(
    ([column, row]: Item, opts: GetCellContentOpts) =>
      getError(errors, {
        availableColumns: columns,
        column,
        row,
        channels,
        variants,
        searchValues: onValuesSearch,
        ...opts,
      }),
    [columns, variants, errors]
  );

  return (
    <Datagrid
      addButtonLabel={m.dashboard_C_Nj_() ?? 'Add variant'}
      availableColumns={columns}
      emptyText={m.dashboard_empty() ?? 'Use button above to add new product variants'}
      getCellContent={getCellContent}
      getCellError={getCellError}
      menuItems={(index) => [
        {
          label: 'Edit Variant',
          // eslint-disable-next-line ts/no-non-null-assertion
          onSelect: () => variants[index] && onRowClick(variants[index]!.id),
          Icon: <EditIcon />,
        },
      ]}
      rows={variants?.length ?? 0}
      selectionActions={(indexes, { removeRows }) => (
        <Button color="secondary" onClick={() => removeRows(indexes)}>
          {m.dashboard_delete() ?? 'Delete'}
        </Button>
      )}
      title={m.dashboard_title() ?? 'Variants'}
      fullScreenTitle={
        m.dashboard_fullScreenTitle({
          name: productName,
        }) ?? 'Variants for: {{name}}'
      }
      onChange={onChange}
    />
  );
};
Products.displayName = 'Products';
export default Products;
