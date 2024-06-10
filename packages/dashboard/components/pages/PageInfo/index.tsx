import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import RichTextEditor, { RichTextEditorLoading } from '@core/ui/components/inputs/RichTextEditor';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { PageErrorFragment } from '@core/api/graphql';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getPageErrorMessage from '@dashboard/oldSrc/utils/errors/page';
import { useRichTextContext } from '@dashboard/oldSrc/utils/richText/context';
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
  const { t } = useTranslation();

  const { defaultValue, editorRef, isReadyForMount, handleChange } = useRichTextContext();
  const formErrors = getFormErrors(['title', 'content'], errors);

  return (
    <Card className={styles.root ?? ''}>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.title}
          fullWidth
          helperText={getPageErrorMessage(formErrors.title, t)}
          label={t(
            'dashboard.r+oXW',
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
            label={t(
              'dashboard.MwpNC',
              'Content'
              // page content
            )}
            name={'content' as keyof PageData}
          />
        ) : (
          <RichTextEditorLoading
            label={t(
              'dashboard.MwpNC',
              'Content'
              // page content
            )}
            name={'content' as keyof PageData}
          />
        )}
      </CardContent>
    </Card>
  );
};
PageInfo.displayName = 'PageInfo';
export default PageInfo;
