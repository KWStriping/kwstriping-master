import type { GridCell } from '@glideapps/glide-data-grid';
import { sentenceCase } from 'change-case';
import type { TFunction } from '@core/i18n';
import type { MutableRefObject } from 'react';
import {
  booleanCell,
  dropdownCell,
  moneyCell,
  numberCell,
  textCell,
} from '@dashboard/components/core/Datagrid/cells';
import { emptyDropdownCellValue } from '@dashboard/components/core/Datagrid/DropdownCell';
import { numberCellEmptyValue } from '@dashboard/components/core/Datagrid/NumberCell';
import type { AvailableColumn } from '@dashboard/components/core/Datagrid/types';
import type {
  DatagridChange,
  DatagridChangeOpts,
} from '@dashboard/components/core/Datagrid/useDatagridChange';
import type { Choice } from '@dashboard/components/fields/SingleSelectField';
import type {
  ProductDetailsVariantFragment,
  ProductFragment,
  VariantDatagridChannelListingUpdateMutationVariables,
  VariantDatagridStockUpdateMutationVariables,
  VariantDatagridUpdateMutationVariables,
  WarehouseFragment,
} from '@core/api/graphql';
import type { ChannelData } from '@dashboard/oldSrc/channels/utils';
import type { ProductListError } from '@dashboard/oldSrc/products/ProductUpdate/handlers/errors';
import { mapNodeToChoice } from '@dashboard/oldSrc/utils/maps';

import {
  getColumnAttribute,
  getColumnChannel,
  getColumnChannelAvailability,
  getColumnStock,
} from './columnData';
import { getVariantChannelsInputs } from './getVariantChannelsInputs';

import messages from './messages';

export function getVariantInput(data: DatagridChangeOpts, index: number) {
  const attributes = data?.updates
    .filter(
      (change) =>
        getColumnAttribute(change.column) &&
        change.row === index + data?.removed?.filter((r) => r <= index).length
    )
    .map((change) => {
      const attributeId = getColumnAttribute(change.column);

      return {
        id: attributeId,
        values: [change.data?.value?.value],
      };
    });

  const sku = data?.updates?.find(
    (change) =>
      change.column === 'sku' &&
      change.row === index + data?.removed?.filter((r) => r <= index).length
  )?.data;

  const name = data?.updates?.find(
    (change) =>
      change.column === 'name' &&
      change.row === index + data?.removed?.filter((r) => r <= index).length
  )?.data;

  const trackInventory = data?.updates?.find(
    (change) =>
      change.column === 'trackInventory' &&
      change.row === index + data?.removed?.filter((r) => r <= index).length
  )?.data;

  return {
    attributes,
    sku,
    name,
    trackInventory,
  };
}

export function getVariantInputs(
  variants: ProductFragment['variants'],
  data: DatagridChangeOpts
): VariantDatagridUpdateMutationVariables[] {
  const whitelist = ['sku', 'name', 'trackInventory'] as const;
  let inputs = variants?.map(
    (variant, variantIndex): VariantDatagridUpdateMutationVariables => ({
      id: variant.id,
      input: getVariantInput(data, variantIndex),
    })
  );
  inputs = inputs?.filter(
    (variables) =>
      whitelist.some((key) => typeof variables.input[key] !== 'undefined') ||
      !!variables.input.attributes?.length
  );
  return inputs ?? [];
}

export function getStockInputs(data: DatagridChangeOpts, index: number) {
  const stockChanges = data?.updates?.filter((change) => getColumnStock(change.column));

  const variantChanges = stockChanges
    .filter((change) => change.row === index + data?.removed?.filter((r) => r <= index).length)
    .map((change) => ({
      warehouse: getColumnStock(change.column),
      quantity: change.data?.value,
    }));

  return {
    stocks: variantChanges.filter((change) => change.quantity !== numberCellEmptyValue),
    removeStocks: variantChanges
      .filter((change) => change.quantity === numberCellEmptyValue)
      .map(({ warehouse }) => warehouse),
  };
}

export function getStocks(
  variants: ProductFragment['variants'],
  data: DatagridChangeOpts
): VariantDatagridStockUpdateMutationVariables[] {
  const stocks = variants?.map((variant, variantIndex) => ({
    id: variant.id,
    ...getStockInputs(data, variantIndex),
  }));
  return (
    stocks?.filter((variables) => !!variables.removeStocks.length || !!variables.stocks.length) ??
    []
  );
}

export function getVariantChannels(
  variants: ProductFragment['variants'],
  data: DatagridChangeOpts
): VariantDatagridChannelListingUpdateMutationVariables[] {
  return variants
    .map((variant, variantIndex) => ({
      id: variant.id,
      input: getVariantChannelsInputs(data, variantIndex),
    }))
    .filter(({ input }) => !!input.length);
}

function errorMatchesColumn(error: ProductListError, columnId: string): boolean {
  if (error.type === 'channel') {
    return (
      error.channelIds.includes(getColumnChannel(columnId)) ||
      error.channelIds.includes(getColumnChannelAvailability(columnId))
    );
  }

  if (error.type === 'stock') {
    return error.warehouseId.includes(getColumnStock(columnId));
  }

  if (error.type === 'variantData') {
    if (error.attributes?.length) {
      return error.attributes?.includes(getColumnAttribute(columnId));
    }
    return columnId === 'sku';
  }
}

export function getError(
  errors: ProductListError[],
  { availableColumns, removed, column, row, variants }: GetDataOrError
): boolean {
  if (column === -1) {
    return false;
  }

  const columnId = availableColumns[column].id;
  const productId = variants[row + removed.filter((r) => r <= row).length]?.id;

  if (!productId) {
    return errors.some((err) => err.type === 'create' && err.index === row - variants.length);
  }

  return errors.some(
    (err) =>
      err.type !== 'create' && err.productId === productId && errorMatchesColumn(err, columnId)
  );
}

interface GetDataOrError {
  availableColumns: AvailableColumn[];
  column: number;
  row: number;
  variants: ProductDetailsVariantFragment[];
  changes: MutableRefObject<DatagridChange[]>;
  channels: ChannelData[];
  added: number[];
  removed: number[];
  searchValues: (id: string, text: string) => Promise<Array<Choice<string, string>>>;
  getChangeIndex: (column: string, row: number) => number;
}

export function getData({
  availableColumns,
  changes,
  added,
  removed,
  column,
  getChangeIndex,
  row,
  channels,
  variants,
  searchValues,
}: GetDataOrError): GridCell {
  // For some reason it happens when user deselects channel
  if (column === -1) return textCell('');
  const columnId = availableColumns[column]?.id;
  if (!columnId) throw new Error(`No column ID found for column at index ${column}`);
  const dataRow = added.includes(row)
    ? undefined
    : variants[row + removed.filter((r) => r <= row).length];
  const change = changes.current[getChangeIndex(columnId, row)]?.data;

  // console.log("dataRow", dataRow);
  if (change) console.log('change', change);

  switch (columnId) {
    case 'trackInventory': {
      const value: boolean = change ?? (dataRow ? dataRow[columnId] : true);
      return booleanCell(value);
    }
    case 'name':
    case 'sku': {
      const value = change ?? (dataRow ? dataRow[columnId] : '');
      return textCell(value || '');
    }
  }

  if (getColumnStock(columnId)) {
    const value =
      change?.value ??
      dataRow?.stocks?.find((stock) => stock.warehouse.id === getColumnStock(columnId))
        ?.quantity ??
      numberCellEmptyValue;

    return numberCell(value);
  }

  if (getColumnChannel(columnId)) {
    const channelId = getColumnChannel(columnId);
    const listing = dataRow?.channelListings?.find((listing) => listing.channel.id === channelId);
    const available =
      changes.current[getChangeIndex(`availableInChannel:${channelId}`, row)]?.data ?? !!listing;

    if (!available) {
      return {
        ...numberCell(numberCellEmptyValue),
        readonly: false,
        allowOverlay: false,
      };
    }

    const currency = channels.find((channel) => channelId === channel.id)?.currency;
    const value = change?.value ?? listing?.price?.amount ?? 0;

    return moneyCell(value, currency);
  }

  if (getColumnChannelAvailability(columnId)) {
    const channelId = getColumnChannelAvailability(columnId);
    const listing = dataRow?.channelListings?.find((listing) => listing.channel.id === channelId);
    const value = change ?? !!listing;

    return booleanCell(value);
  }

  if (getColumnAttribute(columnId)) {
    const value =
      change?.value ??
      mapNodeToChoice(
        dataRow?.attributes.find(
          (attribute) => attribute.attribute.id === getColumnAttribute(columnId)
        )?.values
      )[0] ??
      emptyDropdownCellValue;

    return dropdownCell(value, {
      allowCustomValues: true,
      emptyOption: true,
      update: (text) => searchValues(getColumnAttribute(columnId), text),
    });
  }
  throw new Error(`Unknown column ID: ${columnId}`);
}

export function getColumnData(
  name: string,
  channels: ChannelData[],
  warehouses: WarehouseFragment[],
  variantAttributes: ProductFragment['productKlass']['variantAttributes'],
  t: TFunction
): AvailableColumn {
  const common = {
    id: name,
    width: 200,
    // Now we don't weirdly merge top-left header with the frozen column (name),
    // leaving rest unnamed group columns (sku in this case) unmerged
    group: ' ',
  };

  if (['name', 'sku', 'trackInventory'].includes(name)) {
    return {
      ...common,
      title: t(name, messages[name as keyof typeof messages] ?? sentenceCase(name)),
    };
  }

  if (getColumnStock(name)) {
    return {
      ...common,
      width: 100,
      title: warehouses.find((warehouse) => warehouse.id === getColumnStock(name))?.name,
      group: t('dashboard.warehouses', 'Warehouses'),
    };
  }

  if (getColumnChannel(name)) {
    const channel = channels.find((channel) => channel.id === getColumnChannel(name));
    return {
      ...common,
      width: 150,
      title: t('dashboard.price', 'Price'),
      group: channel.name,
    };
  }

  if (getColumnChannelAvailability(name)) {
    const channel = channels.find((channel) => channel.id === getColumnChannelAvailability(name));
    return {
      ...common,
      width: 80,
      title: t('dashboard.vailable', 'Available'),
      group: channel.name,
    };
  }

  if (getColumnAttribute(name)) {
    return {
      ...common,
      title: variantAttributes.find((attribute) => attribute.id === getColumnAttribute(name))
        ?.name,
      group: t('dashboard.attributes', 'Attributes'),
    };
  }

  throw new Error(`Unknown column: ${name}`);
}
