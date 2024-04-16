import { useTranslation } from '@core/i18n';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { ChangeEvent } from 'react';
import PageHeader from '@dashboard/components/core/PageHeader';
import MultiSelectField from '@dashboard/components/fields/MultiSelectField';
import SingleSelectField from '@dashboard/components/fields/SingleSelectField';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';

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
  const { t } = useTranslation();

  return (
    <Card>
      <PageHeader
        title={t(
          'dashboard.yE8BN',
          'Organization'
          // product organization, header
        )}
      />
      <CardContent>
        <SingleSelectField
          disabled={loading}
          error={!!errors.category}
          hint={errors.category}
          label={t('dashboard.cXLVi', 'Category')}
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
          label={t('dashboard.lh3kf', 'Collections')}
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
