import { useCustomCells } from '@glideapps/glide-data-grid';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { dropdownCellRenderer } from './DropdownCell';
import { moneyCellRenderer } from './MoneyCell';
import { numberCellRenderer } from './NumberCell';

function useCells() {
  const { locale } = useLocale();
  const value = useMemo(
    () => [moneyCellRenderer(locale), numberCellRenderer(locale), dropdownCellRenderer],
    [locale]
  );

  return useCustomCells(value);
}

export default useCells;
