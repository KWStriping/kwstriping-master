import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import RichTextEditor, {
  RichTextEditorLoading,
} from '@tempo/ui/components/inputs/RichTextEditor';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { PageErrorFragment } from '@tempo/api/generated/graphql';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getPageErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/page';
import { useRichTextContext } from '@tempo/dashboard/oldSrc/utils/richText/context';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';

import type { PageData } from '../PageDetailsPage/form';

export interface PageInfoProps {
  data: PageData;
  disabled: boolean;
  errors: PageErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const useStyles = makeStyles(
  {
    root: {
      overflow: 'visible',
    },
  },
  { name: 'PageInfo' }
);

const PageInfo: FC<PageInfoProps> = (props) => {
  const { data, disabled, errors, onChange } = props;
  // const styles = useStyles();
  const styles = {};

  const { defaultValue, editorRef, isReadyForMount, handleChange } = useRichTextContext();
  const formErrors = getFormErrors(['title', 'content'], errors);

  return (
    <Card className={styles.root ?? ''}>
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.title}
          fullWidth
          helperText={getPageErrorMessage(formErrors.title, t)}
          label={t(
            'dashboard_r+oXW',
            'Title'
            // page title
          )}
          name={'title' as keyof PageData}
          value={data?.title}
          onChange={onChange}
        />
        <FormSpacer />
        {isReadyForMount ? (
          <RichTextEditor
            defaultValue={defaultValue}
            editorRef={editorRef}
            onChange={handleChange}
            disabled={disabled}
            error={!!formErrors.content}
            helperText={getPageErrorMessage(formErrors.content, t)}
            label={
              m.dashboard_MwpNC() ?? 'Content'
              // page content
            }
            name={'content' as keyof PageData}
          />
        ) : (
          <RichTextEditorLoading
            label={
              m.dashboard_MwpNC() ?? 'Content'
              // page content
            }
            name={'content' as keyof PageData}
          />
        )}
      </CardContent>
    </Card>
  );
};
PageInfo.displayName = 'PageInfo';
export default PageInfo;
