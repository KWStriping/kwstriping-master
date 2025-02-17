import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';
import ImageUpload from '@tempo/ui/components/inputs/ImageUpload';
import type { CollectionDetailsFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';
import { useRef } from 'react';
import MediaTile from '@tempo/dashboard/components/media/MediaTile';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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
              label={m.dashboard_description() ?? 'Description'}
              helperText={m.dashboard_optionalInParentheses() ?? '(Optional)'}
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
