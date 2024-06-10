import * as m from '@paraglide/messages';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { FC } from 'react';
import type { RadioGroupFieldChoice } from '@tempo/dashboard/components/fields/RadioGroupField';
import RadioGroupField from '@tempo/dashboard/components/fields/RadioGroupField';
import { ExportScope, FileType } from '@tempo/api/generated/constants';
import type { ExportErrorFragment, ExportProductsInput } from '@tempo/api/generated/graphql';
import type { ChangeEvent } from '@tempo/dashboard/hooks/useForm';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getExportErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/export';
import type { ExportSettingsInput } from './types';

const useStyles = makeStyles(
  (theme) => ({
    hr: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
  }),
  {
    name: 'ExportDialogSettings',
  }
);

export type ExportItemsQuantity = Record<'all' | 'filter', number>;

export interface ExportScopeLabels {
  allItems: string;
  selectedItems: string;
}

export interface ExportDialogSettingsProps {
  data: ExportSettingsInput;
  errors: ExportErrorFragment[];
  itemsQuantity: ExportItemsQuantity;
  selectedItems: number;
  exportScopeLabels: ExportScopeLabels;
  onChange: (event: ChangeEvent) => void;
  allowScopeSelection?: boolean;
}

const formFields: Array<keyof ExportSettingsInput> = ['fileType', 'scope'];

const ExportDialogSettings: FC<ExportDialogSettingsProps> = ({
  data,
  errors,
  onChange,
  selectedItems,
  itemsQuantity,
  exportScopeLabels,
  allowScopeSelection = true,
}) => {
  // const styles = useStyles();
  const styles = {};

  const formErrors = getFormErrors(formFields, errors);

  const productExportTypeChoices: Array<RadioGroupFieldChoice<FileType>> = [
    {
      label: t(
        'dashboard_Tl/bT',
        'Spreadsheet for Excel, Numbers etc.'
        // export items as spreadsheet
      ),
      value: FileType.Xlsx,
    },
    {
      label: t(
        'dashboard_i1BBk',
        'Plain CSV file'
        // export items as csv file
      ),
      value: FileType.Csv,
    },
  ];

  const exportScopeChoices = [
    {
      label: exportScopeLabels.allItems,
      value: ExportScope.All,
    },
    {
      disabled: selectedItems === 0,
      label: exportScopeLabels.selectedItems,
      value: ExportScope.Ids,
    },
    {
      label:
        m.dashboard_Zt_kC({
          number: itemsQuantity.filter || '...',
        }) ?? 'Current search ({number})',
      value: ExportScope.Filter,
    },
  ];

  return (
    <>
      {allowScopeSelection && (
        <>
          <RadioGroupField
            choices={exportScopeChoices}
            error={!!formErrors.scope}
            hint={getExportErrorMessage(formErrors.scope, t)}
            label={
              m.dashboard__yuk_() ?? 'Export information for:'
              // export items to csv file, choice field label
            }
            name={'scope' as keyof ExportProductsInput}
            onChange={onChange}
            value={data?.scope}
          />
          <Divider className={styles.hr ?? ''} />
        </>
      )}
      <RadioGroupField
        choices={productExportTypeChoices}
        error={!!formErrors?.fileType}
        hint={getExportErrorMessage(formErrors?.fileType, t)}
        label={
          m.dashboard__puMb() ?? 'Export as:'
          // export items as csv or spreadsheet file
        }
        name={'fileType' as keyof ExportProductsInput}
        onChange={onChange}
        value={data?.fileType}
      />
    </>
  );
};

export default ExportDialogSettings;
