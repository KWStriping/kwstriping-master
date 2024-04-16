import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import RichTextEditor, { RichTextEditorLoading } from '@core/ui/components/inputs/RichTextEditor';
import FileUploadField from '@dashboard/components/fields/FileUploadField';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import { MediaType } from '@core/api/constants';
import type { MediaErrorFragment } from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getMediaErrorMessage from '@dashboard/oldSrc/utils/errors/media';
import { useRichTextContext } from '@dashboard/oldSrc/utils/richText/context';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';
import { useMemo } from 'react';

import type { MediaData } from '../MediaItemDetailsPage/form';

export interface MediaInfoProps {
  data: MediaData;
  disabled: boolean;
  errors: MediaErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
  onFileChange: FormChange<File>;
  processing: boolean;
}

const useStyles = makeStyles(
  (theme) => ({
    root: {
      overflow: 'visible',
    },
    filePreview: {
      marginTop: theme.spacing(3),
      width: 216,
      height: 216,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }),
  { name: 'MediaInfo' }
);

const MediaInfo: FC<MediaInfoProps> = (props) => {
  const { data, disabled, errors, onChange, onFileChange, processing } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  const { defaultValue, editorRef, isReadyForMount, handleChange } = useRichTextContext();
  const formErrors = getFormErrors(['title', 'alt', 'description'], errors);

  const objectUrl = useMemo(
    () =>
      data?.file
        ? data?.file?.url
          ? data?.file?.url
          : URL.createObjectURL(data?.file as unknown as File)
        : null,
    [data?.file]
  );
  console.log('data?.file', data?.file);

  return (
    <Card className={styles.root ?? ''}>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <FileUploadField
          disabled={processing}
          loading={processing}
          file={{
            label: null,
            value: null,
            file: data?.file ?? null,
          }}
          onFileUpload={(file) =>
            onFileChange({
              target: {
                name: 'file',
                value: file,
              },
            })
          }
          onFileDelete={() =>
            onFileChange({
              target: {
                name: 'file',
                value: undefined,
              },
            })
          }
          inputProps={{
            accept:
              data?.type === MediaType.Image
                ? 'image/*'
                : data?.type === MediaType.Video
                ? 'video/*'
                : undefined,
          }}
        />
        {objectUrl &&
          (data?.type === MediaType.Image ? (
            <div
              style={{
                marginTop: '8px',
                backgroundImage: `url(${objectUrl})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                height: '216px',
              }}
            />
          ) : data?.type === MediaType.Video ? (
            <div style={{ marginTop: '8px' }}>
              <video autoPlay loop muted height={'216px'}>
                <source src={objectUrl} type="video/mp4" />
              </video>
            </div>
          ) : null)}
        <FormSpacer />
        <TextField
          name={'title'}
          disabled={disabled}
          error={!!formErrors.title}
          fullWidth
          helperText={getMediaErrorMessage(formErrors.title, t)}
          label={t(
            'dashboard.JyEFd',
            'Title'
            // media title
          )}
          value={data?.title}
          onChange={onChange}
        />
        <FormSpacer />
        <TextField
          name={'alt'}
          disabled={disabled}
          required={!disabled}
          error={!!formErrors.alt}
          fullWidth
          helperText={getMediaErrorMessage(formErrors.alt, t)}
          label={t(
            'dashboard.NlTt5',
            'Alt text'
            // media alt text
          )}
          value={data?.alt}
          onChange={onChange}
        />
        <FormSpacer />
        {isReadyForMount ? (
          <RichTextEditor
            defaultValue={defaultValue}
            editorRef={editorRef}
            onChange={handleChange}
            disabled={disabled}
            error={!!formErrors.description}
            helperText={getMediaErrorMessage(formErrors.description, t)}
            label={t(
              'dashboard.VKzQC',
              'Description'
              // media description
            )}
            name={'description' as keyof MediaData}
          />
        ) : (
          <RichTextEditorLoading
            label={t(
              'dashboard.VKzQC',
              'Description'
              // media description
            )}
            name={'description' as keyof MediaData}
          />
        )}
      </CardContent>
    </Card>
  );
};
MediaInfo.displayName = 'MediaInfo';
export default MediaInfo;
