import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
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
      title={m.dashboard_selectMediaType() ?? 'Select a media type'}
      disabled={!choice}
    >
      <SingleAutocompleteSelectField
        displayValue={mediaTypeDisplayValue}
        name="mediaType"
        label={m.dashboard_mediaType() ?? 'Media type'}
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
