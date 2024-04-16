import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ProductMediaFragment } from '@core/api/graphql';
import useModalDialogOpen from '@dashboard/hooks/useModalDialogOpen';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import clsx from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';
import { useState } from 'react';

interface ProductMediaSelectDialogProps {
  media?: Maybe<ProductMediaFragment[]>;
  selectedMedia?: string[];
  open: boolean;
  onClose: () => void;
  onConfirm: (selectedIds: string[]) => void;
}

const ProductMediaSelectDialog: FC<ProductMediaSelectDialogProps> = (props) => {
  const { media, open, selectedMedia: initialMedia, onClose, onConfirm } = props;
  const { t } = useTranslation();
  const styles = useStyles(props);

  const [selectedMedia, setSelectedMedia] = useState(initialMedia);

  useModalDialogOpen(open, {
    onOpen: () => setSelectedMedia(initialMedia),
    onClose: () => setSelectedMedia(initialMedia),
  });

  const handleMediaSelect = (id: string) => {
    const isMediaAssigned = selectedMedia.includes(id);

    if (isMediaAssigned) {
      setSelectedMedia((selectedMedia) => selectedMedia.filter((mediaItemId) => mediaItemId !== id));
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

          {t('dashboard.Pk640', 'Media Selection')}
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
          {t('dashboard.onfirm', 'Confirm')}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};

ProductMediaSelectDialog.displayName = 'ProductMediaSelectDialog';
export default ProductMediaSelectDialog;
