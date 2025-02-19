import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { FileFragment } from '@tempo/api/generated/graphql';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { DetailedHTMLProps, InputHTMLAttributes, FC } from 'react';
import { createRef, useEffect } from 'react';
import styles from './index.module.css';

export interface FileChoiceType {
  label: string;
  value: string;
  file?: File | FileFragment;
}

export interface FileUploadFieldProps {
  inputProps?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  className?: string;
  disabled: boolean;
  loading: boolean;
  file: FileChoiceType;
  error?: boolean;
  helperText?: string;
  onFileUpload: (file: File) => void;
  onFileDelete: () => void;
}

const FileUploadField: FC<FileUploadFieldProps> = (props) => {
  const {
    loading,
    disabled,
    file,
    className,
    error,
    helperText,
    onFileUpload,
    onFileDelete,
    inputProps,
  } = props;

  const fileInputAnchor = createRef<HTMLInputElement>();
  const clickFileInput = () => fileInputAnchor.current.click();

  const handleFileDelete = () => {
    fileInputAnchor.current.value = '';
    onFileDelete();
  };

  useEffect(() => {
    if (!file.value) {
      fileInputAnchor.current.value = '';
    }
  }, [file]);

  const innerFile = file.file;
  let fileName = null;
  let fileUrl = null;
  if (innerFile) {
    fileName = (innerFile as File).name || (innerFile as FileFragment).url.split('/').pop();
    fileUrl = (innerFile as File).name
      ? URL.createObjectURL(innerFile as File)
      : (innerFile as FileFragment).url;
  }

  return (
    <>
      <div className={className}>
        {file.label ? (
          <div className={styles.uploadFileContent ?? ''}>
            <div className={styles.uploadFileName ?? ''}>
              {loading ? (
                <Skeleton />
              ) : (
                <a href={fileUrl} target="blank" className={styles.fileUrl ?? ''}>
                  {file.label}
                </a>
              )}
            </div>
            <IconButton
              color="secondary"
              onClick={handleFileDelete}
              disabled={disabled || loading}
              data-test-id="button-delete-file"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={clickFileInput}
              disabled={disabled || loading}
              color="secondary"
              data-test-id="button-upload-file"
            >
              {m.dashboard_hooseFile() ?? 'Choose file'}
            </Button>
            {fileName && (
              <Typography style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                {fileName}
              </Typography>
            )}
          </div>
        )}
        {error && (
          <Typography variant="caption" className={styles.errorText ?? ''}>
            {helperText}
          </Typography>
        )}
      </div>
      <input
        className={styles.fileField ?? ''}
        id="fileUpload"
        onChange={(event) => onFileUpload(event.target.files[0])}
        type="file"
        data-test-id="upload-file-input"
        ref={fileInputAnchor}
        {...inputProps}
      />
    </>
  );
};
FileUploadField.displayName = 'FileUploadField';
export default FileUploadField;
