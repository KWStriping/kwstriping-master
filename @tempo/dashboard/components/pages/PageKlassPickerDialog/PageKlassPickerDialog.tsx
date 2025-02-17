import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';

export interface PageKlassPickerDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  pageKlasses?: SingleAutocompleteChoiceType[];
  fetchPageKlasses: (data: string) => void;
  fetchMorePageKlasses: FetchMoreProps;
  onClose: () => void;
  onConfirm: (choice: string) => void;
}

const PageKlassPickerDialog: FC<PageKlassPickerDialogProps> = ({
  confirmButtonState,
  open,
  pageKlasses,
  fetchPageKlasses,
  fetchMorePageKlasses,
  onClose,
  onConfirm,
}) => {
  const [choice, setChoice] = useStateFromProps('');
  const pageKlassDisplayValue = pageKlasses.find(
    (pageKlass) => pageKlass.value === choice
  )?.label;

  useModalDialogOpen(open, {
    onClose: () => {
      setChoice('');
      fetchPageKlasses('');
    },
  });

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={() => onConfirm(choice)}
      title={m.dashboard_selectPageKlass() ?? 'Select a page type'}
      disabled={!choice}
    >
      <SingleAutocompleteSelectField
        displayValue={pageKlassesDisplayValue}
        name="pageKlasses"
        label={m.dashboard_pageKlasses() ?? 'Page type'}
        choices={pageKlasses}
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        fetchChoices={fetchPageKlasses}
        data-test-id="dialog-page-type"
        {...fetchMorePageKlasses}
      />
    </ActionDialog>
  );
};
PageKlassPickerDialog.displayName = 'PageKlassPickerDialog';
export default PageKlassPickerDialog;
