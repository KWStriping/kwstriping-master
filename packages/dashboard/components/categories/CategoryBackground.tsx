import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import ImageUpload from '@core/ui/components/inputs/ImageUpload';
import MediaTile from '@dashboard/components/media/MediaTile';
import type { CategoryDetailsFragment } from '@core/api/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';
import { useRef } from 'react';

import type { CategoryUpdateData } from '../CategoryUpdatePage/form';

const useStyles = makeStyles(
  (theme) => ({
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
  { name: 'CategoryBackground' }
);

export interface CategoryBackgroundProps {
  data: CategoryUpdateData;
  image: CategoryDetailsFragment['backgroundImage'];
  onChange: (event: ChangeEvent<unknown>) => void;
  onImageDelete: () => void;
  onImageUpload: (file: File) => void;
}

const CategoryBackground: FC<CategoryBackgroundProps> = (props) => {
  const styles = useStyles(props);
  const { t } = useTranslation();
  const anchor = useRef<HTMLInputElement>();

  const { data, onImageUpload, image, onChange, onImageDelete } = props;

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
          <div className={styles.imageContainer ?? ''}>
            <Skeleton />
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
              helperText={t(
                'dashboard.iMYc+',
                '(Optional)'
                // field is optional
              )}
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
CategoryBackground.displayName = 'CategoryBackground';
export default CategoryBackground;
