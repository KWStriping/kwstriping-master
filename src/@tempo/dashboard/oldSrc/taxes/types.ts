import type { TaxClassRateInput } from '@tempo/api/generated/graphql';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import type { FormsetData } from '@tempo/dashboard/hooks/useFormset';

export interface TaxClassesPageFormData extends MetadataFormData {
  id: string;
  updateTaxClassRates: FormsetData<TaxClassRateInput>;
  name?: string;
}
