import { Trans, useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { ShippingErrorFragment } from '@core/api/graphql';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getShippingErrorMessage from '@dashboard/oldSrc/utils/errors/shipping';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';

const messages = {
  descriptionCharacterLimit: {
    id: 'ChAjJu',
    defaultMessage: '{numberOfCharacters} of {maxCharacters} characters',
    description: 'character limit',
  },
  descriptionPlaceholder: {
    id: 'FkRNk+',
    defaultMessage: 'Description of a shipping zone.',
    description: 'field placeholder',
  },
  name: {
    id: 'YpukUN',
    defaultMessage: 'Shipping zone name',
    description: 'label',
  },
};

export interface ShippingZoneInfoProps {
  data: Record<'name' | 'description', string>;
  disabled: boolean;
  errors: ShippingErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const useStyles = makeStyles(
  {
    label: {
      flex: 1,
    },
    labelContainer: {
      '& span': {
        paddingRight: 30,
      },
      display: 'flex',
    },
  },
  { name: 'ShippingZoneCreatePage' }
);

const MAX_DESCRIPTION_LENGTH = 300;

const ShippingZoneInfo: FC<ShippingZoneInfoProps> = ({ data, disabled, errors, onChange }) => {
  const { t } = useTranslation();
  // const styles = useStyles();
  const styles = {};
  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card>
      <CardTitle title={t('dashboard.generalInformation', 'General Information')} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          fullWidth
          helperText={getShippingErrorMessage(formErrors.name, t)}
          label={t('dashboard.name', 'Shipping zone name')}
          inputProps={{ 'data-test-id': 'name' }}
          name="name"
          value={data?.name}
          onChange={onChange}
        />
        <CardSpacer />
        <TextField
          error={data?.description?.length > MAX_DESCRIPTION_LENGTH}
          name={'description'}
          label={
            <div className={styles.labelContainer ?? ''}>
              <div className={styles.label ?? ''}>
                {t('dashboard.descriptionOptional', 'Description (optional)')}
              </div>
              {!!data?.description?.length && (
                <span>
                  <Trans
                    {...messages.descriptionCharacterLimit}
                    values={{
                      maxCharacters: MAX_DESCRIPTION_LENGTH,
                      numberOfCharacters: data?.description?.length,
                    }}
                  />
                </span>
              )}
            </div>
          }
          InputProps={{
            inputProps: { maxLength: MAX_DESCRIPTION_LENGTH },
          }}
          value={data?.description}
          onChange={onChange}
          disabled={disabled}
          fullWidth
          multiline
          placeholder={t('dashboard.descriptionPlaceholder', 'Description of a shipping zone.')}
          rows={10}
        />
      </CardContent>
    </Card>
  );
};
ShippingZoneInfo.displayName = 'ShippingZoneInfo';
export default ShippingZoneInfo;
