import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { ProductMediaItemFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import type { FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

const messages = {
  chooseMedia: {
    id: '2J6EFz',
    defaultMessage: 'Choose media',
  },
  media: {
    id: '/Mcvt4',
    defaultMessage: 'Media',
    description: 'section header',
  },
  selectSpecificVariant: {
    id: 'JfKvrV',
    defaultMessage: 'Select a specific variant media from product media',
    description: 'select variant media',
  },
};

const useStyles = makeStyles(
  (theme) => ({
    gridElement: {
      '& img': {
        width: '100%',
      },
    },
    helpText: {
      gridColumnEnd: 'span 4',
    },
    image: {
      objectFit: 'contain',
      width: '100%',
    },
    imageContainer: {
      background: '#ffffff',
      border: '1px solid #eaeaea',
      borderRadius: theme.spacing(1),
      height: theme.spacing(17.5),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
    root: {
      display: 'grid',
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  }),
  { name: 'ProductMedia' }
);

interface ProductMediaProps {
  media?: Maybe<ProductMediaItemFragment[]>;
  placeholderImage?: string;
  disabled: boolean;
  onImageAdd();
}

export const ProductMedia: FC<ProductMediaProps> = (props) => {
  const styles = useStyles(props);
  const { disabled, media, onImageAdd } = props;

  return (
    <Card>
      <CardTitle
        title={m.dashboard_media() ?? 'Media'}
        toolbar={
          <Button color="secondary" disabled={disabled} onClick={onImageAdd}>
            {m.dashboard_hooseMedia() ?? 'Choose media'}
          </Button>
        }
      />
      <CardContent>
        <div className={styles.root ?? ''}>
          {media === undefined || media === null ? (
            <Skeleton />
          ) : media?.length ? (
            media
              .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
              .map((mediaObj) => {
                const parsedMediaOembedData = JSON.parse(mediaObj?.oembedData);
                const mediaUrl = parsedMediaOembedData?.thumbnail_url || mediaObj.url;
                return (
                  <Image
                    key={mediaObj.id}
                    className={styles.image ?? ''}
                    src={mediaUrl}
                    alt={mediaObj.alt}
                  />
                );
              })
          ) : (
            <Typography className={styles.helpText ?? ''}>
              {m.dashboard_selectSpecificVariant() ??
                'Select a specific variant media from product media'}
            </Typography>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
ProductMedia.displayName = 'ProductMedia';
export default ProductMedia;
