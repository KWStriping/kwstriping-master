import type { GridCell } from '@glideapps/glide-data-grid';
import { GridCellKind } from '@glideapps/glide-data-grid';

import type { DropdownCell, DropdownCellContentProps, DropdownChoice } from './DropdownCell';
import type { MoneyCell } from './MoneyCell';
import { numberCellEmptyValue } from '@tempo/dashboard/components/core/Datagrid/NumberCell';
import type { NumberCell } from '@tempo/dashboard/components/core/Datagrid/NumberCell';

const common = {
  allowOverlay: true,
  readonly: false,
};

export function textCell(value: string): GridCell {
  return {
    ...common,
    data: value,
    displayData: value,
    kind: GridCellKind.Text,
  };
}

export function booleanCell(value: boolean): GridCell {
  return {
    ...common,
    allowOverlay: false,
    kind: GridCellKind.Boolean,
    data: value,
  };
}

export function numberCell(value: number | typeof numberCellEmptyValue): NumberCell {
  return {
    ...common,
    data: {
      kind: 'number-cell',
      value,
    },
    kind: GridCellKind.Custom,
    copyData: value !== numberCellEmptyValue ? value.toString() : '',
  };
}

export function moneyCell(value: number | null, currency: string): MoneyCell {
  return {
    ...common,
    kind: GridCellKind.Custom,
    data: {
      kind: 'money-cell',
      value,
      currency,
    },
    copyData: value?.toString() ?? '',
  };
}

export function dropdownCell(
  value: DropdownChoice,
  opts: DropdownCellContentProps &
    ({ choices: DropdownChoice[] } | { update: (text: string) => Promise<DropdownChoice[]> })
): DropdownCell {
  return {
    ...common,
    data: {
      ...opts,
      kind: 'dropdown-cell',
      value,
    },
    kind: GridCellKind.Custom,
    copyData: value.label,
  };
}
