import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { ChangeEvent } from 'react';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import MultiSelectField from '@tempo/dashboard/components/fields/MultiSelectField';
import SingleSelectField from '@tempo/dashboard/components/fields/SingleSelectField';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';

interface ProductCategoryAndCollectionsFormProps {
  categories?: Array<{ value: string; label: string }>;
  collections?: Array<{ value: string; label: string }>;
  errors: { [key: string]: string };
  productCollections?: string[];
  category?: string;
  loading?: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const ProductCategoryAndCollectionsForm = ({
  categories,
  collections,
  errors,
  productCollections,
  category,
  loading,
  onChange,
}: ProductCategoryAndCollectionsFormProps) => {
  return (
    <Card>
      <PageHeader
        title={
          m.dashboard_yE_BN() ?? 'Organization'
          // product organization, header
        }
      />
      <CardContent>
        <SingleSelectField
          disabled={loading}
          error={!!errors.category}
          hint={errors.category}
          label={m.dashboard_cXLVi() ?? 'Category'}
          choices={loading ? [] : categories}
          name="category"
          value={category}
          onChange={onChange}
        />
        <FormSpacer />
        <MultiSelectField
          disabled={loading}
          error={!!errors.collections}
          hint={errors.collections}
          label={m.dashboard_lh_kf() ?? 'Collections'}
          choices={loading ? [] : collections}
          name="collections"
          value={productCollections}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
ProductCategoryAndCollectionsForm.displayName = 'ProductCategoryAndCollectionsForm';
export default ProductCategoryAndCollectionsForm;
