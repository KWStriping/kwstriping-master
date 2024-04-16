import type { MetadataFormData } from '@dashboard/components/core/Metadata';
import type { TaxClassRateInput } from '@core/api/graphql';
import type { FormsetData } from '@dashboard/hooks/useFormset';

export interface TaxClassesPageFormData extends MetadataFormData {
  id: string;
  updateTaxClassRates: FormsetData<TaxClassRateInput>;
  name?: string;
}
