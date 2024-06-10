import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import RichTextEditor, { RichTextEditorLoading } from '@core/ui/components/inputs/RichTextEditor';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { CollectionErrorFragment } from '@core/api/graphql';
import { getFormErrors, getProductErrorMessage } from '@dashboard/oldSrc/utils/errors';
import { useRichTextContext } from '@dashboard/oldSrc/utils/richText/context';
import type { OutputData } from '@editorjs/editorjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';

export interface CollectionDetailsProps {
  data: {
    description: OutputData;
    name: string;
  };
  disabled: boolean;
  errors: CollectionErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const CollectionDetails: FC<CollectionDetailsProps> = ({ disabled, data, onChange, errors }) => {
  const { t } = useTranslation();
  const { defaultValue, editorRef, isReadyForMount, handleChange } = useRichTextContext();
  const formErrors = getFormErrors(['name', 'description'], errors);

  return (
    <Card>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <TextField
          label={t(
            '/WXs6H',
            'Name'
            // collection name
          )}
          name="name"
          disabled={disabled}
          value={data?.name}
          onChange={onChange}
          error={!!formErrors.name}
          helperText={getProductErrorMessage(formErrors.name, t)}
          fullWidth
        />
        <FormSpacer />
        {isReadyForMount ? (
          <RichTextEditor
            defaultValue={defaultValue}
            editorRef={editorRef}
            onChange={handleChange}
            error={!!formErrors.description}
            helperText={getProductErrorMessage(formErrors.description, t)}
            label={t('dashboard.description', 'Description')}
            name="description"
            disabled={disabled}
          />
        ) : (
          <RichTextEditorLoading
            label={t('dashboard.description', 'Description')}
            name="description"
          />
        )}
      </CardContent>
    </Card>
  );
};
export default CollectionDetails;
