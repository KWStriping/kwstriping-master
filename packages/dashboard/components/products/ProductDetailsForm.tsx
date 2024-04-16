import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import Grid from '@core/ui/components/Grid';
import RichTextEditor, { RichTextEditorLoading } from '@core/ui/components/inputs/RichTextEditor';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { ProductErrorFragment } from '@core/api/graphql';
import { getFormErrors, getProductErrorMessage } from '@dashboard/oldSrc/utils/errors';
import { useRichTextContext } from '@dashboard/oldSrc/utils/richText/context';
import type { OutputData } from '@editorjs/editorjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

interface ProductDetailsFormProps {
  data: {
    description: OutputData;
    name: string;
    rating: number;
  };
  disabled?: boolean;
  errors: ProductErrorFragment[];

  onChange: (event: unknown) => void;
}

export const ProductDetailsForm: FC<ProductDetailsFormProps> = ({
  data,
  disabled,
  errors,
  onChange,
}) => {
  const { t } = useTranslation();
  const { editorRef, defaultValue, isReadyForMount, handleChange } = useRichTextContext();

  const formErrors = getFormErrors(['name', 'description', 'rating'], errors);

  return (
    <Card>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <TextField
          error={!!formErrors.name}
          helperText={getProductErrorMessage(formErrors.name, t)}
          disabled={disabled}
          fullWidth
          label={t('dashboard.productName', 'Name')}
          name="name"
          value={data?.name}
          onChange={onChange}
        />
        <FormSpacer />
        {isReadyForMount ? (
          <RichTextEditor
            editorRef={editorRef}
            defaultValue={defaultValue}
            onChange={handleChange}
            disabled={disabled}
            error={!!formErrors.description}
            helperText={getProductErrorMessage(formErrors.description, t)}
            label={t('dashboard.description', 'Description')}
            name="description"
          />
        ) : (
          <RichTextEditorLoading
            label={t('dashboard.description', 'Description')}
            name="description"
          />
        )}
        <FormSpacer />
        <Divider />
        <FormSpacer />
        <Grid variant="uniform">
          <TextField
            type="number"
            error={!!formErrors.rating}
            helperText={getProductErrorMessage(formErrors.rating, t)}
            disabled={disabled}
            label={t('dashboard.productRating', 'Product Rating')}
            name="rating"
            value={data?.rating || ''}
            onChange={onChange}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
export default ProductDetailsForm;
