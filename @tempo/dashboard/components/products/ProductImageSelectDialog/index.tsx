import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ProductMediaItemFragment } from '@tempo/api/generated/graphql';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import clsx from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';
import { useState } from 'react';

interface ProductMediaSelectDialogProps {
  media?: Maybe<ProductMediaItemFragment[]>;
  selectedMedia?: string[];
  open: boolean;
  onClose: () => void;
  onConfirm: (selectedIds: string[]) => void;
}

const ProductMediaSelectDialog: FC<ProductMediaSelectDialogProps> = (props) => {
  const { media, open, selectedMedia: initialMedia, onClose, onConfirm } = props;
  const styles = useStyles(props);

  const [selectedMedia, setSelectedMedia] = useState(initialMedia);

  useModalDialogOpen(open, {
    onOpen: () => setSelectedMedia(initialMedia),
    onClose: () => setSelectedMedia(initialMedia),
  });

  const handleMediaSelect = (id: string) => {
    const isMediaAssigned = selectedMedia.includes(id);

    if (isMediaAssigned) {
      setSelectedMedia((selectedMedia) =>
        selectedMedia.filter((mediaItemId) => mediaItemId !== id)
      );
    } else {
      setSelectedMedia((selectedMedia) => [...selectedMedia, id]);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedMedia);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <>
          {/* dialog header */}

          {m.dashboard_Pk___() ?? 'Media Selection'}
        </>
      </DialogTitle>
      <DialogContent className={styles.content ?? ''}>
        <div className={styles.root ?? ''}>
          {media
            .sort((prev, next) => (prev.sortOrder > next.sortOrder ? 1 : -1))
            .map((mediaObj) => {
              const parsedMediaOembedData = JSON.parse(mediaObj?.oembedData);
              const mediaUrl = parsedMediaOembedData?.thumbnail_url || mediaObj.url;
              return (
                <div
                  className={clsx(
                    styles.imageContainer ?? '',
                    selectedMedia?.indexOf(mediaObj.id) !== -1 && styles.selectedImageContainer
                  )}
                  onClick={() => handleMediaSelect(mediaObj.id)}
                  key={mediaObj.id}
                >
                  <Image className={styles.image ?? ''} src={mediaUrl} alt={mediaObj.alt} fill />
                </div>
              );
            })}
        </div>
      </DialogContent>
      <DialogActions>
        <BackButton onClick={onClose} />
        <ConfirmButton transitionState="default" onClick={handleConfirm} data-test-id="submit">
          {m.dashboard_onfirm() ?? 'Confirm'}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};

ProductMediaSelectDialog.displayName = 'ProductMediaSelectDialog';
export default ProductMediaSelectDialog;
