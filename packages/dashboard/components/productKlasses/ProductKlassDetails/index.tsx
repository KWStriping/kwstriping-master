import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import PreviewPill from '@dashboard/components/core/PreviewPill';
import RadioGroupField from '@dashboard/components/fields/RadioGroupField';
import { ProductKlassKind } from '@core/api/constants';
import type { UserError } from '@dashboard/oldSrc/types';
import { getFieldError } from '@dashboard/oldSrc/utils/errors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC, ChangeEvent } from 'react';

import { messages } from './messages';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      overflow: 'visible',
    },
    option: {
      marginTop: theme.spacing(-0.25),
      marginBottom: theme.spacing(1),
    },
    preview: {
      marginLeft: theme.spacing(1),
    },
  }),
  { name: 'ProductKlassDetails' }
);

interface ProductKlassDetailsProps {
  data?: {
    name: string;
    kind: ProductKlassKind;
  };
  disabled: boolean;
  errors: UserError[];
  onChange: (event: ChangeEvent<unknown>) => void;
  onKindChange: (event: ChangeEvent<unknown>) => void;
}

const kindOptions = [
  {
    title: messages.optionNormalTitle,
    type: ProductKlassKind.Normal,
  },
  {
    title: messages.optionGiftCardTitle,
    subtitle: messages.optionGiftCardDescription,
    type: ProductKlassKind.GiftCard,
  },
];

const ProductKlassDetails: FC<ProductKlassDetailsProps> = (props) => {
  const { data, disabled, errors, onChange, onKindChange } = props;
  const styles = useStyles(props);

  const { t } = useTranslation();

  return (
    <Card className={styles.root ?? ''}>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!getFieldError(errors, 'name')}
          fullWidth
          helperText={getFieldError(errors, 'name')?.message}
          label={t('dashboard.productKlassName', 'Product Type Name')}
          name="name"
          onChange={onChange}
          value={data?.name}
        />
      </CardContent>
      <Divider />
      <CardContent>
        <RadioGroupField
          disabled={disabled}
          choices={kindOptions.map((option) => ({
            label: (
              <div
                className={styles.option ?? ''}
                data-test-id={`product-type-kind-option-${option.type}`}
              >
                <Typography variant="body1" component="div">
                  {t('dashboard.title', option.title.defaultMessage)}
                  {option.type === ProductKlassKind.GiftCard && (
                    <PreviewPill className={styles.preview ?? ''} />
                  )}
                </Typography>
                {option.subtitle && (
                  <Typography color="textSecondary" variant="caption">
                    {t('dashboard.subtitle', option.subtitle.defaultMessage)}
                  </Typography>
                )}
              </div>
            ),
            value: option.type,
          }))}
          name="kind"
          onChange={onKindChange}
          value={data?.kind}
        />
      </CardContent>
    </Card>
  );
};
ProductKlassDetails.displayName = 'ProductKlassDetails';
export default ProductKlassDetails;
