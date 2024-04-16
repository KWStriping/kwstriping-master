import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import { NumericUnits } from '@dashboard/components/attributes/AttributeDetails/NumericUnits';
import SingleSelectField from '@dashboard/components/fields/SingleSelectField';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import { AttributeEntityType, AttributeInputType } from '@core/api/constants';
import type { AttributeErrorFragment } from '@core/api/graphql';
import type { UseFormResult } from '@dashboard/hooks/useForm';
import { getAttributeSlugErrorMessage } from '@dashboard/oldSrc/attributes/errors';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getAttributeErrorMessage from '@dashboard/oldSrc/utils/errors/attribute';
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
  const { t } = useTranslation();
  const inputTypeChoices = [
    {
      label: t('dashboard.dropdown', 'Dropdown'),
      value: AttributeInputType.Dropdown,
    },
    {
      label: t('dashboard.ultiselect', 'Multiple Select'),
      value: AttributeInputType.Multiselect,
    },
    {
      label: t('dashboard.ile', 'File'),
      value: AttributeInputType.File,
    },
    {
      label: t('dashboard.references', 'References'),
      value: AttributeInputType.Reference,
    },
    {
      label: t('dashboard.lainText', 'Plain Text'),
      value: AttributeInputType.PlainText,
    },
    {
      label: t('dashboard.ichText', 'Rich Text'),
      value: AttributeInputType.RichText,
    },
    {
      label: t('dashboard.umeric', 'Numeric'),
      value: AttributeInputType.Numeric,
    },
    {
      label: t('dashboard.oolean', 'Boolean'),
      value: AttributeInputType.Boolean,
    },
    {
      label: t('dashboard.date', 'Date'),
      value: AttributeInputType.Date,
    },
    {
      label: t('dashboard.dateTime', 'Date Time'),
      value: AttributeInputType.DateTime,
    },
    {
      label: t('dashboard.watch', 'Swatch'),
      value: AttributeInputType.Swatch,
    },
  ];
  const entityTypeChoices = [
    {
      label: t('dashboard.page', 'Pages'),
      value: AttributeEntityType.Page,
    },
    {
      label: t('dashboard.product', 'Products'),
      value: AttributeEntityType.Product,
    },
    {
      label: t('dashboard.productVariant', 'Product variants'),
      value: AttributeEntityType.Product,
    },
  ];

  const formApiErrors = getFormErrors(
    [
      'name',
      'slug',
      'inputType',
      'entityType',
      'unit',
    ],
    apiErrors
  );

  return (
    <Card>
      <CardHeader title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formApiErrors.name}
          label={t('dashboard.attributeLabel', 'Default Label')}
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
          label={t('dashboard.attributeSlug', 'Attribute Code')}
          name={'slug' as keyof AttributePageFormData}
          placeholder={slugify(data?.name).toLowerCase()}
          fullWidth
          helperText={
            getAttributeSlugErrorMessage(formApiErrors.slug, t) ||
            t(
              'dashboard.attributeSlugHelperText',
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
            label={t('dashboard.inputType', 'Catalog Input type for Store Owner')}
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
              label={t('dashboard.entityType', 'Entity')}
              name="entityType"
              onChange={onChange}
              value={data?.entityType}
            />
          )}
        </div>
        <FormSpacer />
        <ControlledCheckbox
          name={'valueRequired' as keyof AttributePageFormData}
          label={t('dashboard.valueRequired', 'Value Required')}
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
