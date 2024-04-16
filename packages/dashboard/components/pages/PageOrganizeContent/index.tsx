import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@dashboard/components/fields/SingleAutocompleteSelectField';
import type { PageDetailsFragment, ErrorFragment } from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import type { FetchMoreProps } from '@dashboard/oldSrc/types';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getPageErrorMessage from '@dashboard/oldSrc/utils/errors/page';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import type { PageFormData } from '../PageDetailsPage/form';

export interface PageOrganizeContentProps {
  canChangeType: boolean;
  data: PageFormData;
  pageKlass?: PageDetailsFragment['pageKlass'];
  pageKlassesInputDisplayValue?: string;
  errors: ErrorFragment[];
  disabled: boolean;
  pageKlasses: SingleAutocompleteChoiceType[];
  onPageKlassChange?: FormChange;
  fetchPageKlasses?: (data: string) => void;
  fetchMorePageKlasses?: FetchMoreProps;
}

const useStyles = makeStyles(
  (theme) => ({
    label: {
      marginBottom: theme.spacing(0.5),
    },
  }),
  { name: 'PageOrganizeContent' }
);

const PageOrganizeContent: FC<PageOrganizeContentProps> = (props) => {
  const {
    canChangeType,
    data,
    pageKlass,
    pageKlassesInputDisplayValue,
    errors,
    disabled,
    pageKlasses,
    onPageKlassChange,
    fetchPageKlasses,
    fetchMorePageKlasses,
  } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  const formErrors = getFormErrors(['pageKlasses'], errors);

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.U9GPX',
          'Organize Content'
          // section header
        )}
      />
      <CardContent>
        {canChangeType ? (
          <SingleAutocompleteSelectField
            data-test-id="page-types-autocomplete-select"
            disabled={disabled}
            displayValue={pageKlassesInputDisplayValue}
            label={t('dashboard.5SK5c', 'Select content type')}
            error={!!formErrors.pageKlasses}
            helperText={getPageErrorMessage(formErrors.pageKlasses, t)}
            name={'pageKlasses' as keyof PageFormData}
            onChange={onPageKlassChange}
            value={data?.pageKlass?.id}
            choices={pageKlasses}
            InputProps={{
              autoComplete: 'off',
            }}
            fetchChoices={fetchPageKlasses}
            {...fetchMorePageKlasses}
          />
        ) : (
          <>
            <Typography className={styles.label ?? ''} variant="caption">
              {t('dashboard.fD5Jr', 'Content type')}
            </Typography>
            <Typography>{pageKlass?.name}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};
PageOrganizeContent.displayName = 'PageOrganizeContent';
export default PageOrganizeContent;
