import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import { Locale, localeNames } from '@dashboard/components/core/Locale';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import { capitalize } from '@dashboard/oldSrc/misc';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface StaffPreferencesProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const StaffPreferences: FC<StaffPreferencesProps> = ({ locale, onLocaleChange }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.LeDae',
          'Preferences'
          // section header
        )}
      />
      <CardContent>
        <SingleAutocompleteSelectField
          choices={Object.values(Locale).map((locale) => ({
            label: capitalize(localeNames[locale]),
            value: locale,
          }))}
          displayValue={localeNames[locale]}
          helperText={t(
            'dashboard.JgJwi',
            'Selecting this will change the language of your dashboard'
          )}
          label={t('dashboard.r9jbO', 'Preferred Language')}
          name="locale"
          value={locale}
          onChange={(event) => onLocaleChange(event.target.value)}
        />
        <FormSpacer />
        <Typography>
          <>
            {t(
              'dashboard.822us',
              'Please note, while all currency and date adjustments are complete, language translations are at varying degrees of completion.'
            )}
          </>
        </Typography>
      </CardContent>
    </Card>
  );
};
StaffPreferences.displayName = 'StaffPreferences';
export default StaffPreferences;
