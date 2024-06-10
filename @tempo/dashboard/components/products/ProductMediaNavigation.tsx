import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';

const messages = {
  allMedia: {
    id: 'XUU9sU',
    defaultMessage: 'All Media',
    description: 'section header',
  },
};

const useStyles = makeStyles(
  (theme) => ({
    card: {
      marginBottom: theme.spacing(2),
    },
    highlightedImageContainer: {
      borderColor: theme.vars.palette.primary.main,
    },
    image: {
      height: '100%',
      objectFit: 'contain',
      userSelect: 'none',
      width: '100%',
    },
    imageContainer: {
      border: '2px solid #eaeaea',
      borderRadius: theme.spacing(1),
      cursor: 'pointer',
      height: 48,
      overflow: 'hidden',
      padding: theme.spacing(0.5),
      position: 'relative',
    },
    root: {
      display: 'grid',
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(1),
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
    toolbar: { marginTop: theme.spacing(-0.5) },
  }),
  { name: 'ProductMediaNavigation' }
);

interface ProductMediaNavigationProps {
  disabled: boolean;
  media?: Array<{
    id: string;
    url: string;
    alt?: string;
    type?: string;
    oembedData?: string;
  }>;
  highlighted?: string;
  onRowClick: (id: string) => () => void;
}

const ProductMediaNavigation: FC<ProductMediaNavigationProps> = (props) => {
  const { highlighted, media, onRowClick } = props;
  const styles = useStyles(props);

  return (
    <Card className={styles.card ?? ''}>
      <CardTitle title={m.dashboard_llMedia() ?? 'All Media'} />
      <CardContent>
        {!media ? (
          <Skeleton />
        ) : (
          <div className={styles.root ?? ''}>
            {media.map((mediaObj) => {
              const mediaObjOembedData = JSON.parse(mediaObj?.oembedData);
              const mediaUrl = mediaObjOembedData?.thumbnail_url || mediaObj.url;

              return (
                <div
                  className={clsx(
                    styles.imageContainer ?? '',
                    mediaObj.id === highlighted && styles.highlightedImageContainer
                  )}
                  onClick={onRowClick(mediaObj.id)}
                  key={mediaObj.id}
                >
                  <Image className={styles.image ?? ''} src={mediaUrl} alt={mediaObj.alt} />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
ProductMediaNavigation.displayName = 'ProductMediaNavigation';
export default ProductMediaNavigation;
