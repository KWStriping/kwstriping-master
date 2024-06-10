import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { Step } from '@tempo/dashboard/components/core/CreatorSteps';
import makeCreatorSteps from '@tempo/dashboard/components/core/CreatorSteps';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import type {
  ChannelFragment,
  ExportErrorFragment,
  ExportProductsInput,
  SearchAttributesQuery,
  WarehouseFragment,
} from '@tempo/api/generated/graphql';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import useForm from '@tempo/dashboard/hooks/useForm';
import useModalDialogErrors from '@tempo/dashboard/hooks/useModalDialogErrors';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import useWizard from '@tempo/dashboard/hooks/useWizard';
import type { DialogProps, FetchMoreProps, RelayToFlat } from '@tempo/dashboard/oldSrc/types';
import getExportErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/export';
import { toggle } from '@tempo/dashboard/oldSrc/utils/lists';
import { mapNodeToChoice } from '@tempo/dashboard/oldSrc/utils/maps';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import type { FC } from 'react';

import type { ExportItemsQuantity } from './ExportDialogSettings';
import ExportDialogSettings from './ExportDialogSettings';
import ProductExportDialogInfo, {
  attributeNamePrefix,
  warehouseNamePrefix,
} from './ProductExportDialogInfo';
import { exportSettingsInitialFormData } from './types';

export enum ProductExportStep {
  Info,
  Settings,
}

function useSteps(): Array<Step<ProductExportStep>> {
  return [
    {
      label: t(
        '/68iG8',
        'Information exported'
        // product export to csv file, header
      ),
      value: ProductExportStep.Info,
    },
    {
      label: t(
        'dashboard_i7Mr8',
        'Export Settings'
        // product export to csv file, header
      ),
      value: ProductExportStep.Settings,
    },
  ];
}

const initialForm: ExportProductsInput = {
  exportInfo: {
    attributes: [],
    channels: [],
    fields: [],
    warehouses: [],
  },
  ...exportSettingsInitialFormData,
};

const ProductExportSteps = makeCreatorSteps<ProductExportStep>();

export interface ProductExportDialogProps extends DialogProps, FetchMoreProps {
  attributes: RelayToFlat<NonNullable<SearchAttributesQuery['search']>>;
  channels: ChannelFragment[];
  confirmButtonState: ConfirmButtonTransitionState;
  errors: ExportErrorFragment[];
  productQuantity: ExportItemsQuantity;
  selectedProducts: number;
  warehouses: WarehouseFragment[];
  onFetch: (query: string) => void;
  onSubmit: (data: ExportProductsInput) => void;
}

const ProductExportDialog: FC<ProductExportDialogProps> = ({
  attributes,
  channels,
  confirmButtonState,
  errors,
  productQuantity,
  onClose,
  onSubmit,
  open,
  selectedProducts,
  warehouses,
  ...fetchMoreProps
}) => {
  const [step, { next, prev, set: setStep }] = useWizard(ProductExportStep.Info, [
    ProductExportStep.Info,
    ProductExportStep.Settings,
  ]);
  const steps = useSteps();
  const dialogErrors = useModalDialogErrors(errors, open);
  const notFormErrors = dialogErrors?.filter((err) => !err.field);
  const [selectedAttributes, setSelectedAttributes] = useState<MultiAutocompleteChoiceType[]>([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const { change, data, reset, submit } = useForm(initialForm, onSubmit);

  useModalDialogOpen(open, {
    onClose: () => {
      reset();
      setStep(ProductExportStep.Info);
    },
  });

  const attributeChoices = mapNodeToChoice(attributes);
  const warehouseChoices = mapNodeToChoice(warehouses);

  const handleAttributeSelect: FormChange = (event) => {
    const id = event.target.name.substr(attributeNamePrefix.length);

    change({
      target: {
        name: 'exportInfo',
        value: {
          ...data?.exportInfo,
          attributes: toggle(id, data?.exportInfo?.attributes, (a, b) => a === b),
        },
      },
    });

    const choice = attributeChoices.find((choice) => choice.value === id);

    setSelectedAttributes(toggle(choice, selectedAttributes, (a, b) => a.value === b.value));
  };

  const handleChannelSelect = (option: ChannelFragment) => {
    change({
      target: {
        name: 'exportInfo',
        value: {
          ...data?.exportInfo,
          channels: toggle(option.id, data?.exportInfo?.channels, (a, b) => a === b),
        },
      },
    });
    const choice = channels.find((choice) => choice.id === option.id);

    setSelectedChannels(toggle(choice, selectedChannels, (a, b) => a.id === b.id));
  };

  const handleToggleAllChannels = (items: ChannelFragment[], selected: number) => {
    setSelectedChannels(selected === items.length ? [] : channels);

    change({
      target: {
        name: 'exportInfo',
        value: {
          ...data?.exportInfo,
          channels: selected === items.length ? [] : channels.map((channel) => channel.id),
        },
      },
    });
  };

  const handleWarehouseSelect: FormChange = (event) =>
    change({
      target: {
        name: 'exportInfo',
        value: {
          ...data?.exportInfo,
          warehouses: toggle(
            event.target.name.substr(warehouseNamePrefix.length),
            data?.exportInfo?.warehouses,
            (a, b) => a === b
          ),
        },
      },
    });

  const handleToggleAllWarehouses: FormChange = () =>
    change({
      target: {
        name: 'exportInfo',
        value: {
          ...data?.exportInfo,
          warehouses:
            data?.exportInfo?.warehouses?.length === warehouses.length
              ? []
              : warehouses.map((warehouse) => warehouse.id),
        },
      },
    });

  const exportScopeLabels = {
    allItems:
      m.dashboard_tUXnK({
        number: productQuantity.all || '...',
      }) ?? 'All products ({number})',
    selectedItems:
      m.dashboard_EZ___({
        number: selectedProducts,
      }) ?? 'Selected products ({number})',
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <>
        <DialogTitle>{m.dashboard_title() ?? 'Export Information'}</DialogTitle>
        <DialogContent>
          <ProductExportSteps currentStep={step} steps={steps} onStepClick={setStep} />
          {step === ProductExportStep.Info && (
            <ProductExportDialogInfo
              attributes={attributeChoices}
              channels={channels}
              data={data}
              selectedChannels={selectedChannels}
              selectedAttributes={selectedAttributes}
              onAttrtibuteSelect={handleAttributeSelect}
              onWarehouseSelect={handleWarehouseSelect}
              onChange={change}
              warehouses={warehouseChoices}
              onChannelSelect={handleChannelSelect}
              onSelectAllChannels={handleToggleAllChannels}
              onSelectAllWarehouses={handleToggleAllWarehouses}
              {...fetchMoreProps}
            />
          )}
          {step === ProductExportStep.Settings && (
            <ExportDialogSettings
              data={data}
              errors={dialogErrors}
              onChange={change}
              itemsQuantity={productQuantity}
              selectedItems={selectedProducts}
              exportScopeLabels={exportScopeLabels}
            />
          )}
        </DialogContent>

        {!!notFormErrors?.length && (
          <DialogContent>
            {notFormErrors.map((err) => (
              <Typography color="error" key={err.field + err.code}>
                {getExportErrorMessage(err, t)}
              </Typography>
            ))}
          </DialogContent>
        )}

        <DialogActions>
          {step === ProductExportStep.Info && (
            <Button onClick={onClose} data-test-id="cancel">
              {m.dashboard_cancel() ?? 'Cancel'}
            </Button>
          )}
          {step === ProductExportStep.Settings && (
            <Button onClick={prev} data-test-id="back">
              {m.dashboard_back() ?? 'Back'}
            </Button>
          )}
          {step === ProductExportStep.Info && (
            <Button color="primary" onClick={next} data-test-id="next">
              {m.dashboard_extStep() ?? 'Next'}
            </Button>
          )}
          {step === ProductExportStep.Settings && (
            <ConfirmButton
              transitionState={confirmButtonState}
              type="submit"
              data-test-id="submit"
              onClick={submit}
            >
              {m.dashboard_onfirmButtonLabel() ?? 'export products'}
            </ConfirmButton>
          )}
        </DialogActions>
      </>
    </Dialog>
  );
};

ProductExportDialog.displayName = 'ProductExportDialog';
export default ProductExportDialog;
