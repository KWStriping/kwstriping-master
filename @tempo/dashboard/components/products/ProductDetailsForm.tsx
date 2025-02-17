import * as m from '@paraglide/messages';
import Grid from '@tempo/ui/components/Grid';
import RichTextEditor, {
  RichTextEditorLoading,
} from '@tempo/ui/components/inputs/RichTextEditor';
import type { ProductErrorFragment } from '@tempo/api/generated/graphql';
import type { OutputData } from '@editorjs/editorjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import { useRichTextContext } from '@tempo/dashboard/oldSrc/utils/richText/context';
import { getFormErrors, getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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
  const { editorRef, defaultValue, isReadyForMount, handleChange } = useRichTextContext();

  const formErrors = getFormErrors(['name', 'description', 'rating'], errors);

  return (
    <Card>
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
      <CardContent>
        <TextField
          error={!!formErrors.name}
          helperText={getProductErrorMessage(formErrors.name, t)}
          disabled={disabled}
          fullWidth
          label={m.dashboard_productName() ?? 'Name'}
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
            label={m.dashboard_description() ?? 'Description'}
            name="description"
          />
        ) : (
          <RichTextEditorLoading
            label={m.dashboard_description() ?? 'Description'}
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
            label={m.dashboard_productRating() ?? 'Product Rating'}
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
