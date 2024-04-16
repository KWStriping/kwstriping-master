import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import type { GetCellContentOpts } from '@dashboard/components/core/Datagrid/_Datagrid';
import Datagrid from '@dashboard/components/core/Datagrid/_Datagrid';
import type { DatagridChangeOpts } from '@dashboard/components/core/Datagrid/useDatagridChange';
import type { Choice } from '@dashboard/components/fields/SingleSelectField';
import type {
  ProductDetailsVariantFragment,
  ProductFragment,
  RefreshLimitsQuery,
  WarehouseFragment,
} from '@core/api/graphql';
import { AttributeInputType } from '@core/api/constants';
import type { ChannelData } from '@dashboard/oldSrc/channels/utils';
import EditIcon from '@dashboard/oldSrc/icons/Edit';
import type { ProductListError } from '@dashboard/oldSrc/products/ProductUpdate/handlers/errors';
import type { Item } from '@glideapps/glide-data-grid';
import type { FC } from 'react';
import { useCallback, useMemo } from 'react';
// import { isLimitReached } from "@tempo/utils/limits";

import { getColumnData, getData, getError } from './utils';

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
  const { t } = useTranslation();

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
      addButtonLabel={t('dashboard.C3Nj5', 'Add variant')}
      availableColumns={columns}
      emptyText={t('dashboard.empty', 'Use button above to add new product variants')}
      getCellContent={getCellContent}
      getCellError={getCellError}
      menuItems={(index) => [
        {
          label: 'Edit Variant',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onSelect: () => variants[index] && onRowClick(variants[index]!.id),
          Icon: <EditIcon />,
        },
      ]}
      rows={variants?.length ?? 0}
      selectionActions={(indexes, { removeRows }) => (
        <Button color="secondary" onClick={() => removeRows(indexes)}>
          {t('dashboard.delete', 'Delete')}
        </Button>
      )}
      title={t('dashboard.title', 'Variants')}
      fullScreenTitle={t('dashboard.fullScreenTitle', 'Variants for: {{name}}', {
        name: productName,
      })}
      onChange={onChange}
    />
  );
};
Products.displayName = 'Products';
export default Products;
