import * as m from '@paraglide/messages';
import RichTextEditor, {
  RichTextEditorLoading,
} from '@tempo/ui/components/inputs/RichTextEditor';
import type { CollectionErrorFragment } from '@tempo/api/generated/graphql';
import type { OutputData } from '@editorjs/editorjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';
import { useRichTextContext } from '@tempo/dashboard/oldSrc/utils/richText/context';
import { getFormErrors, getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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
  const { defaultValue, editorRef, isReadyForMount, handleChange } = useRichTextContext();
  const formErrors = getFormErrors(['name', 'description'], errors);

  return (
    <Card>
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
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
            label={m.dashboard_description() ?? 'Description'}
            name="description"
            disabled={disabled}
          />
        ) : (
          <RichTextEditorLoading
            label={m.dashboard_description() ?? 'Description'}
            name="description"
          />
        )}
      </CardContent>
    </Card>
  );
};
export default CollectionDetails;
