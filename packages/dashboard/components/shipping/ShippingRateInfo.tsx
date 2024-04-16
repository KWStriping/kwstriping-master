import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CardTitle from '@dashboard/components/core/CardTitle';
import RichTextEditor, { RichTextEditorLoading } from '@core/ui/components/inputs/RichTextEditor';
import type { ShippingErrorFragment } from '@core/api/graphql';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getShippingErrorMessage from '@dashboard/oldSrc/utils/errors/shipping';
import { useRichTextContext } from '@dashboard/oldSrc/utils/richText/context';
import type { OutputData } from '@editorjs/editorjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';

const messages = {
  maxDays: {
    id: 'v17Lly',
    defaultMessage: 'Max Delivery Time',
    description: 'label',
  },
  minDays: {
    id: 'GD/bom',
    defaultMessage: 'Min Delivery Time',
    description: 'label',
  },
  name: {
    id: 'FkDObY',
    defaultMessage: 'Shipping rate name',
    description: 'label',
  },
  description: {
    id: 'TLYeo5',
    defaultMessage: 'Shipping Rate Description',
    description: 'label',
  },
};

const useStyles = makeStyles(
  (theme) => ({
    deliveryTimeFields: {
      display: 'grid',
      gridColumnGap: theme.spacing(1),
      gridRowGap: theme.spacing(1),
      gridTemplateColumns: '1fr 1fr 1fr',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr 1fr',
      },
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr',
      },
    },
  }),
  { name: 'ShippingRateInfo' }
);

export interface ShippingRateInfoProps {
  data: {
    description: OutputData | null;
    name: string;
    maxDays: string;
    minDays: string;
  };
  disabled: boolean;
  errors: Maybe<ShippingErrorFragment[]>;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const ShippingRateInfo: FC<ShippingRateInfoProps> = (props) => {
  const { data, disabled, errors, onChange } = props;

  const { t } = useTranslation();
  const styles = useStyles(props);

  const { defaultValue, editorRef, isReadyForMount, handleChange } = useRichTextContext();

  const formErrors = getFormErrors(
    [
      'name',
      'description',
      'minDays',
      'maxDays',
    ],
    errors
  );

  return (
    <Card>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          fullWidth
          helperText={getShippingErrorMessage(formErrors.name, t)}
          label={t('dashboard.name', 'Shipping rate name')}
          name="name"
          value={data?.name}
          onChange={onChange}
        />
        <CardSpacer />
        {isReadyForMount ? (
          <RichTextEditor
            defaultValue={defaultValue}
            editorRef={editorRef}
            onChange={handleChange}
            disabled={disabled}
            error={!!formErrors.description}
            helperText={getShippingErrorMessage(formErrors.description, t)}
            label={t('dashboard.description', 'Shipping Rate Description')}
            name="description"
          />
        ) : (
          <RichTextEditorLoading
            label={t('dashboard.description', 'Shipping Rate Description')}
            name="description"
          />
        )}
        <CardSpacer />
        <div className={styles.deliveryTimeFields ?? ''}>
          <TextField
            disabled={disabled}
            error={!!formErrors.minDays}
            fullWidth
            helperText={getShippingErrorMessage(formErrors.minDays, t)}
            label={t('dashboard.inDays', 'Min days to deliver')}
            type="number"
            inputProps={{
              min: 0,
              type: 'number',
            }}
            InputProps={{ inputProps: { min: 0 } }}
            name="minDays"
            value={data?.minDays}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.maxDays}
            fullWidth
            helperText={getShippingErrorMessage(formErrors.maxDays, t)}
            label={t('dashboard.maxDays', 'Max days to deliver')}
            type="number"
            inputProps={{
              min: 0,
              type: 'number',
            }}
            InputProps={{ inputProps: { min: 0 } }}
            name="maxDays"
            value={data?.maxDays}
            onChange={onChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};
ShippingRateInfo.displayName = 'ShippingRateInfo';
export default ShippingRateInfo;
