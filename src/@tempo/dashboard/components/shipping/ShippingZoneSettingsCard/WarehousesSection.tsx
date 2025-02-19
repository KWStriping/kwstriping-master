import * as m from '@paraglide/messages';
import type { FC } from 'react';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import MultiAutocompleteSelectField from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import type { FetchMoreProps, SearchProps } from '@tempo/dashboard/oldSrc/types';

const messages = {
  subtitle: {
    id: 'wjKYSU',
    defaultMessage:
      'Select warehouse from which you will ship products for this shipping zone. This warehouse address will also be used to calculate taxes.',
    description: 'WarehousesSection subtitle',
  },
  selectFieldAddText: {
    id: 'n25d+d',
    defaultMessage: 'Add New Warehouse',
    description: 'WarehousesSection select field add text',
  },
  selectFieldLabel: {
    id: 'PV0SQd',
    defaultMessage: 'Warehouse',
    description: 'WarehousesSection select field label',
  },
  selectFieldPlaceholder: {
    id: '/cow4T',
    defaultMessage: 'Select Warehouse',
    description: 'WarehousesSection select field placeholder',
  },
};

interface WarehousesSectionProps extends FetchMoreProps, SearchProps {
  displayValues: MultiAutocompleteChoiceType[];
  choices: MultiAutocompleteChoiceType[];
  onChange: FormChange;
  onAdd: () => void;
  selectedWarehouses: string[];
}

const WarehousesSection: FC<WarehousesSectionProps> = ({
  onAdd,
  onSearchChange,
  onChange,
  onFetchMore,
  displayValues,
  choices,
  selectedWarehouses,
  hasMore,
  loading,
}) => {
  return (
    <>
      {m.dashboard_subtitle() ??
        'Select warehouse from which you will ship products for this shipping zone. This warehouse address will also be used to calculate taxes.'}
      <CardSpacer />
      <MultiAutocompleteSelectField
        add={{
          label: m.dashboard_selectFieldAddText() ?? 'Add New Warehouse',
          onClick: onAdd,
        }}
        testId="warehouses"
        choices={choices}
        displayValues={displayValues}
        fetchChoices={onSearchChange}
        hasMore={hasMore}
        label={m.dashboard_selectFieldLabel() ?? 'Warehouse'}
        loading={loading}
        name="warehouses"
        onChange={onChange}
        onFetchMore={onFetchMore}
        placeholder={m.dashboard_selectFieldPlaceholder() ?? 'Select Warehouse'}
        value={selectedWarehouses}
      />
    </>
  );
};

export default WarehousesSection;
