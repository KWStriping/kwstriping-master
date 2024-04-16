import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import ImageUpload from '@core/ui/components/inputs/ImageUpload';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import clsx from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';
import { useState, useRef } from 'react';
import styles from './index.module.css';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { SortableContainerProps } from '@dashboard/components/core/SortableContainer';
import SortableContainer from '@dashboard/components/core/SortableContainer';
import MediaTile from '@dashboard/components/media/MediaTile';
import { ProductMediaPopper } from '@dashboard/components/products/ProductMediaPopper/ProductMediaPopper';
import { ProductMediaType } from '@core/api/constants';
import type { ProductMediaFragment } from '@core/api/graphql';
import type { ReorderAction } from '@dashboard/oldSrc/types';
import createMultiFileUploadHandler from '@dashboard/oldSrc/utils/handlers/multiFileUploadHandler';

interface SortableMediaProps {
  media: {
    id: string;
    alt: string;
    url: string;
  };
  editHref: string;
  onDelete: () => void;
}

const SortableMedia = ({ media, editHref, onDelete }: SortableMediaProps) => (
  <MediaTile media={media} editHref={editHref} onDelete={onDelete} />
);

interface MediaListContainerProps extends Omit<SortableContainerProps, 'items'> {
  className: string;
  media: ProductMediaFragment[];
  preview: ProductMediaFragment[];
  onDelete: (id: string) => () => void;
  getEditHref: (id: string) => string;
}

const MediaListContainer = ({
  media,
  preview,
  onDelete,
  getEditHref,
  ...props
}: MediaListContainerProps) => (
  <SortableContainer items={media.map(({ id }) => id)} {...props}>
    {media.map((mediaObj, index) => (
      <SortableMedia
        key={`item-${index}`}
        media={mediaObj}
        editHref={getEditHref(mediaObj.id)}
        onDelete={onDelete(mediaObj.id)}
      />
    ))}
    {preview
      .sort((a, b) => (a.sortOrder > b.sortOrder ? 1 : -1))
      .map((mediaObj, index) => (
        <MediaTile loading={true} media={mediaObj} key={index} />
      ))}
  </SortableContainer>
);

interface ProductMediaProps {
  placeholderImage?: string;
  media: ProductMediaFragment[];
  loading?: boolean;
  getImageEditUrl: (id: string) => string;
  onImageDelete: (id: string) => () => void;
  onImageReorder?: ReorderAction;
  onImageUpload: (file: File) => void;
  openMediaUrlModal: () => void;
}

const ProductMediaItem: FC<ProductMediaProps> = (props) => {
  const {
    media,
    placeholderImage,
    getImageEditUrl,
    onImageDelete,
    onImageReorder,
    onImageUpload,
    openMediaUrlModal,
  } = props;
  const { t } = useTranslation();
  const imagesUpload = useRef<HTMLInputElement | null>(null);
  const anchor = useRef<HTMLButtonElement>();
  const [imagesToUpload, setImagesToUpload] = useState<ProductMediaFragment[]>([]);
  const [popperOpenStatus, setPopperOpenStatus] = useState(false);

  const handleImageUpload = createMultiFileUploadHandler(onImageUpload, {
    onAfterUpload: () => setImagesToUpload((prevImagesToUpload) => prevImagesToUpload.slice(1)),
    onStart: (files) => {
      Array.from(files).forEach((file, fileIndex) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagesToUpload((prevImagesToUpload) => [
            ...prevImagesToUpload,
            {
              __typename: 'ProductMediaItem',
              alt: '',
              id: '',
              sortOrder: fileIndex,
              type: ProductMediaType.Image,
              url: event.target.result as string,
              oembedData: null,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  return (
    <Card className={styles.card ?? ''}>
      <CardTitle
        title={t('dashboard.media', 'Media')}
        toolbar={
          <>
            <Button
              onClick={() => setPopperOpenStatus(true)}
              variant="tertiary"
              data-test-id="button-upload-image"
              ref={anchor}
            >
              {t('dashboard.pload', 'Upload')}
            </Button>

            <ProductMediaPopper
              anchorRef={anchor.current}
              imagesUploadRef={imagesUpload.current}
              setPopperStatus={setPopperOpenStatus}
              popperStatus={popperOpenStatus}
              openMediaUrlModal={openMediaUrlModal}
            />

            <input
              className={styles.fileField ?? ''}
              id="fileUpload"
              onChange={(event) => handleImageUpload(event.target.files)}
              multiple
              type="file"
              ref={imagesUpload}
              accept="image/*"
            />
          </>
        }
      />
      <CardContent className={'relative'}>
        {media === undefined ? (
          <div className={styles.root ?? ''}>
            <div className={styles.imageContainer ?? ''}>
              <Image
                fill
                className={styles.image ?? ''}
                src={placeholderImage ?? ''}
                alt={'Placeholder image'}
              />
            </div>
          </div>
        ) : media?.length ? (
          <ImageUpload
            className={styles.imageUpload ?? ''}
            isActiveClassName={styles.imageUploadActive}
            disableClick={true}
            hideUploadIcon={true}
            iconContainerActiveClassName={styles.imageUploadIconActive}
            onImageUpload={handleImageUpload}
          >
            {({ isDragActive }) => (
              <CardContent>
                <MediaListContainer
                  distance={20}
                  helperClass="dragged"
                  axis="xy"
                  media={media}
                  preview={imagesToUpload}
                  onSortEnd={onImageReorder}
                  className={clsx(styles.root, isDragActive && styles.rootDragActive)}
                  onDelete={onImageDelete}
                  getEditHref={getImageEditUrl}
                />
              </CardContent>
            )}
          </ImageUpload>
        ) : (
          <ImageUpload onImageUpload={handleImageUpload} />
        )}
      </CardContent>
    </Card>
  );
};
ProductMediaItem.displayName = 'ProductMediaItem';
export default ProductMediaItem;
