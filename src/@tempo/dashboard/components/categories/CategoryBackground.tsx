import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';
import ImageUpload from '@tempo/ui/components/inputs/ImageUpload';
import type { CategoryDetailsFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';
import { useRef } from 'react';

import type { CategoryUpdateData } from '../CategoryUpdatePage/form';
import MediaTile from '@tempo/dashboard/components/media/MediaTile';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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
  const anchor = useRef<HTMLInputElement>();

  const { data, onImageUpload, image, onChange, onImageDelete } = props;

  const handleImageUploadButtonClick = () => anchor.current.click();

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_P_b_U() ?? 'Background Image (optional)' // section header
        }
        toolbar={
          <>
            <Button color="secondary" onClick={handleImageUploadButtonClick}>
              {m.dashboard_ploadImage() ?? 'Upload image'}
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
              label={m.dashboard_description() ?? 'Description'}
              helperText={t(
                'dashboard_iMYc+',
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
