import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';

export interface ProductKlassPickerDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  productKlasses?: SingleAutocompleteChoiceType[];
  fetchProductKlasses: (data: string) => void;
  fetchMoreProductKlasses: FetchMoreProps;
  onClose: () => void;
  onConfirm: (choice: string) => void;
}

const ProductKlassPickerDialog: FC<ProductKlassPickerDialogProps> = ({
  confirmButtonState,
  open,
  productKlasses,
  fetchProductKlasses,
  fetchMoreProductKlasses,
  onClose,
  onConfirm,
}) => {
  const [choice, setChoice] = useStateFromProps('');
  const productKlassDisplayValue = productKlasses.find(
    (productKlass) => productKlass.value === choice
  )?.label;

  useModalDialogOpen(open, {
    onClose: () => {
      setChoice('');
      fetchProductKlasses('');
    },
  });

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={() => onConfirm(choice)}
      title={m.dashboard_selectProductKlass() ?? 'Select a product type'}
      disabled={!choice}
    >
      <SingleAutocompleteSelectField
        displayValue={productKlassDisplayValue}
        name="productKlass"
        label={m.dashboard_productKlass() ?? 'Product type'}
        choices={productKlasses}
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
        fetchChoices={fetchProductKlasses}
        data-test-id="dialog-product-type"
        {...fetchMoreProductKlasses}
      />
    </ActionDialog>
  );
};
ProductKlassPickerDialog.displayName = 'ProductKlassPickerDialog';
export default ProductKlassPickerDialog;
