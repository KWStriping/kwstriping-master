import type { ProductKlassKind, TaxClassBaseFragment } from '@core/api/graphql';
import type { ChangeEvent, FormChange } from '@dashboard/hooks/useForm';
import type { ChangeEvent } from 'react';

export const makeProductKlassKindChangeHandler =
  (onChange: FormChange, onKindChange: (kind: ProductKlassKind) => void) =>
  (event: ChangeEvent<unknown>) => {
    const kind = event.target.value as ProductKlassKind;
    onKindChange(kind);
    onChange(event);
  };

export function handleTaxClassChange(
  event: ChangeEvent,
  taxClasses: TaxClassBaseFragment[],
  formChange: FormChange,
  displayChange: (name: string) => void
) {
  formChange(event);
  displayChange(taxClasses.find((taxClass) => taxClass.id === event.target.value)?.name ?? '');
}
