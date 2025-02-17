import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { List, ListHeader, ListItem, ListItemCell } from '@tempo/ui/components/list/List';
import { PageTab, PageTabs } from '@tempo/ui/components/PageTabs';
import { getById } from '@tempo/utils';
import Grid from '@tempo/ui/components/Grid';
import type { TaxClassFragment } from '@tempo/api/generated/graphql';
import { isLastElement } from '@tempo/dashboard/oldSrc/taxes/utils/utils';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getTaxesErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/taxes';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { Fragment, useMemo, useState } from 'react';

import TaxClassesForm from './form';
import TaxClassesMenu from './TaxClassesMenu';
import { useAutofocus } from '@tempo/dashboard/oldSrc/taxes/utils/useAutofocus';
import type { TaxClassesPageFormData } from '@tempo/dashboard/oldSrc/taxes/types';
import { taxesMessages } from '@tempo/dashboard/oldSrc/taxes/messages';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import TaxInput from '@tempo/dashboard/components/taxes/TaxInput';
import { parseQuery } from '@tempo/dashboard/components/orders/OrderCustomerAddressesEditDialog/utils';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import Metadata from '@tempo/dashboard/components/core/Metadata';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface TaxClassesPageProps {
  taxClasses: TaxClassFragment[] | undefined;
  selectedTaxClassId: string;
  handleTabChange: (tab: string) => void;
  savebarState: ConfirmButtonTransitionState;
  disabled: boolean;
  onCreateNewButtonClick: () => void;
  onTaxClassDelete: (id: string) => SubmitPromise;
  onTaxClassCreate: (data: TaxClassesPageFormData) => SubmitPromise;
  onTaxClassUpdate: (data: TaxClassesPageFormData) => SubmitPromise;
}

export const TaxClassesPage: FC<TaxClassesPageProps> = (props) => {
  const {
    taxClasses,
    selectedTaxClassId,
    handleTabChange,
    savebarState,
    disabled,
    onCreateNewButtonClick,
    onTaxClassDelete,
    onTaxClassCreate,
    onTaxClassUpdate,
  } = props;
  const router = useRouter();

  const [query, setQuery] = useState('');

  const currentTaxClass = useMemo(
    () => taxClasses?.find(getById(selectedTaxClassId)),
    [selectedTaxClassId, taxClasses]
  );

  const nameInputRef = useAutofocus(currentTaxClass?.id === 'new', [currentTaxClass?.id]);

  return (
    <TaxClassesForm
      taxClass={currentTaxClass}
      onTaxClassCreate={onTaxClassCreate}
      onTaxClassUpdate={onTaxClassUpdate}
      disabled={disabled}
    >
      {({ data, validationErrors, handlers, submit, change }) => {
        const filteredRates = data?.updateTaxClassRates?.filter(
          (rate) => rate.label.search(new RegExp(parseQuery(query), 'i')) >= 0
        );

        const formErrors = getFormErrors(['name'], validationErrors);

        return (
          <Container>
            <PageHeader title={m.dashboard_taxes() ?? 'Taxes'} />
            <PageTabs value="tax-classes" onChange={handleTabChange}>
              <PageTab label={m.dashboard_channelsSection() ?? 'Channels'} value="channels" />
              <PageTab label={m.dashboard_countriesSection() ?? 'Countries'} value="countries" />
              <PageTab
                label={m.dashboard_taxClassesSection() ?? 'Tax classes'}
                value="tax-classes"
              />
            </PageTabs>
            <Grid variant="inverted">
              <TaxClassesMenu
                taxClasses={taxClasses}
                selectedTaxClassId={selectedTaxClassId}
                onTaxClassDelete={onTaxClassDelete}
                onCreateNew={onCreateNewButtonClick}
              />
              {taxClasses?.length !== 0 && (
                <div>
                  <Card>
                    <CardTitle
                      title={m.dashboard_generalInformation() ?? 'General information'}
                    />
                    <CardContent>
                      <TextField
                        value={data?.name}
                        onChange={change}
                        name="name"
                        variant="outlined"
                        placeholder={m.dashboard_taxRateName() ?? 'Tax rate name'}
                        fullWidth
                        inputProps={{ className: styles.namePadding }}
                        inputRef={nameInputRef}
                        error={!!formErrors.name}
                        helperText={getTaxesErrorMessage(formErrors.name, t)}
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardTitle title={m.dashboard_taxClassRates() ?? 'Tax class rates'} />
                    {currentTaxClass?.countries.length === 0 ? (
                      <CardContent className={styles.supportText ?? ''}>
                        <Trans
                          {...taxesMessages.noRatesInTaxClass}
                          values={{
                            tab: <b>{m.dashboard_countriesSection() ?? 'Countries'}</b>,
                          }}
                        />
                      </CardContent>
                    ) : (
                      <>
                        <CardContent>
                          <TextField
                            value={query}
                            variant="outlined"
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={m.dashboard_searchTaxClasses() ?? 'Search tax classes'}
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchIcon />
                                </InputAdornment>
                              ),
                            }}
                            inputProps={{ className: styles.searchPadding }}
                          />
                        </CardContent>
                        <List gridTemplate={['5fr 2fr']}>
                          <ListHeader>
                            <ListItem>
                              <ListItemCell>
                                {m.dashboard_countryNameHeader() ?? 'Country name'}
                              </ListItemCell>
                              <ListItemCell className={styles.right ?? ''}>
                                {m.dashboard_taxRateHeader() ?? 'Tax rate'}
                              </ListItemCell>
                            </ListItem>
                          </ListHeader>
                          <Divider />
                          {filteredRates?.map((countryRate, countryRateIndex) => (
                            <Fragment key={countryRate.id}>
                              <ListItem hover={false} className={styles.noDivider ?? ''}>
                                <ListItemCell>{countryRate.label}</ListItemCell>
                                <ListItemCell>
                                  <TaxInput
                                    value={countryRate.value}
                                    change={(e) =>
                                      handlers.handleRateChange(countryRate.id, e.target.value)
                                    }
                                  />
                                </ListItemCell>
                              </ListItem>
                              {!isLastElement(filteredRates, countryRateIndex) && <Divider />}
                            </Fragment>
                          )) ?? (
                            <>
                              <Skeleton />
                            </>
                          )}
                        </List>
                      </>
                    )}
                  </Card>
                  <Metadata data={data} onChange={handlers.changeMetadata} />
                </div>
              )}
            </Grid>
            <SaveBar
              state={savebarState}
              disabled={disabled}
              onSubmit={submit}
              onCancel={() => router.push('/configuration')}
            />
          </Container>
        );
      }}
    </TaxClassesForm>
  );
};

export default TaxClassesPage;
