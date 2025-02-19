import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import { Button } from '@tempo/ui/components/buttons/Button';
import type { ProductFragment } from '@tempo/api/generated/graphql';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import Form from '@tempo/dashboard/components/forms/Form';

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
  const initialValues: FormValues = {
    mediaUrl: '',
  };

  const handleOnSubmit = (values: FormValues) => {
    onSubmit(values.mediaUrl);
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{m.dashboard_buttonMessage() ?? 'Upload URL'}</DialogTitle>
      <Form initial={initialValues} onSubmit={handleOnSubmit}>
        {({ change, data, submit }) => (
          <>
            <DialogContent>
              <Typography>
                {m.dashboard_DvDnG() ??
                  'Media from the URL you supply will be shown in the media gallery. You will be able to define the order of the gallery.'}
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
              <Button onClick={submit}>{m.dashboard_buttonMessage() ?? 'Upload URL'}</Button>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};

export default ProductExternalMediaDialog;
