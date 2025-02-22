import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import RichTextEditor, {
  RichTextEditorLoading,
} from '@tempo/ui/components/inputs/RichTextEditor';
import type { ShippingErrorFragment } from '@tempo/api/generated/graphql';
import type { OutputData } from '@editorjs/editorjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';
import { useRichTextContext } from '@tempo/dashboard/oldSrc/utils/richText/context';
import getShippingErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/shipping';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

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

  const styles = useStyles(props);

  const { defaultValue, editorRef, isReadyForMount, handleChange } = useRichTextContext();

  const formErrors = getFormErrors(['name', 'description', 'minDays', 'maxDays'], errors);

  return (
    <Card>
      <CardTitle title={m.dashboard_generalInformation() ?? 'General Information'} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          fullWidth
          helperText={getShippingErrorMessage(formErrors.name, t)}
          label={m.dashboard_name() ?? 'Shipping rate name'}
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
            label={m.dashboard_description() ?? 'Shipping Rate Description'}
            name="description"
          />
        ) : (
          <RichTextEditorLoading
            label={m.dashboard_description() ?? 'Shipping Rate Description'}
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
            label={m.dashboard_inDays() ?? 'Min days to deliver'}
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
            label={m.dashboard_maxDays() ?? 'Max days to deliver'}
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
