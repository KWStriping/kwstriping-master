import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import RichTextEditor, { RichTextEditorLoading } from '@core/ui/components/inputs/RichTextEditor';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { ProductErrorFragment } from '@core/api/graphql';
import { getFormErrors, getProductErrorMessage } from '@dashboard/oldSrc/utils/errors';
import { useRichTextContext } from '@dashboard/oldSrc/utils/richText/context';
import type { OutputData } from '@editorjs/editorjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';

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
  const { t } = useTranslation();
  const { defaultValue, editorRef, isReadyForMount, handleChange } = useRichTextContext();

  const formErrors = getFormErrors(['name', 'description'], errors);

  return (
    <Card>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <div>
          <TextField
            label={t('dashboard.EYtiq', 'Category name')}
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
            label={t('dashboard.HRy+U', 'Category Description')}
            name="description"
          />
        ) : (
          <RichTextEditorLoading
            label={t('dashboard.HRy+U', 'Category Description')}
            name="description"
          />
        )}
      </CardContent>
    </Card>
  );
};
export default CategoryDetailsForm;
