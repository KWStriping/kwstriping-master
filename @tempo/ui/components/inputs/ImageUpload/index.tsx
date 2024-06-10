import * as m from '@paraglide/messages';
import type { DropzoneProps } from '@tempo/ui/components/inputs/Dropzone';
import Dropzone from '@tempo/ui/components/inputs/Dropzone';
import { ImageIcon } from '@tempo/ui/icons';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { ReactNode, FC } from 'react';
import styles from './index.module.css';

interface ImageUploadProps {
  children?: (props: { isDragActive: boolean }) => ReactNode;
  className?: string;
  isActiveClassName?: string;
  iconContainerClassName?: string;
  iconContainerActiveClassName?: string;
  hideUploadIcon?: boolean;
  // onImageUpload: (file: FileList) => void;
  onImageUpload: DropzoneProps['onDrop'];
}

export const ImageUpload: FC<ImageUploadProps> = ({
  children,
  className,
  iconContainerActiveClassName,
  iconContainerClassName,
  isActiveClassName,
  hideUploadIcon,
  onImageUpload,
}) => {
  return (
    <Dropzone onDrop={onImageUpload}>
      {({ isDragActive, getInputProps, getRootProps }) => (
        <>
          <div
            {...getRootProps()}
            className={clsx(
              className,
              styles.photosIconContainer ?? '',
              isDragActive && (styles.backdrop ?? ''),
              isDragActive && isActiveClassName
            )}
          >
            {!hideUploadIcon && (
              <div
                className={clsx(
                  iconContainerClassName,
                  isDragActive && iconContainerActiveClassName
                )}
              >
                <input {...getInputProps()} className={styles.fileField ?? ''} accept="image/*" />
                <ImageIcon className={styles.photosIcon ?? ''} />
                <Typography className={styles.uploadText ?? ''}>
                  {m.input_dropHereToUpload() ?? 'Drop here to upload'}
                </Typography>
              </div>
            )}
          </div>
          {children && children({ isDragActive })}
        </>
      )}
    </Dropzone>
  );
};
ImageUpload.displayName = 'ImageUpload';
export default ImageUpload;
