import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import useModalDialogOpen from '@dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import type { FC } from 'react';

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
  const { t } = useTranslation();
  const [choice, setChoice] = useStateFromProps('');
  const pageKlassDisplayValue = pageKlasses.find((pageKlass) => pageKlass.value === choice)?.label;

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
      title={t('dashboard.selectPageKlass', 'Select a page type')}
      disabled={!choice}
    >
      <SingleAutocompleteSelectField
        displayValue={pageKlassesDisplayValue}
        name="pageKlasses"
        label={t('dashboard.pageKlasses', 'Page type')}
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
