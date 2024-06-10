import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@core/ui/components/buttons/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import Image from 'next/image';
import type { ChangeEvent, FC } from 'react';
import styles from './index.module.css';

interface MediaTileBaseProps {
  media: {
    alt: string;
    url: string;
    type?: string;
    oembedData?: string;
  };
  loading?: boolean;
  onDelete?: () => void;
  onEdit?: (event: ChangeEvent<unknown>) => void;
}

export type MediaTileProps = MediaTileBaseProps &
  (
    | {
        onEdit?: MouseEventHandler<HTMLButtonElement>;
        editHref?: never;
      }
    | {
        onEdit?: never;
        editHref?: string;
      }
  );

const MediaTile: FC<MediaTileProps> = (props) => {
  const { loading, onDelete, onEdit, editHref, media } = props;
  const parsedMediaOembedData = media?.oembedData ? JSON.parse(media.oembedData) : null;
  const mediaUrl = parsedMediaOembedData?.thumbnail_url || media.url;

  return (
    <div className={styles.mediaContainer ?? ''} data-test-id="product-image">
      <div className={clsx(styles.mediaOverlay, loading && styles.mediaOverlayShadow)}>
        {loading ? (
          <CircularProgress size={32} />
        ) : (
          <div className={styles.mediaOverlayToolbar ?? ''}>
            {(onEdit || editHref) && (
              <IconButton href={editHref} className={styles.controlButton ?? ''} onClick={onEdit}>
                <EditIcon />
              </IconButton>
            )}
            {onDelete && (
              <IconButton className={styles.controlButton ?? ''} onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        )}
      </div>
      {mediaUrl && <Image className={styles.media ?? ''} src={mediaUrl} alt={media.alt} fill />}
    </div>
  );
};
MediaTile.displayName = 'MediaTile';
export default MediaTile;
