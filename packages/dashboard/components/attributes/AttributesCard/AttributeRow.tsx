import { useTranslation } from '@core/i18n';
import { DateTimeField } from '@core/ui/components/inputs/DateTimeField';
import { getMeasurementUnitMessage } from '@dashboard/components/attributes/AttributeDetails/utils';
import BasicAttributeRow from '@dashboard/components/attributes/AttributesCard/BasicAttributeRow';
import ExtendedAttributeRow from '@dashboard/components/attributes/AttributesCard/ExtendedAttributeRow';
import { SwatchRow } from '@dashboard/components/attributes/AttributesCard/SwatchRow';
import type { AttributeRowProps } from '@dashboard/components/attributes/AttributesCard/types';
import {
  getFileChoice,
  getMultiChoices,
  getMultiDisplayValue,
  getReferenceDisplayValue,
  getSingleChoices,
  getSingleDisplayValue,
  getErrorMessage,
} from '@dashboard/components/attributes/AttributesCard/utils';
import Checkbox from '@dashboard/components/core/Checkbox';
import RichTextEditor from '@core/ui/components/inputs/RichTextEditor';
import FileUploadField from '@dashboard/components/fields/FileUploadField';
import MultiAutocompleteSelectField from '@dashboard/components/fields/MultiAutocompleteSelectField';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import SortableChipsField from '@dashboard/components/fields/SortableChipsField';
import { AttributeInputType } from '@core/api/constants';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import styles from './index.module.css';

const AttributeRow: FC<AttributeRowProps> = ({
  attribute,
  values,
  disabled,
  error,
  loading,
  onFileChange,
  onMultiChange,
  onReferencesAddClick,
  onReferencesRemove,
  onReferencesReorder,
  onChange,
  fetchValues,
  fetchMoreValues,
  onAttributeSelectBlur,
  richTextGetters,
}) => {
  const { t } = useTranslation();

  switch (attribute.data?.inputType) {
    case AttributeInputType.Reference:
      return (
        <ExtendedAttributeRow
          label={attribute.label}
          selectLabel={t('dashboard.reference', 'Assign references')}
          onSelect={() => onReferencesAddClick(attribute)}
          disabled={disabled}
        >
          <SortableChipsField
            values={getReferenceDisplayValue(attribute)}
            onValueDelete={(value) =>
              onReferencesRemove(
                attribute.id,
                attribute.value?.filter((id) => id !== value)
              )
            }
            onValueReorder={(event) => onReferencesReorder(attribute.id, event)}
            loading={loading}
            error={!!error}
            helperText={getErrorMessage(error, t)}
          />
        </ExtendedAttributeRow>
      );
    case AttributeInputType.File:
      return (
        <BasicAttributeRow label={attribute.label}>
          <FileUploadField
            className={styles.fileField ?? ''}
            disabled={disabled}
            loading={loading}
            file={getFileChoice(attribute)}
            onFileUpload={(file) => onFileChange(attribute.id, file)}
            onFileDelete={() => onFileChange(attribute.id, undefined)}
            error={!!error}
            helperText={getErrorMessage(error, t)}
            inputProps={{
              name: `attribute:${attribute.label}`,
            }}
          />
        </BasicAttributeRow>
      );
    case AttributeInputType.Dropdown:
      return (
        <BasicAttributeRow label={attribute.label}>
          <SingleAutocompleteSelectField
            choices={getSingleChoices(values)}
            disabled={disabled}
            displayValue={getSingleDisplayValue(attribute, values)}
            emptyOption={!attribute.data?.isRequired}
            error={!!error}
            helperText={getErrorMessage(error, t)}
            name={`attribute:${attribute.label}`}
            label={t('dashboard.valueLabel', 'Value')}
            value={attribute.value[0]}
            onChange={(event) => onChange(attribute.id, event.target.value)}
            allowCustomValues={true}
            fetchOnFocus={true}
            fetchChoices={(value) => fetchValues(value, attribute.id)}
            onBlur={onAttributeSelectBlur}
            {...fetchMoreValues}
          />
        </BasicAttributeRow>
      );
    case AttributeInputType.Swatch:
      return (
        <SwatchRow
          attribute={attribute}
          values={values}
          onChange={onChange}
          disabled={disabled}
          error={error}
          fetchValues={fetchValues}
          fetchMoreValues={fetchMoreValues}
        />
      );
    case AttributeInputType.PlainText:
      return (
        <BasicAttributeRow
          label={attribute.label}
          description={t('dashboard.lainText', 'Plain Text')}
        >
          <TextField
            fullWidth
            disabled={disabled}
            error={!!error}
            helperText={getErrorMessage(error, t)}
            label={t('dashboard.valueLabel', 'Value')}
            name={`attribute:${attribute.label}`}
            onChange={(event) => onChange(attribute.id, event.target.value)}
            type="text"
            value={attribute.value[0]}
          />
        </BasicAttributeRow>
      );
    case AttributeInputType.RichText:
      const { getShouldMount, getDefaultValue, getMountEditor, getHandleChange } =
        richTextGetters;
      const defaultValue = getDefaultValue(attribute.id);
      return (
        <BasicAttributeRow
          label={attribute.label}
          description={t('dashboard.ichText', 'Rich Text')}
        >
          {getShouldMount(attribute.id) && (
            <RichTextEditor
              defaultValue={defaultValue}
              editorRef={getMountEditor(attribute.id)}
              onChange={getHandleChange(attribute.id)}
              name={`attribute:${attribute.label}`}
              disabled={disabled}
              error={!!error}
              label={t('dashboard.valueLabel', 'Value')}
              helperText={getErrorMessage(error, t)}
            />
          )}
        </BasicAttributeRow>
      );
    case AttributeInputType.Numeric:
      return (
        <BasicAttributeRow label={attribute.label}>
          <TextField
            fullWidth
            disabled={disabled}
            error={!!error}
            helperText={getErrorMessage(error, t)}
            label={t('dashboard.valueLabel', 'Value')}
            name={`attribute:${attribute.label}`}
            onChange={(event) => onChange(attribute.id, event.target.value)}
            type="number"
            value={attribute.value[0]}
            InputProps={
              attribute.data?.unit && {
                endAdornment: (
                  <InputAdornment position="end">
                    {getMeasurementUnitMessage(attribute.data?.unit, t)}
                  </InputAdornment>
                ),
              }
            }
          />
        </BasicAttributeRow>
      );
    case AttributeInputType.Boolean:
      return (
        <BasicAttributeRow label={attribute.label}>
          <div className={styles.pullRight ?? ''}>
            <Checkbox
              disabled={disabled}
              name={`attribute:${attribute.label}`}
              onChange={(event) => onChange(attribute.id, JSON.stringify(event.target.checked))}
              checked={JSON.parse(attribute.value[0] ?? 'false')}
              className={styles.pullRight ?? ''}
              helperText={getErrorMessage(error, t)}
              error={!!error}
            />
          </div>
        </BasicAttributeRow>
      );
    case AttributeInputType.Date:
      return (
        <BasicAttributeRow label={attribute.label} flexValueContainer>
          <TextField
            fullWidth
            disabled={disabled}
            error={!!error}
            helperText={getErrorMessage(error, t)}
            label={t('dashboard.date', 'Date')}
            name={`attribute:${attribute.label}`}
            onChange={(event) => onChange(attribute.id, event.target.value)}
            type="date"
            value={attribute.value[0]}
            InputLabelProps={{ shrink: true }}
          />
        </BasicAttributeRow>
      );
    case AttributeInputType.DateTime:
      return (
        <BasicAttributeRow label={attribute.label} flexValueContainer>
          <DateTimeField
            fullWidth
            name={`attribute:${attribute.label}`}
            disabled={disabled}
            error={error}
            value={attribute.value[0]}
            helperText={getErrorMessage(error, t)}
            onChange={(value) => onChange(attribute.id, value)}
          />
        </BasicAttributeRow>
      );
    default:
      return (
        <BasicAttributeRow label={attribute.label}>
          <MultiAutocompleteSelectField
            choices={getMultiChoices(values)}
            displayValues={getMultiDisplayValue(attribute, values)}
            disabled={disabled}
            error={!!error}
            helperText={getErrorMessage(error, t)}
            label={t('dashboard.ultipleValueLabel', 'Values')}
            name={`attribute:${attribute.label}`}
            value={attribute.value}
            onChange={(event) => onMultiChange(attribute.id, event.target.value)}
            allowCustomValues={true}
            fetchOnFocus={true}
            fetchChoices={(value) => fetchValues(value, attribute.id)}
            onBlur={onAttributeSelectBlur}
            {...fetchMoreValues}
          />
        </BasicAttributeRow>
      );
  }
};
AttributeRow.displayName = 'AttributeRow';
export default AttributeRow;
