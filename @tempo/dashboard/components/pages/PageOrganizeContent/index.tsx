import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import type { PageDetailsFragment, ErrorFragment } from '@tempo/api/generated/graphql';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import type { FetchMoreProps } from '@tempo/dashboard/oldSrc/types';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getPageErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/page';
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
  const styles = {};

  const formErrors = getFormErrors(['pageKlasses'], errors);

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_U_GPX() ?? 'Organize Content'
          // section header
        }
      />
      <CardContent>
        {canChangeType ? (
          <SingleAutocompleteSelectField
            data-test-id="page-types-autocomplete-select"
            disabled={disabled}
            displayValue={pageKlassesInputDisplayValue}
            label={m.dashboard__SK_c() ?? 'Select content type'}
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
              {m.dashboard_fD_Jr() ?? 'Content type'}
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
