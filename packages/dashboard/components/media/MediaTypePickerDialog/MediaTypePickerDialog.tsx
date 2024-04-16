import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import useModalDialogOpen from '@dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import type { FC } from 'react';

export interface MediaTypePickerDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  mediaTypes?: SingleAutocompleteChoiceType[];
  onClose: () => void;
  onConfirm: (choice: string) => void;
}

const MediaTypePickerDialog: FC<MediaTypePickerDialogProps> = ({
  confirmButtonState,
  open,
  mediaTypes,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const [choice, setChoice] = useStateFromProps('');
  const mediaTypeDisplayValue = mediaTypes.find((mediaType) => mediaType.value === choice)?.label;

  useModalDialogOpen(open, {
    onClose: () => {
      setChoice('');
    },
  });

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={() => onConfirm(choice)}
      title={t('dashboard.selectMediaType', 'Select a media type')}
      disabled={!choice}
    >
      <SingleAutocompleteSelectField
        displayValue={mediaTypeDisplayValue}
        name="mediaType"
        label={t('dashboard.mediaType', 'Media type')}
        choices={mediaTypes}
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        data-test-id="dialog-page-type"
      />
    </ActionDialog>
  );
};
MediaTypePickerDialog.displayName = 'MediaTypePickerDialog';
export default MediaTypePickerDialog;
