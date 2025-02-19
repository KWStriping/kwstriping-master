import * as m from '@paraglide/messages';
import RichTextEditor, {
  RichTextEditorLoading,
} from '@tempo/ui/components/inputs/RichTextEditor';
import type { ProductErrorFragment } from '@tempo/api/generated/graphql';
import type { OutputData } from '@editorjs/editorjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';
import { useRichTextContext } from '@tempo/dashboard/oldSrc/utils/richText/context';
import { getFormErrors, getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface CategoryDetailsFormProps {
  data: {
    name: string;
    description: OutputData;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

export const CategoryDetailsForm: FC<CategoryDetailsFormProps> = ({
  disabled,
  data,
  onChange,
  errors,
}) => {
  const { defaultValue, editorRef, isReadyForMount, handleChange } = useRichTextContext();

  const formErrors = getFormErrors(['name', 'description'], errors);

  return (
    <Card>
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
      <CardContent>
        <div>
          <TextField
            label={m.dashboard_EYtiq() ?? 'Category name'}
            name="name"
            disabled={disabled}
            value={data && data?.name}
            onChange={onChange}
            error={!!formErrors.name}
            helperText={getProductErrorMessage(formErrors.name, t)}
            fullWidth
          />
        </div>
        <FormSpacer />
        {isReadyForMount ? (
          <RichTextEditor
            defaultValue={defaultValue}
            editorRef={editorRef}
            onChange={handleChange}
            disabled={disabled}
            error={!!formErrors.description}
            helperText={getProductErrorMessage(formErrors.description, t)}
            label={m.dashboard_HRy() + U ?? 'Category Description'}
            name="description"
          />
        ) : (
          <RichTextEditorLoading
            label={m.dashboard_HRy() + U ?? 'Category Description'}
            name="description"
          />
        )}
      </CardContent>
    </Card>
  );
};
export default CategoryDetailsForm;
