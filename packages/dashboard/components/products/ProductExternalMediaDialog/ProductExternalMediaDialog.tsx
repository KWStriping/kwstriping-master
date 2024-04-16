import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import { Button } from '@core/ui/components/buttons/Button';
import Form from '@dashboard/components/forms/Form';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { ProductFragment } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface ProductExternalMediaDialogProps {
  product: Maybe<ProductFragment>;
  open: boolean;
  onClose: () => void;
  onSubmit: (mediaUrl: string) => SubmitPromise;
}

interface FormValues {
  mediaUrl: string;
}

const messages = {
  buttonMessage: {
    id: '4W/CKn',
    defaultMessage: 'Upload URL',
    description: 'modal button',
  },
};

const ProductExternalMediaDialog: FC<ProductExternalMediaDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const initialValues: FormValues = {
    mediaUrl: '',
  };

  const handleOnSubmit = (values: FormValues) => {
    onSubmit(values.mediaUrl);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{t('dashboard.buttonMessage', 'Upload URL')}</DialogTitle>
      <Form initial={initialValues} onSubmit={handleOnSubmit}>
        {({ change, data, submit }) => (
          <>
            <DialogContent>
              <Typography>
                {t(
                  'dashboard.DvDnG',
                  'Media from the URL you supply will be shown in the media gallery. You will be able to define the order of the gallery.'
                )}
              </Typography>
              <FormSpacer />
              <TextField
                label="URL"
                value={data?.mediaUrl}
                name="mediaUrl"
                type="url"
                onChange={change}
                // autoFocus
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <BackButton onClick={onClose} />
              <Button onClick={submit}>{t('dashboard.buttonMessage', 'Upload URL')}</Button>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};

export default ProductExternalMediaDialog;
