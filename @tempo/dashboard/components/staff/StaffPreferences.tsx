import * as m from '@paraglide/messages';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import { Locale, localeNames } from '@tempo/dashboard/components/core/Locale';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import { capitalize } from '@tempo/dashboard/oldSrc/misc';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface StaffPreferencesProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const StaffPreferences: FC<StaffPreferencesProps> = ({ locale, onLocaleChange }) => {
  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_LeDae() ?? 'Preferences'
          // section header
        }
      />
      <CardContent>
        <SingleAutocompleteSelectField
          choices={Object.values(Locale).map((locale) => ({
            label: capitalize(localeNames[locale]),
            value: locale,
          }))}
          displayValue={localeNames[locale]}
          helperText={
            m.dashboard_JgJwi() ?? 'Selecting this will change the language of your dashboard'
          }
          label={m.dashboard_r_jbO() ?? 'Preferred Language'}
          name="locale"
          value={locale}
          onChange={(event) => onLocaleChange(event.target.value)}
        />
        <FormSpacer />
        <Typography>
          <>
            {m.dashboard____us() ??
              'Please note, while all currency and date adjustments are complete, language translations are at varying degrees of completion.'}
          </>
        </Typography>
      </CardContent>
    </Card>
  );
};
StaffPreferences.displayName = 'StaffPreferences';
export default StaffPreferences;
