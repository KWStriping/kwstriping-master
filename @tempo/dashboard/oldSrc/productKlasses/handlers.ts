import type { ProductKlassKind, TaxClassBaseFragment } from '@tempo/api/generated/graphql';
import type { ChangeEvent } from 'react';
import type { ChangeEvent, FormChange } from '@tempo/dashboard/hooks/useForm';

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
