import DeleteIcon from '@mui/icons-material/Delete';
import PlusIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Image from 'next/image';
import type { FC, ChangeEvent, DragEvent, FocusEventHandler } from 'react';
import { useState, useEffect, useRef } from 'react';
import styles from './FileInput.module.css';
import { IconButton } from '@tempo/ui/components/buttons/IconButton';
import { Button } from '@tempo/ui/components/buttons/Button';

interface FileInputProps {
  name: string;
  label: string;
  alt: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => void;
  onBlur?: FocusEventHandler<HTMLDivElement>;
}

const FileInput: FC<FileInputProps> = ({ name, label, alt, value, onChange, onBlur }) => {
  const anchor = useRef<HTMLInputElement | null>(null);
  const [src, setSrc] = useState<string | undefined>(value);

  useEffect(() => {
    if (value !== src) {
      setSrc(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleFileUploadButtonClick = () => {
    if (anchor.current) {
      anchor.current.click();
    }
  };

  const handleDragEvent = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onChange(event);
    const files = event.dataTransfer.files;
    files?.[0] && setSrc(URL.createObjectURL(files[0]));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onChange(event);
    const files = event.target.files;
    if (files?.[0]) {
      setSrc(URL.createObjectURL(files[0]));
    }
  };

  const handleFileDelete = () => {
    if (anchor.current) {
      anchor.current.value = '';
      onChange({
        target: {
          name,
          value: '',
        },
      } as ChangeEvent<HTMLInputElement>);
      setSrc(undefined);
    }
  };

  return (
    <div
      className={styles.root ?? ''}
      onDragOver={handleDragEvent}
      onDragEnter={handleDragEvent}
      onDragLeave={handleDragEvent}
      onDrop={handleFileDrop}
      onBlur={onBlur}
    >
      <Typography variant="body2" className={styles.label ?? ''}>
        {label}
      </Typography>
      {!src && (
        <div className={styles.uploadField ?? ''}>
          <>
            <Typography variant="body2" className={styles.uploadLabel ?? ''}>
              {/* <Trans {...messages.dragImage} /> */}
            </Typography>
            <Typography
              variant="caption"
              className={clsx(styles.uploadLabel, styles.uploadSizeLabel)}
            >
              {/* <Trans {...messages.maxFileSize} /> */}
            </Typography>
            <Button
              color="secondary"
              size="small"
              className={styles.uploadButton ?? ''}
              endIcon={<PlusIcon />}
              onClick={handleFileUploadButtonClick}
            >
              {/* <Trans {...messages.uploadFile} /> */}
            </Button>
          </>
        </div>
      )}
      {src && (
        <div className={styles.mediaContainer ?? ''}>
          <Image
            className={styles.media ?? ''}
            src={src}
            alt={alt}
            layout="fill"
            loader={({ src }) => src}
          />
          <div className={styles.mediaOverlay ?? ''}>
            <div className={styles.mediaToolbar ?? ''}>
              <IconButton
                color="primary"
                className={styles.mediaToolbarIcon ?? ''}
                onClick={handleFileDelete}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      )}
      <input
        name={name}
        className={styles.input ?? ''}
        onChange={handleFileChange}
        type="file"
        ref={anchor}
        accept="image/*"
      />
    </div>
  );
};
export default FileInput;
