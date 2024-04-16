import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import type { FC } from 'react';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import useModalDialogOpen from '@dashboard/hooks/useModalDialogOpen';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';

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
  const { t } = useTranslation();
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
      title={t('dashboard.selectProductKlass', 'Select a product type')}
      disabled={!choice}
    >
      <SingleAutocompleteSelectField
        displayValue={productKlassDisplayValue}
        name="productKlass"
        label={t('dashboard.productKlass', 'Product type')}
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
