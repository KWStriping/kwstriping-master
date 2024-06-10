import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import { NumericUnits } from '@tempo/dashboard/components/attributes/AttributeDetails/NumericUnits';
import SingleSelectField from '@tempo/dashboard/components/fields/SingleSelectField';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import { AttributeEntityType, AttributeInputType } from '@tempo/api/generated/constants';
import type { AttributeErrorFragment } from '@tempo/api/generated/graphql';
import type { UseFormResult } from '@tempo/dashboard/hooks/useForm';
import { getAttributeSlugErrorMessage } from '@tempo/dashboard/oldSrc/attributes/errors';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getAttributeErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/attribute';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';
import slugify from 'slugify';

import type { AttributePageFormData } from '../AttributePage';

const entityTypeMessages = {
  page: {
    id: 'Iafyt5',
    defaultMessage: 'Pages',
    description: 'page attribute entity type',
  },
  product: {
    id: '5TUpjG',
    defaultMessage: 'Products',
    description: 'product attribute entity type',
  },
  productVariant: {
    id: 'wsDF7X',
    defaultMessage: 'Product variants',
    description: 'product variant attribute entity type',
  },
};

const useStyles = makeStyles(
  (theme) => ({
    inputTypeSection: {
      columnGap: theme.spacing(2),
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexFlow: 'wrap',
        rowGap: theme.spacing(3),
      },
    },
  }),
  { name: 'AttributeDetails' }
);

export interface AttributeDetailsProps
  extends Pick<
    UseFormResult<AttributePageFormData>,
    'set' | 'setError' | 'data' | 'clearErrors' | 'errors'
  > {
  canChangeType: boolean;
  disabled: boolean;
  apiErrors: AttributeErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const AttributeDetails: FC<AttributeDetailsProps> = (props) => {
  const {
    canChangeType,
    errors,
    clearErrors,
    setError,
    data,
    disabled,
    apiErrors,
    onChange,
    set,
  } = props;
  const styles = useStyles(props);
  const inputTypeChoices = [
    {
      label: m.dashboard_dropdown() ?? 'Dropdown',
      value: AttributeInputType.Dropdown,
    },
    {
      label: m.dashboard_ultiselect() ?? 'Multiple Select',
      value: AttributeInputType.Multiselect,
    },
    {
      label: m.dashboard_ile() ?? 'File',
      value: AttributeInputType.File,
    },
    {
      label: m.dashboard_references() ?? 'References',
      value: AttributeInputType.Reference,
    },
    {
      label: m.dashboard_lainText() ?? 'Plain Text',
      value: AttributeInputType.PlainText,
    },
    {
      label: m.dashboard_ichText() ?? 'Rich Text',
      value: AttributeInputType.RichText,
    },
    {
      label: m.dashboard_umeric() ?? 'Numeric',
      value: AttributeInputType.Numeric,
    },
    {
      label: m.dashboard_oolean() ?? 'Boolean',
      value: AttributeInputType.Boolean,
    },
    {
      label: m.dashboard_date() ?? 'Date',
      value: AttributeInputType.Date,
    },
    {
      label: m.dashboard_dateTime() ?? 'Date Time',
      value: AttributeInputType.DateTime,
    },
    {
      label: m.dashboard_watch() ?? 'Swatch',
      value: AttributeInputType.Swatch,
    },
  ];
  const entityTypeChoices = [
    {
      label: m.dashboard_page() ?? 'Pages',
      value: AttributeEntityType.Page,
    },
    {
      label: m.dashboard_product() ?? 'Products',
      value: AttributeEntityType.Product,
    },
    {
      label: m.dashboard_productVariant() ?? 'Product variants',
      value: AttributeEntityType.Product,
    },
  ];

  const formApiErrors = getFormErrors(
    ['name', 'slug', 'inputType', 'entityType', 'unit'],
    apiErrors
  );

  return (
    <Card>
      <CardHeader title={m.dashboard_generalInformation() ?? 'General Information'} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formApiErrors.name}
          label={m.dashboard_attributeLabel() ?? 'Default Label'}
          name={'name' as keyof AttributePageFormData}
          fullWidth
          helperText={getAttributeErrorMessage(formApiErrors.name, t)}
          value={data?.name}
          onChange={onChange}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formApiErrors.slug}
          label={m.dashboard_attributeSlug() ?? 'Attribute Code'}
          name={'slug' as keyof AttributePageFormData}
          placeholder={slugify(data?.name).toLowerCase()}
          fullWidth
          helperText={
            getAttributeSlugErrorMessage(formApiErrors.slug, t) ||
            t(
              'dashboard_attributeSlugHelperText',
              'This is used internally. Make sure you don’t use spaces'
            )
          }
          value={data?.slug}
          onChange={onChange}
        />
        <FormSpacer />
        <div className={styles.inputTypeSection ?? ''}>
          <SingleSelectField
            choices={inputTypeChoices}
            disabled={disabled || !canChangeType}
            error={!!formApiErrors.inputType}
            hint={getAttributeErrorMessage(formApiErrors.inputType, t)}
            label={m.dashboard_inputType() ?? 'Catalog Input type for Store Owner'}
            name="inputType"
            onChange={onChange}
            value={data?.inputType}
          />
          {data?.inputType === AttributeInputType.Reference && (
            <SingleSelectField
              choices={entityTypeChoices}
              disabled={disabled || !canChangeType}
              error={!!formApiErrors.entityType}
              hint={getAttributeErrorMessage(formApiErrors.entityType, t)}
              label={m.dashboard_entityType() ?? 'Entity'}
              name="entityType"
              onChange={onChange}
              value={data?.entityType}
            />
          )}
        </div>
        <FormSpacer />
        <ControlledCheckbox
          name={'valueRequired' as keyof AttributePageFormData}
          label={m.dashboard_valueRequired() ?? 'Value Required'}
          checked={data?.valueRequired}
          onChange={onChange}
          disabled={disabled}
        />
        {data?.inputType === AttributeInputType.Numeric && (
          <NumericUnits
            data={data}
            errors={errors}
            disabled={disabled}
            clearErrors={clearErrors}
            setError={setError}
            set={set}
          />
        )}
      </CardContent>
    </Card>
  );
};
AttributeDetails.displayName = 'AttributeDetails';
export default AttributeDetails;
