import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import ImageUpload from '@core/ui/components/inputs/ImageUpload';
import MediaTile from '@dashboard/components/media/MediaTile';
import type { CollectionDetailsFragment } from '@core/api/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';
import { useRef } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    PhotosIcon: {
      height: '64px',
      margin: '0 auto',
      width: '64px',
    },
    PhotosIconContainer: {
      margin: theme.spacing(5, 0),
      textAlign: 'center',
    },
    fileField: {
      display: 'none',
    },
    image: {
      height: '100%',
      objectFit: 'contain',
      userSelect: 'none',
      width: '100%',
    },
    imageContainer: {
      background: '#ffffff',
      border: '1px solid #eaeaea',
      borderRadius: theme.spacing(1),
      height: 148,
      justifySelf: 'start',
      overflow: 'hidden',
      padding: theme.spacing(2),
      position: 'relative',
      width: 148,
    },
  }),
  {
    name: 'CollectionImage',
  }
);

export interface CollectionImageProps {
  data: {
    backgroundImageAlt: string;
  };
  image: CollectionDetailsFragment['backgroundImage'];
  onChange: (event: ChangeEvent<unknown>) => void;
  onImageDelete: () => void;
  onImageUpload: (file: File) => void;
}

export const CollectionImage: FC<CollectionImageProps> = (props) => {
  const { data, onImageUpload, image, onChange, onImageDelete } = props;

  const anchor = useRef<HTMLInputElement>();
  const styles = useStyles(props);
  const { t } = useTranslation();

  const handleImageUploadButtonClick = () => anchor.current.click();

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.P6b8U',
          'Background Image (optional)'
          // section header
        )}
        toolbar={
          <>
            <Button color="secondary" onClick={handleImageUploadButtonClick}>
              {t('dashboard.ploadImage', 'Upload image')}
            </Button>
            <input
              className={styles.fileField ?? ''}
              id="fileUpload"
              onChange={(event) => onImageUpload(event.target.files[0])}
              type="file"
              ref={anchor}
              accept="image/*"
            />
          </>
        }
      />
      {image === undefined ? (
        <CardContent>
          <div>
            <div className={styles.imageContainer ?? ''}>
              <Skeleton />
            </div>
          </div>
        </CardContent>
      ) : image === null ? (
        <ImageUpload onImageUpload={(files) => onImageUpload(files[0])} />
      ) : (
        <CardContent>
          <MediaTile media={image} onDelete={onImageDelete} />
        </CardContent>
      )}
      {image && (
        <>
          <Divider />
          <CardContent>
            <TextField
              name="backgroundImageAlt"
              label={t('dashboard.description', 'Description')}
              helperText={t('dashboard.optionalInParentheses', '(Optional)')}
              value={data?.backgroundImageAlt}
              onChange={onChange}
              fullWidth
              multiline
            />
          </CardContent>
        </>
      )}
    </Card>
  );
};

CollectionImage.displayName = 'CollectionImage';
export default CollectionImage;
